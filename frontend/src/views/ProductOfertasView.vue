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

        <!-- Botón de añadir al carrito -->
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
  imagen: ""
});

async function fetchProduct() {
  try {
    const productId = route.params.id || route.params.ofertaId;
    const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
    const productData = response.data;
    
    product.value = {
      id: productData.Id,
      nombre: productData.Name,
      descripcion: productData.Description,
      precio: `$${productData.Price.toFixed(2)}`,
      descuento: productData.Discount > 0 ? `(-${productData.Discount}%)` : "",
      precioOriginal: productData.Discount > 0 
        ? (productData.Price / (1 - productData.Discount/100)).toFixed(2)
        : "",
      imagen: productData.ImageName || 'default-product.jpg'
    };
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}

async function addToCart() {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/cart",
      {
        product: {
          Id: product.value.id,
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