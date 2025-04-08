<template>
  <div class="main-container">

    <div id="grid" class="product-grid">
      <div v-for="(product, index) in products.slice(0, limite || products.length)" :key="index" class="card shadow">
        <ProductCard :product="product" :limite="limite"/>
      </div>
      <button v-if="limite<products.length" class="btn btn-success center-button">Ver más Productos</button>
    </div>
    
    <!-- Carrusel de ofertas -->
    <div class="container-fluid offers-carousel-container">
      <h2 class="mb-4">Ofertas del Día</h2>
      
      <div class="position-relative">
        <div class="offers-carousel-wrapper">
          <div class="offers-carousel-track" ref="ofertasTrack">
            <div class="offer-card" v-for="oferta in ofertas" :key="oferta.id">
              <div class="ratio-container">
                <img :src="oferta.imagen || 'placeholder-product.jpg'" class="card-img-top img-ratio" :alt="'Imagen de ' + oferta.nombre">
                <div class="offer-badge">OFERTA</div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ oferta.nombre }}</h5>
                <p class="card-text">{{ oferta.descripcion }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="h5 mb-0 text-danger"><strong>{{ oferta.precio }}</strong></p>
                    <small class="text-muted original-price" v-if="oferta.precioOriginal">${{ oferta.precioOriginal }}</small>
                  </div>
                  <button class="btn btn-warning">Comprar Oferta</button>
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
    
    <!-- Footer -->
    <footer class="footerBar">
      <div class="footerSections">
      </div>
      <SocialMedia/>
    </footer>
  </div>
</template>

<script setup>
import inventory from '../assets/inventory.json'
import { ref, defineProps, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import SocialMedia from './SocialMedia.vue';

const products = ref(inventory);

// Datos de ejemplo para ofertas
const ofertas = ref([
  {
    id: 1,
    nombre: "Wilson m23 - Oferta Especial",
    descripcion: "Raqueta Wilson de tenis con 20% de descuento",
    precio: "$79.99",
    precioOriginal: "99.99",
    imagen: "raqueta.jpg"
  },
  {
    id: 2,
    nombre: "Babolat Viper Carbon - Pack",
    descripcion: "Incluye raqueta y funda de regalo",
    precio: "$169.99",
    precioOriginal: "189.99",
    imagen: ""
  },

]);

defineProps({
  limite: {
    type: Number,
    default: 6 
  }
});

const ofertasTrack = ref(null);
const scrollOfertas = (direction) => {
  if (ofertasTrack.value) {
    const currentScroll = ofertasTrack.value.scrollLeft;
    ofertasTrack.value.scrollTo({
      left: currentScroll + (350 * direction),
      behavior: 'smooth'
    });
  }
};

onMounted(() => {
  setInterval(() => scrollOfertas(1), 3000);
});
</script>

<style lang="scss" scoped>
.main-container {
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.center-button {
  grid-column: 1 / -1;
  justify-self: center;
  margin-top: 20px;
}

/* Estilos para el carrusel de ofertas */
.offers-carousel-container {
  padding: 0 50px;
  margin-top: 40px;
  margin-bottom: 40px;
}

.offers-carousel-wrapper {
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.offers-carousel-track {
  display: flex;
  gap: 20px;
  padding: 10px 0;
  transition: transform 0.5s ease;
}

.offer-card {
  min-width: 330px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-body {
    padding: 1.25rem;
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
  text-decoration: line-through;
  font-size: 0.9rem;
}

/* Footer ajustado */
.footerBar {
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  margin-top: auto;
  width: 100%;
}

.footerSections {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
  > div {
    width: 22%;
    margin-bottom: 1rem;
  }
  
  p {
    width: 100%;
    text-align: center;
    margin-top: 1rem;
    color: #6e99c5;
  }
}

/* Responsive */
@media (max-width: 1200px) {
  #grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footerSections > div {
    width: 48%;
  }
}

@media (max-width: 992px) {
  .main-container {
    margin-left: 0;
    width: 100%;
  }
}

@media (max-width: 768px) {
  #grid {
    grid-template-columns: 1fr;
  }
  
  .offers-carousel-container {
    padding: 0 20px;
  }
  
  .offer-card {
    min-width: 280px;
  }
  
  .footerSections > div {
    width: 100%;
  }
  
  .carousel-control {
    width: 35px;
    height: 35px;
    
    &-prev-icon, &-next-icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>