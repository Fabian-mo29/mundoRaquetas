<template>
  <div class="main-container margin-auto">
    <h2 class="fw-bold mb-4 responsive-text">Productos</h2>
    <div id="grid" class="product-grid">
      <div
        v-for="(product, index) in products.slice(0, show)"
        :key="index"
        class="card shadow"
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
  </div>
</template>

<script setup>
import inventory from "@/assets/inventory.json";
import { ref, defineProps, defineEmits } from "vue";
import ProductCard from "./ProductCard.vue";

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

const emit = defineEmits(["update:limite"]);

function verMasProductos() {
  show.value = products.value.length;
  emit("update:limite", products.value.length);
}

const products = ref(inventory);
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 3%;
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
  font-family: "Poppins", sans-serif;
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

h2 {
  font-family: "Poppins", sans-serif;
}

@media (max-width: 768px) {
  .responsive-text {
    text-align: center;
  }
}
</style>
