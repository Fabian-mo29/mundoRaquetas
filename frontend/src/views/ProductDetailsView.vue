<template>
  <div class="container mt-5">
    <h1>{{ product.name }}</h1>
    <p>{{ product.Descripcion }}</p>
    <p style="font-size: large">
      <strong>${{ product.precio }}</strong>
    </p>
    <img
      :src="`/imagesProducts/${product.image}`"
      class="img-fluid mb-3"
      :alt="'Imagen de ' + product.name"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import inventory from "@/assets/inventory.json";

const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
});

const product = inventory.find((item) => item.id === Number(props.productId));
</script>

<style lang="scss" scoped></style>
