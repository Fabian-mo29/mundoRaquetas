<template>
  <div class="bg-image">
    <div class="overlay">
      <div
        id="mainCard"
        class="d-flex justify-content-center align-items-center content-box my-5 py-4"
      >
        <form
          @submit.prevent="completePayment"
          style="width: 100%; max-width: 400px"
        >
          <h2 class="text-center mb-4">Confirmar datos de pago</h2>

          <!-- Mostrar tarjetas guardadas si existen -->
          <div v-if="savedCards.length > 0" class="mb-4">
            <h5 class="text-white mb-3">Tarjetas Guardadas</h5>
            <div
              v-for="card in savedCards"
              :key="card.Id"
              class="card saved-card mb-2 p-3"
              @click="selectCard(card)"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{{ card.Alias }}</strong>
                  <p class="mb-0">Terminada en {{ card.MaskedNumber }}</p>
                  <small>Vence {{ card.FechaVencimiento }}</small>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click.stop="deleteCard(card.Id)"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <hr class="bg-light" />
          </div>

          <!-- Número de Tarjeta -->
          <div class="mb-3">
            <label class="form-label" for="inputCardNumber"
              >Número de Tarjeta</label
            >
            <input
              class="form-control"
              type="text"
              id="inputCardNumber"
              v-model="form.cardNumber"
              required
              placeholder="1234 5678 9012 3456"
            />
            <div v-if="errors.cardNumber" class="text-danger">
              {{ errors.cardNumber }}
            </div>
          </div>

          <!-- Nombre del Titular -->
          <div class="mb-3">
            <label class="form-label" for="inputCardHolder"
              >Nombre del Titular</label
            >
            <input
              class="form-control"
              type="text"
              id="inputCardHolder"
              v-model="form.cardHolder"
              required
              placeholder="Como aparece en la tarjeta"
            />
          </div>

          <!-- Fecha de Vencimiento -->
          <div class="mb-3">
            <label class="form-label" for="inputExpiryDate"
              >Fecha de vencimiento</label
            >
            <input
              class="form-control"
              type="text"
              id="inputExpiryDate"
              v-model="form.expiryDate"
              required
              placeholder="MM/AA"
            />
            <div v-if="errors.expiryDate" class="text-danger">
              {{ errors.expiryDate }}
            </div>
          </div>

          <!-- Código de Seguridad -->
          <div class="mb-3">
            <label class="form-label" for="inputSecurityCode"
              >Código de seguridad (CVV)</label
            >
            <input
              class="form-control"
              type="password"
              id="inputSecurityCode"
              v-model="form.securityCode"
              required
              placeholder="CVV"
            />
            <div v-if="errors.securityCode" class="text-danger">
              {{ errors.securityCode }}
            </div>
          </div>

          <!-- Opción para guardar tarjeta -->
          <div
            v-if="showSaveCardOption || savedCards.length === 0"
            class="mb-3 form-check"
          >
            <input
              type="checkbox"
              class="form-check-input"
              id="saveForFuture"
              v-model="form.saveForFuture"
            />
            <label class="form-check-label" for="saveForFuture">
              Guardar esta tarjeta para futuros pagos
            </label>

            <div v-if="form.saveForFuture" class="mt-2">
              <label class="form-label" for="cardAlias"
                >Alias/Nombre para la tarjeta</label
              >
              <input
                class="form-control"
                type="text"
                id="cardAlias"
                v-model="form.alias"
                placeholder="Ej: Tarjeta Principal"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="inputMoneda">Moneda</label>
              <select
                class="form-control"
                id="inputMoneda"
                v-model="form.moneda"
                required
              >
                <option disabled>Seleccione una moneda</option>
                <option value="Colones">Colones</option>
                <option value="Dolares">Dólares</option>
              </select>
            </div>
          </div>

          <!-- Provincia (SELECT) -->
          <div class="mb-3">
            <label class="form-label" for="inputProvincia">Provincia</label>
            <select
              class="form-control"
              id="inputProvincia"
              v-model="form.provincia"
              required
            >
              <option disabled>Seleccione una provincia</option>
              <option value="San Jose">San José</option>
              <option value="Alajuela">Alajuela</option>
              <option value="Cartago">Cartago</option>
              <option value="Heredia">Heredia</option>
              <option value="Guanacaste">Guanacaste</option>
              <option value="Puntarenas">Puntarenas</option>
              <option value="Limon">Limón</option>
            </select>
            <div v-if="errors.provincia" class="text-danger">
              {{ errors.provincia }}
            </div>
          </div>

          <!-- Cantón -->
          <div class="mb-3">
            <label class="form-label" for="inputCanton">Cantón</label>
            <input
              class="form-control"
              type="text"
              id="inputCanton"
              v-model="form.canton"
              required
              placeholder="Cantón"
            />
            <div v-if="errors.canton" class="text-danger">
              {{ errors.canton }}
            </div>
          </div>

          <!-- Otras señas -->
          <div class="mb-3">
            <label class="form-label" for="inputOtrasSenias">Otras señas</label>
            <textarea
              class="form-control"
              id="inputInfoUbicacion"
              v-model="form.infoUbicacion"
              placeholder="Casa color rojo, frente a la escuela, etc."
              rows="2"
              required
            ></textarea>
            <div v-if="errors.infoUbicacion" class="text-danger">
              {{ errors.infoUbicacion }}
            </div>
          </div>

          <!-- Botón -->
          <button
            type="submit"
            class="btn btn-outline-warning w-100 mt-2"
            style="width: 100%"
          >
            Confirmar pago
          </button>

          <div v-if="loadingCards" class="text-center py-3">
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          <div v-if="serverError" class="alert alert-danger mt-3">
            {{ serverError }}
          </div>

          <div v-if="success" class="alert alert-success mt-3">
            {{ success }}
            <div
              class="spinner-border spinner-border-sm ms-2"
              v-if="success.includes('Redirigiendo')"
            ></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const form = ref({
  cardNumber: "",
  expiryDate: "",
  securityCode: "",
  provincia: "",
  canton: "",
  infoUbicacion: "",
  cardHolder: "",
  saveForFuture: false,
  alias: "",
  moneda: "Colones",
});

