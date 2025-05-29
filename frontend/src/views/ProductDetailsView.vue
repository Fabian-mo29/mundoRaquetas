<template>
  <div class="container mt-5 product-detail">
    <div class="row">
      <div class="col-md-6 product-image-container">
        <img
          :src="`/imagesProducts/${product.ImageName}`"
          class="img-fluid product-image"
          :alt="'Imagen de ' + product.Name"
        />
      </div>

      <div class="col-md-6 product-info">
        <h1 class="product-title">{{ product.Name }}</h1>
        <p class="product-description">{{ product.Description }}</p>
        <div class="price-container">
          <p class="product-price">
            <strong>${{ product.Price }}</strong>
          </p>
        </div>

        <div>
          <label for="cantidad">Cantidad:</label>
          <input
            type="number"
            class="form-control fixed-input mb-4"
            style="max-width: 100px"
            min="1"
            :max="product.Stock"
            v-model="cantidad"
          />
        </div>

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

const cantidad = ref(1);

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
  padding: 2rem;
}

.product-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.product-image {
  max-width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: contain;
}

.btn-add-to-cart {
  padding: 12px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
  background-color: #28a745;
  border: none;
}

.btn-add-to-cart:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-info {
  padding: 0 1.5rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.price-container {
  margin-bottom: 2rem;
}

.product-price {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

/* Responsive design */
@media (max-width: 767px) {
  .product-title {
    font-size: 1.6rem;
  }

  .product-price {
    font-size: 1.5rem;
  }

  .btn-add-to-cart {
    width: 100%;
    padding: 12px;
  }
}

@media (min-width: 768px) {
  .product-image-container {
    margin-bottom: 0;
  }
}
</style>
