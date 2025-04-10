<template>
  <div class="main-container">
    <div id="grid" class="product-grid">
      <div v-for="(product, index) in products.slice(0, limite || products.length)" :key="index" class="card shadow">
        <ProductCard :product="product" :limite="limite"/>
      </div>
      <button v-if="limite<products.length" class="btn btn-success center-button">Ver más Productos</button>
    </div>
  </div>
</template>

<script setup>
import inventory from '@/assets/inventory.json'
import { ref, defineProps } from 'vue';
import ProductCard from './ProductCard.vue';

const products = ref(inventory);

defineProps({
  limite: {
    type: Number,
    default: 6 
  }
});

</script>

<style lang="scss" scoped>
.main-container {
  margin-left: 250px;
  width: calc(100% - 250px);
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