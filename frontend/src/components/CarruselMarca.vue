<template>
  <div class="brand-carousel-container">
    <Splide :options="splideOptions" class="brand-splide">
      <SplideSlide v-for="(slide, idx) in slides" :key="idx">
        <div
          class="brand-slide"
          :style="{ backgroundImage: `url(${slide.backgroundImage})` }"
        >
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
            <button class="btn btn-outline-light slide-button">{{ slide.buttonText }}</button>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const splideOptions = {
  type: 'loop',
  perPage: 1,
  arrows: true,
  pagination: true,
  speed: 800,
  pauseOnHover: true,
  rewind: false,
  autoplay: true,    // Activa el autoplay tipo slide
  interval: 3000,    // Tiempo entre slides en ms
};

const slides = ref([
  {
    title: "Nuestra Historia",
    description: "Más de 1 mes ofreciendo los mejores productos con calidad garantizada",
    buttonText: "Conoce más",
    backgroundImage: new URL('@/assets/canchaPadel.jpg', import.meta.url).href
  },
  {
    title: "Compromiso con la Calidad",
    description: "Todos nuestros productos pasan por rigurosos controles de calidad",
    buttonText: "Nuestros estándares",
    backgroundImage: new URL('@/assets/canchaPadel2.jpg', import.meta.url).href
  },
  {
    title: "Servicio al Cliente",
    description: "Estamos disponibles 24/7 para resolver tus dudas y atender tus necesidades",
    buttonText: "Contáctanos",
    backgroundImage: new URL('@/assets/PalaYNet.jpg', import.meta.url).href
  }
]);
</script>

<style scoped lang="scss">
.brand-carousel-container {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
}
.brand-splide {
  width: 100%;
  height: 400px;
}
.brand-slide {
  width: 100%;
  height: 400px;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}
.slide-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
.slide-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.slide-button {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border-width: 2px;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
}
</style>