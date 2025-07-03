<template>
  <div class="main-container margin-auto mb-4">
    <h2 class="fw-bold mt-5 responsive-text">Pedidos Activos</h2>

    <div v-if="orders.length === 0">
      <h3 class="text-center mt-4">No hay pedidos activos.</h3>
    </div>

    <div v-else id="grid" class="order-grid">
      <div
        v-for="(order, index) in orders"
        :key="order.Id"
        class="card order-card shadow"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <div class="card-body">
          <h5 class="card-title mb-2">Orden #{{ order.NumeroOrden }}</h5>
          <p><strong>Estado:</strong> {{ order.Estado }}</p>
          <p>
            <strong>Cantidad de productos:</strong>
            {{ order.CantidadProductos }}
          </p>
          <p><strong>Fecha:</strong> {{ formatDate(order.Fecha) }}</p>
          <p>
            <strong>Entrega estimada:</strong>
            {{ formatDate(order.FechaEstimadaLlegada) }}
          </p>
          <p>
            <strong>Precio Bruto:</strong> ${{ order.PrecioBruto.toFixed(2) }}
          </p>
          <p>
            <strong>Precio Neto:</strong> ${{ order.PrecioNeto.toFixed(2) }}
          </p>
          <div class="col-md-12">
            <RouterLink
              class="btn btn-outline-info w-100 mt-3"
              :to="'../order/' + order.Id"
            >
              Productos
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);

onMounted(() => {
  getActiveOrders();
  // getAllOrders();
});

async function getActiveOrders() {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/orders/active",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

// async function getAllOrders() {
//   try {
//     const token = sessionStorage.getItem("token");
//     const response = await axios.get("http://localhost:3000/api/orders", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     orders.value = response.data;
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//   }
// }

function formatDate(dateString) {
  if (!dateString) return "Fecha inválida";

  const normalized = dateString.replace(" ", "T");
  const date = new Date(normalized);

  if (isNaN(date)) return "Fecha inválida";

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<style lang="scss" scoped>
h2 {
  margin-left: 3%;
  color: #2c3e50;
  font-family: "Poppins", sans-serif;
}

.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.order-card {
  width: 100%;
  max-width: 350px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  font-family: "Poppins", sans-serif;

  &:hover {
    transform: scale(1.02);
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-weight: bold;
    color: #2c3e50;
  }

  p {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
}

.text-center {
  text-align: center;
}

@media (max-width: 900px) {
  .order-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .order-grid {
    grid-template-columns: 1fr;
  }

  .responsive-text {
    text-align: center;
  }
}
</style>
