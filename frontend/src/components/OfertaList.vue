<template>
  <div class="main-container margin-auto">
    <h2 class="fw-bold mb-4 responsive-text">Ofertas del Día</h2>
    <div id="grid" class="product-grid">
      <div
        v-for="(oferta, index) in ofertasDelDia.slice(0, show)"
        :key="index"
        class="card shadow"
      >
        <OfertaCard :oferta="oferta" />
      </div>
      <button
        @click="verMasOfertas"
        v-if="show < ofertasDelDia.length"
        class="btn btn-success center-button"
        style="background-color: #1A4456"
      >
        Ver más Ofertas
      </button>
    </div>
  </div>
</template>

<script setup>
import ofertas from "@/assets/ofertas.json";
import { ref } from "vue";
import OfertaCard from "./OfertaCard.vue";

const show = ref(8); // Mostrar 8 ofertas inicialmente

function verMasOfertas() {
  show.value = ofertasDelDia.value.length;
}

const ofertasDelDia = ref(ofertas);
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 3%;
  color: #1A4456;
  font-family: "Poppins", sans-serif;
}

.main-container {
  width: calc(100%);
  min-height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

#grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.card {
  width: 100%;
  height: 450px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

.center-button {
  font-family: "Poppins", sans-serif;
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .responsive-text {
    text-align: center;
    margin-left: 0;
  }
  
  #grid {
    grid-template-columns: 1fr;
    padding: 10px;
  }
}
</style>