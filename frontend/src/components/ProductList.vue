<template>
  <div id="grid" class="product-grid">
    <div v-for="(product, index) in products.slice(0, limite || products.length)" :key="index" class="card shadow">
      <ProductCard :product="product" :limite="limite"/>
    </div>
    <!-- <PagesComp/> -->
    <button  v-if="limite<products.length" class="btn btn-success center-button">Ver mas Productos</button>
  </div>
</template>

<script setup>
import inventory from '../assets/inventory.json'
import { ref, defineProps } from 'vue';
import ProductCard from './ProductCard.vue';
// import PagesComp from './PagesComp.vue';

const products = ref(inventory);

defineProps({
  limite: {
    type: Number,
    default: 6 
  }
});

</script>

<style lang="scss" scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  margin-left: 250px;
  width: calc(100% - 250px);
}

.center-button {
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  #grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  #grid {
    grid-template-columns: 1fr;
  }
}
</style>
