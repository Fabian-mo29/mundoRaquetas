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
              type="text"
              id="inputSecurityCode"
              v-model="form.securityCode"
              required
              placeholder="CVV"
            />
            <div v-if="errors.securityCode" class="text-danger">
              {{ errors.securityCode }}
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

          <div v-if="serverError" class="text-danger mt-3 text-center">
            {{ serverError }}
          </div>
          <div v-if="success" class="text-success mt-3 text-center">
            {{ success }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
});

const errors = ref({});
const serverError = ref("");
const success = ref("");

// Mapea los mensajes del backend a los campos del formulario
function mapBackendError(message) {
  if (message.includes("usuario")) errors.value.username = message;
  else if (message.includes("Nombre de usuario"))
    errors.value.username = message;
  else if (message.includes("Nombre y apellidos")) {
    errors.value.nombre = message;
    errors.value.apellido1 = message;
    errors.value.apellido2 = message;
  } else if (message.includes("email") || message.includes("Email"))
    errors.value.email = message;
  else if (message.includes("contraseña") || message.includes("Contraseña"))
    errors.value.password = message;
  else serverError.value = message;
}

async function completePayment() {
  errors.value = {};
  serverError.value = "";
  success.value = "";

  if (!form.value.cardNumber) {
    errors.value.cardNumber = "El número de tarjeta es obligatorio.";
  }
  if (!form.value.expiryDate) {
    errors.value.expiryDate = "La fecha de vencimiento es obligatoria.";
  }
  if (!form.value.securityCode) {
    errors.value.securityCode = "El código de seguridad es obligatorio.";
  }
  if (!form.value.provincia) {
    errors.value.provincia = "La provincia es obligatoria.";
  }
  if (!form.value.canton) {
    errors.value.canton = "El cantón es obligatorio.";
  }
  if (!form.value.infoUbicacion) {
    errors.value.infoUbicacion = "Las otras señas son obligatorias.";
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/orders",
      { paymentInfo: form.value },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      success.value = "Pago completado correctamente. Redirigiendo...";
      setTimeout(() => router.push("/"), 1500);
    } else {
      mapBackendError(response.data.message || "Error al completar el pago.");
    }
    alert("Pago completado con éxito");
  } catch (error) {
    alert("Error al completar el pago");
    console.error(error);
    serverError.value = "Error de conexión con el servidor.";
  }
}
</script>

<style lang="scss" scoped>
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
