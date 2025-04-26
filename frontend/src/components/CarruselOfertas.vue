<template>
  <div class="main-container">
    <div class="container-fluid mt-5 sala-carousel-container">
      <h2 class="fw-bold mb-4">Ofertas del Día</h2>
      <div class="position-relative">
        <div class="sala-carousel-wrapper">
          <div class="sala-carousel-track" ref="ofertasTrack">
            <div
              class="sala-card"
              v-for="oferta in ofertasDelDia"
              :key="oferta.id"
            >
              <div class="ratio-container">
                <img
                  :src="`/imagesProducts/${oferta.imagen}`"
                  class="card-img-top img-ratio"
                  :alt="'Imagen de ' + oferta.nombre"
                />
                <div class="offer-badge">OFERTA</div>
              </div>
              <div class="card-body">
                <div>
                  <h5 class="card-title">{{ oferta.nombre }}</h5>
                  <p class="card-text">{{ oferta.descripcion }}</p>
                </div>
                <div class="button-container">
                  <p class="h5 mb-0 text-danger">
                    <strong class="precio-oferta">{{ oferta.precio }}</strong>
                    <span class="descuento-oferta">{{ oferta.descuento }}</span>
                  </p>
                  <div class="originalprice-and-button">
                    <small
                      class="text-muted original-price"
                      v-if="oferta.precioOriginal"
                      >${{ oferta.precioOriginal }}</small
                    >
                    <RouterLink :to="'/oferta/' + oferta.id"
                      ><button class="btn">Reservar</button></RouterLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control prev" @click="scrollOfertas(-1)">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control next" @click="scrollOfertas(1)">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ofertas from "@/assets/ofertas.json";
import { ref, onMounted } from "vue";

const ofertasDelDia = ref(ofertas);

const ofertasTrack = ref(null);
const cardWidth = 350;

const scrollOfertas = (direction) => {
  if (ofertasTrack.value) {
    const currentScroll = ofertasTrack.value.scrollLeft;
    ofertasTrack.value.scrollTo({
      left: currentScroll + cardWidth * direction,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  setInterval(() => scrollOfertas(1), 3000);
});
</script>

<style lang="scss" scoped>
.main-container {
  // margin-left: 250px;
  width: calc(100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sala-carousel-container {
  color: #000;
  padding: 0 50px;
}

.sala-carousel-wrapper {
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

.sala-carousel-track {
  display: flex;
  gap: 20px;
  padding: 10px 0;
  transition: transform 0.5s ease;
}

.sala-card {
  min-width: 330px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 450px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .card-body {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .button-container {
      margin-top: auto;
      padding-top: 1rem;
    }
  }
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

.original-price {
  color: #6c757d;
  text-decoration: line-through;
  font-size: 1em;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    background: #f8f9fa;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }

  &-prev-icon,
  &-next-icon {
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
  }
}

.ratio-container {
  position: relative;
  width: 100%;
  padding-top: 75%; /* 16:9 */
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
  object-position: center;
}

@media (max-width: 768px) {
  .sala-carousel-container {
    padding: 0 30px;
  }

  .sala-card {
    min-width: 280px;
  }
}

.text-danger {
  color: #000 !important;

  .precio-oferta {
    color: #000;
  }

  .descuento-oferta {
    color: #dc3545;
    margin-left: 0.5rem;
    font-weight: bold;
  }
}

.btn {
  --bs-btn-color: #fff;
  --bs-btn-bg: #198754;
  --bs-btn-border-color: #198754;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #157347;
  --bs-btn-hover-border-color: #157347;
  --bs-btn-focus-shadow-rgb: 60, 153, 110;
  --bs-btn-active-color: #fff;
  --bs-btn-active-bg: #198754;
  --bs-btn-active-border-color: #157347;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-bg: #198754;
  --bs-btn-disabled-border-color: #198754;
  box-shadow: none;
}

.btn:hover {
  background-color: #157347;
  border-color: #157347;
  color: #fff;
}

.originalprice-and-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: #000;
}

.card-text {
  color: #000;
}
</style>
