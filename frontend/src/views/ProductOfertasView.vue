<template>
  <div class="container mt-5 product-detail">
    <div class="row">
      <div class="col-md-6 product-image-container">
        <img
          :src="`/imagesProducts/${product.imagen}`"
          class="img-fluid product-image"
          :alt="'Imagen de ' + product.nombre"
        />
      </div>

      <div class="col-md-6 product-info">
        <h1 class="product-title">{{ product.nombre }}</h1>
        <p class="product-description">{{ product.descripcion }}</p>
        <div class="price-container">
          <p class="product-price">
            <strong>{{ product.precio }}</strong>
            <span class="discount-badge" v-if="product.descuento">
              {{ product.descuento }}
            </span>
          </p>
          <p class="original-price" v-if="product.precioOriginal">
            <s>${{ product.precioOriginal }}</s>
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
import { ref } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref({
  id: 0,
  nombre: "",
  descripcion: "",
  precio: "",
  descuento: "",
  precioOriginal: "",
  imagen: "",
});

const cantidad = ref(1);

async function fetchProduct() {
  try {
    const productId = route.params.id || route.params.ofertaId;
    const response = await axios.get(
      `https://localhost:3000/api/products/${productId}`
    );
    const productData = response.data;

    product.value = {
      id: productData.Id,
      nombre: productData.Name,
      descripcion: productData.Description,
      precio: `$${productData.Price.toFixed(2)}`,
      descuento: productData.Discount > 0 ? `(-${productData.Discount}%)` : "",
      precioOriginal:
        productData.Discount > 0
          ? (productData.Price / (1 - productData.Discount / 100)).toFixed(2)
          : "",
      imagen: productData.ImageName || "default-product.jpg",
      Stock: productData.Stock || 0,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

async function addToCart() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "https://localhost:3000/api/cart",
      {
        product: {
          Id: product.value.id,
          Cantidad: cantidad.value,
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

async function addToWishlist() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "https://localhost:3000/api/cart/wishlist",
      {
        product: {
          Id: product.value.id,
          Cantidad: cantidad.value,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Producto agregado al wishlist");
  } catch (error) {
    alert("Error al agregar al wishlist");
    console.error(error);
  }
}

onMounted(() => {
  fetchProduct();
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
  color: #d32f2f;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.discount-badge {
  background-color: #d32f2f;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 0.8rem;
}

.original-price {
  font-size: 1.2rem;
  color: #777;
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
  background-color: #3498db;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
