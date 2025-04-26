<template>
  <div class="container mt-5">
    <h1>{{ product.nombre }}</h1>
    <p>{{ product.descripcion }}</p>
    <p style="font-size: large">
      <strong>${{ product.precio }}</strong>
    </p>
    <img
      :src="`/imagesProducts/${product.imagen}`"
      class="img-fluid mb-3"
      :alt="'Imagen de ' + product.nombre"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import inventory from "@/assets/ofertas.json";

const props = defineProps({
  ofertaId: {
    type: Number,
    required: true,
  },
});

const product = inventory.find((item) => item.id === Number(props.ofertaId));
</script>

<style lang="scss" scoped></style>
