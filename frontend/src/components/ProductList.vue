<template>
  <div class="main-container margin-auto">
    <h2 class="fw-bold mt-5 responsive-text">Productos</h2>
    <div v-if="products.length > 0" id="grid" class="product-grid">
      <div
        v-for="(product, index) in products.slice(0, show)"
        :key="index"
        class="card shadow"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <ProductCard :product="product" :limite="limite" />
      </div>
      <button
        @click="verMasProductos"
        v-if="show < products.length"
        class="btn btn-success center-button"
        style="background-color: #2c3e50"
      >
        Ver más Productos
      </button>
    </div>
    <div v-else>
      <h2 class="fw-bold mb-4 responsive-text text-center">
        No hay productos disponibles
      </h2>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from "vue";
import ProductCard from "./ProductCard.vue";
import axios from "axios";

const props = defineProps({
  limite: {
    type: Number,
    default: 8,
  },
  inventory: {
    type: Array,
    default: () => [],
  },
});

const show = ref(props.limite);
const products = ref([]);

const emit = defineEmits(["update:limite"]);

function verMasProductos() {
  show.value = products.value.length;
  emit("update:limite", products.value.length);
}

function getProducts() {
  axios
    .get("http://localhost:3000/api/products")
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

onMounted(() => {
  if (props.inventory.length > 0) {
    products.value = props.inventory;
  } else {
    getProducts();
  }
});

watch(
  () => props.inventory,
  (newInventory) => {
    if (newInventory.length > 0) {
      products.value = newInventory;
      show.value = props.limite;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 3%;
  color: #2c3e50;
}

.main-container {
  width: calc(100%);
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

.center-button {
  font-family: "Poppins", sans-serif;
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

h2 {
  font-family: "Poppins", sans-serif;
}

@media (max-width: 1200px) {
  #grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  #grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  #grid {
    grid-template-columns: 1fr;
  }
  
  .responsive-text {
    text-align: center;
  }
}
</style>
