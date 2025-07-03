<template>
  <div class="container mt-5 mb-4">
    <h3 class="text-left mb-5">Productos de la orden</h3>

    <div class="products-grid">
      <div v-for="item in cartItems" :key="item.id" class="product-card">
        <img
          :src="`/imagesProducts/${item.ImageName}`"
          :alt="item.Name"
          class="product-image"
        />
        <div class="product-details">
          <h5 class="product-name">{{ item.Name }}</h5>
          <p class="product-desc">{{ item.Description }}</p>
          <p class="product-qty">Cantidad: {{ item.Cantidad }}</p>
          <p class="product-price">${{ item.Price }}</p>
        </div>
      </div>
    </div>

    <div class="text-left mt-4">
      <RouterLink to="/userOrders">
        <button class="btn btn-regresar">Regresar</button>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

// Lista de los productos del carrito
const cartItems = ref([]);

const route = useRoute();

// Función para obtener los productos del carrito desde la API del cart, se necesita el token de sesión del usuario
async function fetchCart() {
  try {
    const token = sessionStorage.getItem("token");
    const orderId = route.params.Id;
    const response = await axios.get(
      `http://localhost:3000/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    cartItems.value = response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

onMounted(() => {
  fetchCart();
});
</script>

<style lang="scss" scoped>
.container {
  font-family: "Poppins", sans-serif;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
}

.product-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 12px;
}

.product-details {
  text-align: left;
}

.product-name {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.product-desc {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.product-qty {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 4px;
}

.product-price {
  font-size: 1rem;
  font-weight: 600;
  color: #d32f2f;
}

.btn-regresar {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px 24px;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.btn-regresar:hover {
  background-color: #1c2b3a;
}
</style>
