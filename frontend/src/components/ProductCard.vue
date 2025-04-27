<template>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <img
    :src="`/imagesProducts/${product.image}`"
    class="card-img-top img-ratio"
    :alt="'Imagen de ' + product.name"
  />
  <div class="card-body">
    <p class="card-title">
      <strong>{{ product.name }}</strong>
    </p>
    <p class="card-text">{{ product.Descripcion }}</p>
    <div class="d-flex justify-content-between align-items-center">
      <p class = "card-price">
        <strong>${{ product.precio }}</strong>
      </p>
      <RouterLink :to="'product/' + product.id"
        ><button class="btn btn-success">Comprar</button></RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  limite: {
    type: Number,
    default: 6,
  },
  product: Object,
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  font-family: Noto Sans, sans-serif;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-price {
  //font-family: Noto Sans, sans-serif;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

button {
  margin-top: auto;
  font-family: 'Poppins', sans-serif;
  //font-family: Noto Sans, sans-serif;
}
</style>