const errors = ref({});
const serverError = ref("");
const success = ref("");
const savedCards = ref([]);
const loadingCards = ref(true);
const showSaveCardOption = ref(false);

// Cargar tarjetas guardadas al montar el componente
onMounted(async () => {
  await fetchSavedCards();
});

async function fetchSavedCards() {
  try {
    loadingCards.value = true;
    const response = await axios.get(
      "http://localhost:3000/api/orders/payment-methods/saved",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    // Formatear los datos para mejor visualización
    savedCards.value = response.data.map((card) => ({
      ...card,
      // Mostrar fecha en formato MM/AA si no está formateada
      FechaVencimiento: card.FechaVencimiento.includes("/")
        ? card.FechaVencimiento
        : `${card.FechaVencimiento.slice(0, 2)}/${card.FechaVencimiento.slice(
            2
          )}`,
    }));
  } catch (error) {
    console.error("Error al cargar tarjetas:", error);
    serverError.value = "No se pudieron cargar las tarjetas guardadas";
  } finally {
    loadingCards.value = false;
  }
}

function selectCard(card) {
  // Solo podemos mostrar los últimos 4 dígitos
  form.value.cardNumber = card.NumeroTarjeta;
  form.value.expiryDate =
    card.FechaVencimientoFormateada || card.FechaVencimiento;
  form.value.cardHolder = card.NombreTitular;
  form.value.securityCode = ""; // Siempre vacío por seguridad
  form.value.provincia = card.Provincia || "";
  form.value.canton = card.Canton || "";
  form.value.infoUbicacion = card.InformacionUbicacion || "";

  showSaveCardOption.value = false;
}

async function deleteCard(cardId) {
  if (!confirm("¿Estás seguro de eliminar esta tarjeta?")) return;

  try {
    const response = await axios.delete(
      `http://localhost:3000/api/orders/payment-methods/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      success.value = "Tarjeta eliminada correctamente";
      // Actualizar la lista de tarjetas
      await fetchSavedCards();
    }
  } catch (error) {
    console.error("Error al eliminar tarjeta:", error);
    serverError.value =
      error.response?.data?.error || "Error al eliminar la tarjeta";
  }
}

async function completePayment() {
  errors.value = {};
  serverError.value = "";
  success.value = "";

  // Validaciones mejoradas
  const validations = {
    cardNumber:
      !form.value.cardNumber && "El número de tarjeta es obligatorio.",
    expiryDate:
      !form.value.expiryDate && "La fecha de vencimiento es obligatoria.",
    securityCode:
      !form.value.securityCode && "El código de seguridad es obligatorio.",
    provincia: !form.value.provincia && "La provincia es obligatoria.",
    canton: !form.value.canton && "El cantón es obligatorio.",
    infoUbicacion:
      !form.value.infoUbicacion && "Las otras señas son obligatorias.",
    cardHolder:
      !form.value.cardHolder && "El nombre del titular es obligatorio.",
  };

  Object.keys(validations).forEach((key) => {
    if (validations[key]) errors.value[key] = validations[key];
  });

  if (Object.keys(errors.value).length > 0) return;

  try {
    const response = await axios.post(
      "http://localhost:3000/api/orders/payment-methods/save",
      {
        paymentInfo: {
          cardNumber: form.value.cardNumber.replace(/\s/g, ""), // Elimina espacios
          expiryDate: form.value.expiryDate,
          securityCode: form.value.securityCode,
          provincia: form.value.provincia,
          canton: form.value.canton,
          infoUbicacion: form.value.infoUbicacion,
          cardHolder: form.value.cardHolder,
        },
        saveForFuture: form.value.saveForFuture,
        alias: form.value.alias || `Tarjeta ${form.value.cardNumber.slice(-4)}`,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      success.value = response.data.message || "Pago completado correctamente";
      // Recargar tarjetas guardadas después de guardar una nueva
      await fetchSavedCards();
      // Redirigir después de 2 segundos
      setTimeout(() => router.push("/"), 2000);
    }
  } catch (error) {
    console.error("Error en el pago:", error);
    serverError.value =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Error al procesar el pago";
  }
}
</script>

<style lang="scss" scoped>
.alert {
  border-radius: 8px;
  padding: 12px;
}

.saved-card {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
}

.form-control {
  &:focus {
    border-color: #ffc107;
    box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.25);
  }
}

.saved-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.saved-card:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
}

.overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4)
  );
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content-box {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 10%;
  color: white;
  max-width: 900px;
}

h2 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: white; /* Color del texto */
}

.form-label {
  font-family: "Poppins", sans-serif;
}

.form-control {
  font-family: Noto Sans, sans-serif;
  font-size: 1rem;
  border-radius: 5px; /* Bordes redondeados */
}

.form-check {
  font-family: Noto Sans, sans-serif;
  align-items: center;
  gap: 0.5rem;
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0;
  margin-right: 0.5rem;
}

.form-check-label {
  font-size: 1rem;
}
.form-check-input:checked {
  background-color: #28a745; /* Color verde */
  border-color: #28a745; /* Color verde */
}

p {
  font-family: Noto Sans, sans-serif;
  font-size: 1rem;
}

button {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>
