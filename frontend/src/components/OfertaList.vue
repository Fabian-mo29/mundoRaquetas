<template>
  <div class="main-container">
    <h2 class="fw-bold mb-4 mt-5 responsive-text">Ofertas del Día</h2>
    <div id="grid" class="product-grid">
      <div
        v-for="(oferta, index) in ofertasDelDia.slice(0, show)"
        :key="index"
        class="card shadow"
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
  </div>
</template>

<script setup>
import ofertas from "@/assets/ofertas.json";
import { ref, defineProps, defineEmits} from "vue";
import OfertaCard from "./OfertaCard.vue";

const props = defineProps({
  limite: {
    type: Number,
    default: 8,
  },
  categoryType: {
    type: String,
    required: true,
  },
  categoryHeader: {
    type: String,
    required: true,
  },
});

const show = ref(props.limite);
const emit = defineEmits(["update:limite"]);

const filteredProducts = ref([]);


function verMasOfertas() {
  show.value = filteredProducts.value.length;
  emit("update:limite", filteredProducts.value.length);
}

const ofertasDelDia = ref(ofertas);
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 5%;
}

.main-container {
  width: calc(100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.card {
  width: 100%;
  height: 450px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

.center-button {
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .responsive-text {
    text-align: center;
  }
}
</style>