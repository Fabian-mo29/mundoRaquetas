<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />

  <div class="ratio-container">
    <img
      :src="`/imagesProducts/${oferta.imagen}`"
      class="card-img-top img-ratio"
      :alt="'Imagen de ' + oferta.nombre"
    />
    <div class="offer-badge">OFERTA</div>
  </div>
  <div class="card-body">
    <p class="card-title">
      <strong>{{ oferta.nombre }}</strong>
    </p>
    <p class="card-text">{{ descripcionTruncada(oferta.descripcion) }}</p>
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <p class="card-price">
          <strong>${{ oferta.precio }}</strong>
          <span class="descuento-oferta">{{ oferta.descuento }}</span>
        </p>
        <small class="text-muted original-price" v-if="oferta.precioOriginal">
          ${{ oferta.precioOriginal }}
        </small>
      </div>
      <RouterLink :to="'/oferta/' + oferta.id">
        <button class="btn btn-success">Comprar</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  oferta: Object,
});

const descripcionTruncada = (descripcion) => {
  if (descripcion.length > 50) {
    return descripcion.substring(0, 50) + "...";
  }
  return descripcion;
};
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

.ratio-container {
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
  background-color: #f8f9fa;
}

.img-ratio {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.offer-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1rem;
}

.card-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  font-family: "Noto Sans", sans-serif;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.card-price {
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;

  .descuento-oferta {
    color: #dc3545;
    margin-left: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
  }
}

.original-price {
  color: #6c757d;
  text-decoration: line-through;
  font-size: 0.9rem;
}

button {
  margin-top: auto;
  font-family: "Poppins", sans-serif;
}
</style>
