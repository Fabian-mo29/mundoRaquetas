<template>
  <div class="main-container">
    <h2 class="fw-bold mb-4 mt-5 responsive-text">Ofertas del Día</h2>
    <div v-if="ofertasDelDia.length > 0" id="grid" class="product-grid">
      <div
        v-for="(oferta, index) in ofertasDelDia.slice(0, show)"
        :key="index"
        class="card shadow"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <OfertaCard :oferta="oferta" :limite="limite"/>
      </div>
      <button
        @click="verMasOfertas"
        v-if="show < ofertasDelDia.length"
        class="btn btn-success center-button"
        style="background-color: #2c3e50"
      >
        Ver más Ofertas
      </button>
    </div>
    <div v-else>
      <h2 class="fw-bold mb-4 responsive-text text-center">
        No hay ofertas disponibles en este momento
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";
import OfertaCard from "./OfertaCard.vue";
import axios from "axios";

const props = defineProps({
  limite: {
    type: Number,
    default: 8,
  },
  categoryType: {
    type: String,
    required: true,
  },
});

const show = ref(props.limite);
const emit = defineEmits(["update:limite"]);
const ofertasDelDia = ref([]);

// Función para obtener ofertas desde la API
async function fetchOfertas() {
  try {
    const response = await axios.get("http://localhost:3000/api/products/");
    ofertasDelDia.value = response.data
    .filter(product => product.Discount > 0)
    .map(product => ({
      id: product.Id,
      nombre: product.Name,
      descripcion: product.Description,
      precio: `${product.Price.toFixed(2)}`,
      descuento: `(-${product.Discount}%)`,
      precioOriginal: (product.Price / (1 - product.Discount/100)).toFixed(2),
      imagen: product.ImageName || 'default-product.jpg'
    }));
  } catch (error) {
    console.error("Error fetching offers:", error);
    ofertasDelDia.value = [];
  }
}

function verMasOfertas() {
  show.value = ofertasDelDia.value.length;
  emit("update:limite", ofertasDelDia.value.length);
}

// Cargar ofertas al montar el componente
onMounted(() => {
  fetchOfertas();
});
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 5%;
}

.main-container {
  width: calc(100%);
  display: flex;
  flex-direction: column;
}

#grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.center-button {
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

h2 {
  font-family: "Poppins", sans-serif;
  color: #2c3e50;
}

/* Responsive design */
@media (max-width: 1200px) {
  #grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas medianas */
  }
}

@media (max-width: 900px) {
  #grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets */
  }
}

@media (max-width: 600px) {
  #grid {
    grid-template-columns: 1fr; /* 1 columna en móviles */
  }
  
  .responsive-text {
    text-align: center;
  }
}
</style>