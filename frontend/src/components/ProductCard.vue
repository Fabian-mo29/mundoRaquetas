<template>
  <div id="flexbox" class="d-flex justify-content-center align-items-center min-vh-100">
    <div v-for="(product, index) in inventory" :key="index" class="card shadow" style="width: 18rem;">
      <img :src="getImage(product.image)" class="card-img-top" :alt="product.name" />
      <div class="card-body">
        <p class="card-text"><strong>{{ product.name }}</strong></p>
        <p class="card-text">{{ product.Descripcion }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: large;"><strong>${{ product.precio }}</strong></p>
          <button class="btn btn-success">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import inventory from '../assets/inventory.json'

const getImage = (imageName) => {
  try {
    return require(`@/assets/imagesProducts/${imageName}`);
  } catch (error) {
    return require('@/assets/imagesProducts/raqueta.jpg');
  }
};
</script>

<style lang="scss" scoped>
#flexbox {
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
  margin-left: 250px;
  padding: 20px;
}
</style>
