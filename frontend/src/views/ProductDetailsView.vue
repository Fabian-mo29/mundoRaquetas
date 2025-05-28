<template>
  <div class="container mt-5 product-detail">
    <div class="product-image-container">
      <img
        :src="`/imagesProducts/${product.ImageName}`"
        class="img-fluid product-image"
        :alt="'Imagen de ' + product.Name"
      />
    </div>

    <div class="product-info">
      <h1>{{ product.Name }}</h1>
      <p class="product-description">{{ product.Description }}</p>
      <p class="product-price">
        <strong>${{ product.Price }}</strong>
      </p>
      <!-- Botón añador al carrito-->
      <button
        class="btn btn-success btn-add-to-cart"
        style="background-color: #2c3e50"
        @click="addToCart"
      >
        Añadir al carrito
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";
import { onMounted } from "vue";

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const product = ref({});

function getProducts() {
  axios
    .get("http://localhost:3000/api/products/" + props.productId)
    .then((response) => {
      product.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

async function addToCart() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/cart",
      {
        product: {
          Id: product.value.Id,
          Cantidad: 1,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Producto agregado al carrito");
  } catch (error) {
    alert("Error al agregar al carrito");
    console.error(error);
  }
}

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
.product-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  max-height: 400px;
  width: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-add-to-cart {
  padding: 10px 30px;
  font-size: 1.1rem;
  font-weight: 500;
  width: fit-content;
  margin-top: 1rem;
  transition: all 0.3s ease;
  background-color: #28a745;
  border: none;
}

.btn-add-to-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #2e7d32;
}

.product-info {
  padding: 0 1rem;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1rem 0;
}

.product-price {
  font-size: 1.5rem;
  color: #2e7d32;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .product-detail {
    flex-direction: row;
  }

  .product-image-container {
    flex: 1;
    max-width: 50%;
  }

  .product-info {
    flex: 1;
    padding: 0 2rem;
    max-width: 50%;
  }
}
</style>
