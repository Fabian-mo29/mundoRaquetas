<template>
  <div class="bg-image">
    <div class="overlay">
      <div
        id="mainCard"
        class="d-flex justify-content-center align-items-center content-box my-5 py-4"
      >
        <form @submit.prevent="Register" style="width: 100%; max-width: 400px">
          <h2 class="text-center mb-4">Registro</h2>

          <div class="mb-3">
            <label class="form-label" for="inputUsername"
              >Nombre de usuario</label
            >
            <input
              class="form-control"
              type="text"
              id="inputUsername"
              v-model="form.username"
              required
              placeholder="nombre de usuario"
            />
            <div v-if="errors.username" class="text-danger">
              {{ errors.username }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputNombre">Nombre</label>
            <input
              class="form-control"
              type="text"
              id="inputNombre"
              v-model="form.nombre"
              required
              placeholder="nombre"
            />
            <div v-if="errors.nombre" class="text-danger">
              {{ errors.nombre }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputApellido1"
              >Primer apellido</label
            >
            <input
              class="form-control"
              type="text"
              id="inputApellido1"
              v-model="form.apellido1"
              required
              placeholder="primer apellido"
            />
            <div v-if="errors.apellido1" class="text-danger">
              {{ errors.apellido1 }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputApellido2"
              >Segundo apellido</label
            >
            <input
              class="form-control"
              type="text"
              id="inputApellido2"
              v-model="form.apellido2"
              required
              placeholder="segundo apellido"
            />
            <div v-if="errors.apellido2" class="text-danger">
              {{ errors.apellido2 }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputEmail">Email</label>
            <input
              class="form-control"
              type="email"
              id="inputEmail"
              v-model="form.email"
              required
              placeholder="correo@email.com"
            />
            <div v-if="errors.email" class="text-danger">
              {{ errors.email }}
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputPassword">Contraseña</label>
            <input
              class="form-control"
              type="password"
              id="inputPassword"
              v-model="form.password"
              required
              placeholder="contraseña"
            />
            <div v-if="errors.password" class="text-danger">
              {{ errors.password }}
            </div>
          </div>

          <!-- <div class="mb-4 form-check">
            <input class="form-check-input" type="checkbox" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">Recuérdame</label>
          </div> -->

          <div class="d-flex justify-content-between">
            <p class="mb-4">
              Si ya tiene una cuenta
              <RouterLink to="/login" class="text-primary"
                >Inicie sesión aquí</RouterLink
              >
            </p>
          </div>
          <button
            type="submit"
            class="btn btn-success"
            style="width: 100%; background-color: #2c3e50"
          >
            Registrarse
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
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  username: "",
  nombre: "",
  apellido1: "",
  apellido2: "",
  email: "",
  password: "",
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

async function Register() {
  errors.value = {};
  serverError.value = "";
  success.value = "";

  try {
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });
    const data = await response.json();
    if (response.ok) {
      success.value = "Usuario registrado correctamente. Redirigiendo...";
      setTimeout(() => router.push("/login"), 1500);
    } else {
      mapBackendError(data.message || "Error al registrar usuario.");
    }
  } catch (error) {
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
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
}
</style>
