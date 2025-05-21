<template>
  <div class="main-container">
    <h2 class="fw-bold mb-4 mt-5">{{ categoryHeader }}</h2>
    <div id="grid" class="product-grid">
      <div
        v-for="(product, index) in filteredProducts.slice(0, show)"
        :key="index"
        class="card shadow"
      >
        <ProductCard :product="product" :limite="limite" />
      </div>
      <button
        @click="verMasProductos"
        v-if="show < filteredProducts.length"
        class="btn btn-success center-button"
        style="background-color: #2c3e50"
      >
        Ver más Productos
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import axios from "axios";
import { onMounted } from "vue";

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

function verMasProductos() {
  show.value = filteredProducts.value.length;
  emit("update:limite", filteredProducts.value.length);
}

function getProductsByCategory(category) {
  axios
    .get(`http://localhost:3000/api/categories/${category}`)
    .then((response) => {
      filteredProducts.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching products by category:", error);
    });
}

onMounted(() => {
  getProductsByCategory(props.categoryType);
});
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

.center-button {
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}
</style>
