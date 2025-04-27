<template>
  <div class="background-logo"></div>

  <div
    id="mainCard"
    class="d-flex justify-content-center align-items-center min-vh-100"
  >
    <form
      @submit.prevent="logIn"
      class="form-container"
      style="width: 100%; max-width: 400px"
    >
      <h3 class="text-center mb-4">Inicio de Sesión</h3>

      <div class="mb-3">
        <label class="form-label" for="inputEmail">Email</label>
        <input
          class="form-control"
          type="email"
          id="inputEmail"
          required
          placeholder="correo@email.com"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="inputPassword">Contraseña</label>
        <input
          class="form-control"
          type="password"
          id="inputPassword"
          required
          placeholder="contraseña"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="inputDireccion">Dirección</label>
        <input
          class="form-control"
          type="Direccion"
          id="inputDireccion"
          required
          placeholder="dirección"
        />
      </div>

      <div class="mb-4 form-check">
        <input class="form-check-input" type="checkbox" id="rememberMe" />
        <label class="form-check-label" for="rememberMe">Recuérdame</label>
      </div>

      <div class="d-flex justify-content-between">
        <p class="mb-4">
          Si no tiene una cuenta
          <RouterLink to="/register" class="text-primary"
            >Regístrese aquí</RouterLink
          >
        </p>
      </div>

      <button type="submit" class="btn btn-success" style="width: 100%">
        Iniciar Sesión
      </button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const datosSesion = { correo: "", password: "" };

function logIn() {
  alert(`${datosSesion.correo}`);
}
</script>

<style lang="scss" scoped>
.background-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/canchaPadel.jpg"); /* Ruta de la imagen del logo */
  background-size: cover;
  background-position: center;
  background-color: black;
  filter: blur(10px); /* Efecto de desenfoque */
  z-index: -1; /* Envía la imagen al fondo */
  opacity: 0.5; /* Hace la imagen más tenue */
}

h3 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #000000; /* Color del texto */
}

#mainCard {
  position: relative;
  z-index: 1; /* Asegura que el contenido esté encima de la imagen */
}

.form-container {
  background-color: white; /* Fondo blanco */
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px; /* Bordes redondeados */
  padding: 2rem; /* Espaciado interno */
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
