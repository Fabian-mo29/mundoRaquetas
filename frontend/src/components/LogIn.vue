<template>
  <!-- Se exportan las fonts -->
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <div class="bg-image">
    <div class="overlay">
      <div
        id="mainCard"
        class="d-flex justify-content-center align-items-center content-box my-5 py-4"
      >
        <form
          @submit.prevent="logIn"
          class="form-container"
          style="width: 100%; max-width: 400px"
        >
          <h2 class="text-center mb-4">Inicio de Sesión</h2>

          <div class="mb-3">
            <label class="form-label" for="inputUserOrEmail"
              >Usuario o Email</label
            >
            <input
              class="form-control"
              type="text"
              id="inputUserOrEmail"
              v-model="datosSesion.userOrEmail"
              required
              placeholder="usuario o correo@email.com"
            />
          </div>

          <div class="mb-3">
            <label class="form-label" for="inputPassword">Contraseña</label>
            <input
              class="form-control"
              type="password"
              id="inputPassword"
              v-model="datosSesion.password"
              required
              placeholder="contraseña"
            />
          </div>

          <div class="d-flex justify-content-between">
            <p class="mb-4">
              Si no tiene una cuenta
              <RouterLink to="/register" class="link-warning"
                >Regístrese aquí</RouterLink
              >
            </p>
          </div>

          <button
          type="submit"
          class="btn btn-outline-warning w-100 mt-2"
        >
          Iniciar Sesión
        </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import CryptoJS from "crypto-js";

const router = useRouter();

const datosSesion = ref({
  userOrEmail: "",
  password: "",
});

async function logIn() {
  try {
    // Hashea la contraseña antes de enviarla
    const hashedPassword = CryptoJS.SHA256(datosSesion.value.password).toString();

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identificador: datosSesion.value.userOrEmail,
        password: hashedPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guarda la info de usuario en sessionStorage
      sessionStorage.setItem("token", data.token);
      // Dispara un evento personalizado para avisar al NavBar
      window.dispatchEvent(new CustomEvent("user-session"));
      router.push("/"); // Redirige al inicio
    } else {
      alert(data.message || "Error al iniciar sesión");
    }
  } catch (error) {
    alert("Error de conexión con el servidor");
  }
}
</script>

<style lang="scss" scoped>

.link-warning {
  color: #ffc107 !important;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;
}
.link-warning:hover {
  color: #ffea70 !important;
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
  padding: 5%;
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
