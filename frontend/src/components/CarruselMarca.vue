<template>
  <!-- Carrusel de presentación de la marca -->
  <div class="brand-carousel-container">
    <div class="brand-carousel-wrapper">
      <div class="brand-carousel-track" ref="brandTrack">
        <div class="brand-slide" v-for="(slide, index) in slides" :key="index" 
             :style="{ backgroundImage: `url(${slide.backgroundImage})` }">
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
            <button class="btn btn-outline-light slide-button">{{ slide.buttonText }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="brand-carousel-controls">
      <button class="brand-control prev" @click="scrollBrand(-1)">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <div class="brand-pagination">
        <span v-for="(slide, index) in slides" :key="index" 
              :class="{ active: currentBrandIndex === index }"
              @click="goToBrandSlide(index)"></span>
      </div>
      <button class="brand-control next" @click="scrollBrand(1)">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Usamos algunas imágenes del JSON de ofertas como fondo
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
    backgroundImage: new URL('@/assets/canchapadel3.jpeg', import.meta.url).href
  }
]);

const brandTrack = ref(null);
const currentBrandIndex = ref(0);
const autoScrollInterval = ref(null);

const scrollToBrandSlide = (index) => {
  if (!brandTrack.value) return;
  
  // Ajustar el índice para loop infinito
  if (index >= slides.value.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.value.length - 1;
  }
  
  const slideWidth = 100; // 100% porque cada slide ocupa todo el ancho
  brandTrack.value.style.transition = 'transform 1s ease-out';
  brandTrack.value.style.transform = `translateX(-${index * slideWidth}%)`;
  currentBrandIndex.value = index;
};

const scrollBrand = (direction) => {
  scrollToBrandSlide(currentBrandIndex.value + direction);
};

const goToBrandSlide = (index) => {
  scrollToBrandSlide(index);
};

// Auto-scroll
const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    scrollToBrandSlide(currentBrandIndex.value + 1);
  }, 5000);
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }
});
</script>

<style lang="scss" scoped>
.brand-carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.brand-carousel-wrapper {
  width: 100%;
  overflow: hidden;
}

.brand-carousel-track {
  display: flex;
  width: 100%;
  height: 400px;
  will-change: transform;
  transition: transform 0.5s ease-out;
}

.brand-slide {
  flex: 0 0 100%;
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

.brand-carousel-controls {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.brand-control {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.brand-pagination {
  display: flex;
  gap: 0.75rem;
  
  span {
    width: 30px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.active {
      background-color: white;
      transform: scaleY(1.5);
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
}

@media (max-width: 768px) {
  .brand-carousel-track {
    height: 300px;
  }
  
  .slide-title {
    font-size: 1.8rem;
  }
  
  .slide-description {
    font-size: 1rem;
  }
  
  .brand-pagination {
    gap: 0.5rem;
    
    span {
      width: 20px;
      height: 2px;
    }
  }
}
</style>