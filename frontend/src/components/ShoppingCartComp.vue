<template>
  <!-- Código inspirado en ejemplo de "bootstrapexamples.com" -->
  <!-- Fuente: https://bootstrapexamples.com/@valeria/bootstrap-5-shopping-cart-design -->
  <div class="container mt-5">
    <div class="row">
      <!-- Productos del Shopping Cart -->
      <div class="col-lg-8">
        <h3 class="mb-5">Tu carrito de compras</h3>

        <!-- Se muestran los productos que estén en el carrito del perfil del cliente (De momento es un json de ejemplo) -->
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="cart-item d-flex justify-content-between"
        >
          <div class="d-flex">
            <img
              :src="`/imagesProducts/${item.ImageName}`"
              :alt="item.Name"
              class="product-img me-3"
            />
            <div>
              <h5>{{ item.Name }}</h5>
              <p class="text-muted">{{ item.Description }}</p>
              <input type="number" class="form-control fixed-input" value="1" />
            </div>
          </div>
          <div
            class="item-price-btn d-flex flex-column justify-content-between"
          >
            <span>${{ item.Price }}</span>
            <button class="btn btn-sm btn-danger">Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Resumen del carrito -->
      <div class="col-lg-4">
        <div class="cart-summary">
          <h4>Productos del carrito</h4>
          <ul class="list-unstyled">
            <li class="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </li>
            <li class="d-flex justify-content-between">
              <span>Costos de envío:</span>
              <span>$5.00</span>
            </li>
            <li class="d-flex justify-content-between">
              <span class="total-price">Total:</span>
              <span class="total-price">${{ total.toFixed(2) }}</span>
            </li>
          </ul>
          <button @click="createOrder" class="btn btn-success w-100">
            Realizar compra
          </button>
        </div>
      </div>
    </div>
    <RouterLink to="/"
      ><button class="btn btn-success mt-1 mb-4">Regresar</button></RouterLink
    >
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// import shoppingCart from "@/assets/shoppingCartExample.json";
import axios from "axios";

// Lista de los productos del carrito
// const cartItems = ref(shoppingCart);
const cartItems = ref([]);
const router = useRouter();
// Función para obtener los productos del carrito desde la API del cart, se necesita el token de sesión del usuario
async function fetchCart() {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cartItems.value = response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

onMounted(() => {
  fetchCart();
});

// Se calcula el subtotal de los productos en el carrito
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + parseFloat(item.precio), 0)
);

// Se calcula el total, ya incluye el costo de envío (5$)
const total = computed(() => subtotal.value + 5);

async function createOrder() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post("http://localhost:3000/api/orders", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
  } finally {
    console.log("Orden creada");
    router.push("/"); // Redirige al inicio
  }
}
</script>

<style lang="scss" scoped>
// Estilo para los items del carrito
.cart-item {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

// Estilo para el cálculo de precios del carrito
.cart-summary {
  border: 1px solid #e0e0e0;
  margin-top: 80px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

// Estilo para el tamaño de las textos para el precio total y subtotal
.cart-summary .total-price {
  font-size: 1.5rem;
  font-weight: bold;
}

// Estilo para tener un ancho fijo para el cuadro de cantidad de productos
.fixed-input {
  width: 60px;
}

// Estilo para la imagen del item del carrito
.product-img {
  max-width: 150px;
  height: auto;
  object-fit: cover;
}

// Estilo para el botón de eliminar producto y el precio
.item-price-btn {
  align-items: center;
}

// Estilos para cuando se reduzca la pantalla
@media (max-width: 768px) {
  .cart-summary {
    margin-top: auto;
    margin-bottom: 20px;
  }

  .cart-item {
    flex-direction: column;
    align-items: center;
  }

  .item-price-btn {
    margin-top: 20px;
    gap: 10px;
  }
}

h3 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}

h4 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}

h5 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
}

p {
  font-family: Noto Sans, sans-serif;
  font-weight: normal;
  font-size: 1rem;
}

span {
  font-family: Noto Sans, sans-serif;
  font-weight: normal;
  font-size: 1rem;
}

button {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
}
</style>
