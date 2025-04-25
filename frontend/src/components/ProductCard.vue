<template>
  <img
    :src="`/imagesProducts/${product.image}`"
    class="card-img-top img-ratio"
    :alt="'Imagen de ' + product.name"
  />
  <div class="card-body">
    <p class="card-text">
      <strong>{{ product.name }}</strong>
    </p>
    <p class="card-text">{{ product.Descripcion }}</p>
    <div class="d-flex justify-content-between align-items-center">
      <p style="font-size: large">
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

button {
  margin-top: auto;
}
</style>
