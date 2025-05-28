<template>
  <!-- Carrusel de ofertas -->
  <div class="mt-5 sala-carousel-container">
    <h2 class="fw-bold mb-4 mt-5">Ofertas del Día</h2>
    <div class="position-relative">
      <div class="sala-carousel-wrapper">
        <div class="sala-carousel-track" ref="ofertasTrack">
          <div class="sala-card" v-for="oferta in ofertasDelDia" :key="oferta.id">
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
                <p class="card-text">{{ descripcionTruncada(oferta.descripcion) }}</p>
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
                  <RouterLink :to="'/oferta/' + oferta.id">
                    <button class="btn">Comprar</button>
                  </RouterLink>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

const ofertasTrack = ref(null);
const currentIndex = ref(0);
const autoScrollInterval = ref(null);
const isDragging = ref(false);
const startPos = ref(0);
const currentTranslate = ref(0);
const prevTranslate = ref(0);

const ofertasDelDia = ref([]);

async function fetchOfertas() {
  try {
    const response = await axios.get("http://localhost:3000/api/products/");
    ofertasDelDia.value = response.data
    .filter(product => product.Discount > 0)
    .map(product => ({
      id: product.Id,
      nombre: product.Name,
      descripcion: product.Description,
      precio: `$${product.Price.toFixed(2)}`,
      descuento: `(-${product.Discount}%)`,
      precioOriginal: (product.Price / (1 - product.Discount/100)).toFixed(2),
      imagen: product.ImageName || 'default-product.jpg'
    }));
  } catch (error) {
    console.error("Error fetching offers:", error);
    ofertasDelDia.value = [];
  }
}

const descripcionTruncada = (descripcion) => {
  if (descripcion.length > 50) {
    return descripcion.substring(0, 50) + "...";
  }
  return descripcion;
};

const scrollToCard = (index) => {
  if (!ofertasTrack.value) return;

  const cardWidth = ofertasTrack.value.children[0]?.offsetWidth || 330;
  const gap = 20; // El mismo gap que tienes en el CSS

  const containerWidth = ofertasTrack.value.parentElement.offsetWidth;
  const totalCardsWidth = ofertasDelDia.value.length * (cardWidth + gap);
  
  // Si estamos en la última card y ya es visible, reiniciar
  if (index >= ofertasDelDia.value.length - 3.5) {
    const currentScroll = -parseInt(ofertasTrack.value.style.transform.replace('translateX(', '').replace('px)', '') || 0);
    const visibleWidth = containerWidth;
    const remainingWidth = totalCardsWidth - currentScroll - visibleWidth;
    
    // Si la última card ya es visible (o casi visible)
    if (remainingWidth <= cardWidth * 1.5) {
       setTimeout(() => {
        ofertasTrack.value.style.transition = 'transform 0.5s ease-out';
        ofertasTrack.value.style.transform = 'translateX(0)';
        currentIndex.value = 0;
      }, 500); // Pequeña pausa antes de reiniciar
      return;
    }
  }

  const scrollPosition = index * (cardWidth + gap);
  
  ofertasTrack.value.style.transition = "transform 0.5s ease-out";
  ofertasTrack.value.style.transform = `translateX(-${scrollPosition}px)`;
  currentIndex.value = index;
};

const scrollOfertas = (direction) => {
  const newIndex = currentIndex.value + direction;

  // Validar límites
  if (newIndex < 0 || newIndex >= ofertasDelDia.value.length) {
    return;
  }

  scrollToCard(newIndex);
};

// Touch/desktop drag events
const startDrag = (e) => {
  isDragging.value = true;
  startPos.value = getPositionX(e);
  ofertasTrack.value.style.transition = "none";
};

const duringDrag = (e) => {
  if (!isDragging.value) return;
  const currentPosition = getPositionX(e);
  currentTranslate.value =
    prevTranslate.value + currentPosition - startPos.value;
  ofertasTrack.value.style.transform = `translateX(${currentTranslate.value}px)`;
};

const endDrag = () => {
  isDragging.value = false;
  const movedBy = currentTranslate.value - prevTranslate.value;
  
  // Si el movimiento fue significativo, cambiar de card
  if (Math.abs(movedBy) > 50) {
    if (movedBy > 0 && currentIndex.value > 0) {
      scrollToCard(currentIndex.value - 1);
    } else if (movedBy < 0 && currentIndex.value < ofertasDelDia.value.length - 1) {
      scrollToCard(currentIndex.value + 1);
    }
  } else {
    scrollToCard(currentIndex.value);
  }
};

const getPositionX = (e) => {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
};

// Auto-scroll
const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    if (!isDragging.value) {
      const nextIndex = (currentIndex.value + 1) % ofertasDelDia.value.length;
      scrollToCard(nextIndex);
    }
  }, 3000);
};

onMounted(() => {
  fetchOfertas();
  startAutoScroll();

  // Event listeners para drag
  if (ofertasTrack.value) {
    ofertasTrack.value.addEventListener("mousedown", startDrag);
    ofertasTrack.value.addEventListener("touchstart", startDrag, {
      passive: true,
    });

    window.addEventListener("mousemove", duringDrag);
    window.addEventListener("touchmove", duringDrag, { passive: false });

    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
  }
});

onUnmounted(() => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value);
  }

  // Cleanup event listeners
  if (ofertasTrack.value) {
    ofertasTrack.value.removeEventListener("mousedown", startDrag);
    ofertasTrack.value.removeEventListener("touchstart", startDrag);

    window.removeEventListener("mousemove", duringDrag);
    window.removeEventListener("touchmove", duringDrag);

    window.removeEventListener("mouseup", endDrag);
    window.removeEventListener("touchend", endDrag);
  }
});
</script>

<style lang="scss" scoped>
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
  object-fit: cover;
  object-position: center;
}

.card {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

/* Estilos para el carrusel de ofertas */
.sala-carousel-container {
  padding: 0 50px;
}

.sala-carousel-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.sala-carousel-track {
  display: flex;
  gap: 20px;
  padding: 10px 0;
  will-change: transform;
    transition: transform 0.5s ease-out;
  user-select: none;
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
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
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

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: #1a4456;
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
    background: rgba(26, 68, 86, 1);
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

.img-ratio {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.text-danger {
  color: #000000 !important;

  .descuento-oferta {
    color: #dc3545;
    margin-left: 0.5rem;
    font-weight: bold;
  }
}

.btn {
  --bs-btn-color: #fff;
  --bs-btn-bg: #1a4456;
  --bs-btn-border-color: #1a4456;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #122e3a;
  --bs-btn-hover-border-color: #122e3a;
  box-shadow: none;
}

.btn:hover {
  background-color: #122e3a;
  border-color: #122e3a;
  color: #fff;
}

.originalprice-and-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.original-price {
  color: #6c757d;
  text-decoration: line-through;
  font-size: 1em;
}

@media (max-width: 768px) {
  .sala-carousel-container {
    padding: 0 30px;
  }

  .sala-card {
    min-width: 280px;
  }

  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
