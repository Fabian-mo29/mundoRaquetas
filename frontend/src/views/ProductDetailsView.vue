<template>
  <div class="container mt-5 product-detail">
    <!-- Toast Notifications -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="successToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="successToast"
      >
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">Éxito</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{{ toastMessage }}</div>
      </div>

      <div
        id="errorToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="errorToast"
      >
        <div class="toast-header bg-danger text-white">
          <strong class="me-auto">Error</strong>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">{{ toastMessage }}</div>
      </div>
    </div>

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

        <div class="button-group">
          <button class="btn btn-add-to-cart" @click="addToCart">
            Añadir al carrito
          </button>

          <button class="btn btn-add-to-wishlist" @click="addToWishlist">
            Agregar a wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import axios from "axios";
import { Toast } from 'bootstrap';

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const cantidad = ref(1);
const product = ref({});
const toastMessage = ref("");
const successToast = ref(null);
const errorToast = ref(null);
let successToastInstance = null;
let errorToastInstance = null;

onMounted(() => {
  getProducts();
  // Inicializar toasts después de que el componente esté montado
  if (successToast.value) {
    successToastInstance = new Toast(successToast.value);
  }
  if (errorToast.value) {
    errorToastInstance = new Toast(errorToast.value);
  }
});

function showToast(type) {
  toastMessage.value = type.message;
  
  if (type === 'success' && successToastInstance) {
    successToastInstance.show();
  } else if (type === 'error' && errorToastInstance) {
    errorToastInstance.show();
  }
  
  // Ocultar automáticamente después de 5 segundos
  setTimeout(() => {
    if (type === 'success' && successToastInstance) {
      successToastInstance.hide();
    } else if (type === 'error' && errorToastInstance) {
      errorToastInstance.hide();
    }
  }, 5000);
}

function getProducts() {
  axios
    .get("https://localhost:3000/api/products/" + props.productId)
    .then((response) => {
      product.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      showToast({
        type: 'error',
        message: "Error al cargar el producto"
      });
    });
}

async function addToCart() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "https://localhost:3000/api/cart",
      {
        product: {
          Id: product.value.Id,
          Cantidad: cantidad.value,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast({
      type: 'success',
      message: "Producto agregado al carrito"
    });
  } catch (error) {
    showToast({
      type: 'error',
      message: "Error al agregar al carrito. " + (error.response?.data?.message || "")
    });
    console.error(error);
  }
}

async function addToWishlist() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "https://localhost:3000/api/cart/wishlist",
      {
        product: {
          Id: product.value.Id,
          Cantidad: cantidad.value,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showToast({
      type: 'success',
      message: "Producto agregado al wishlist"
    });
  } catch (error) {
    showToast({
      type: 'error',
      message: "Error al agregar al wishlist. " + (error.response?.data?.message || "")
    });
    console.error(error);
  }
}
</script>

<style scoped>
/* Tus estilos existentes se mantienen igual */
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

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn-add-to-cart,
.btn-add-to-wishlist {
  flex: 1 1 200px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  color: #fff;
}

.btn-add-to-cart {
  background-color: #2c3e50;
}

.btn-add-to-cart:hover {
  background-color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-add-to-wishlist {
  background-color: #3498db;
}

.btn-add-to-wishlist:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Toast customization */
.toast {
  min-width: 300px;
  margin-bottom: 1rem;
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
  
  .toast {
    min-width: 250px;
    max-width: 90%;
    margin-right: 1rem;
  }
}

@media (min-width: 768px) {
  .product-image-container {
    margin-bottom: 0;
  }
}
</style>
