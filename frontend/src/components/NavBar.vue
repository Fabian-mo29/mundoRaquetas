<template>
  <nav class="navbar navbar-expand-lg py-4 shadow">
    <div class="container d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <RouterLink to="/" class="d-flex align-items-center">
        <img
          src="@/assets/logoPadelta.png"
          alt="Logo de Padelta"
          class="logo-img"
        />
      </RouterLink>

      <!-- Botón hamburguesa (solo en móvil) -->
      <button
        class="navbar-toggler border-0 d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobile-menu"
        aria-controls="mobile-menu"
      >
        <i class="lni lni-menu-hamburger-1"></i>
      </button>

      <!-- Menú desktop -->
      <div
        class="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center"
      >
        <ul class="navbar-nav">
          <li class="nav-item px-3">
            <RouterLink
              active-class="active"
              to="/category/rackets"
              class="nav-link"
              >Palas</RouterLink
            >
          </li>
          <li class="nav-item px-3">
            <RouterLink
              active-class="active"
              to="/category/balls"
              class="nav-link"
              >Bolas</RouterLink
            >
          </li>
          <li class="nav-item px-3">
            <RouterLink
              active-class="active"
              to="/category/shoes"
              class="nav-link"
              >Calzado</RouterLink
            >
          </li>
          <li class="nav-item px-3">
            <RouterLink
              active-class="active"
              to="/category/accessories"
              class="nav-link"
              >Accesorios</RouterLink
            >
          </li>
          <li class="nav-item px-3">
            <RouterLink
              active-class="active"
              to="/category/ofertas"
              class="nav-link"
              >Ofertas</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- Acciones de usuario desktop -->
      <div class="d-none d-lg-flex user-actions">
      <span class="me-3" style="color:#ffc107; font-weight:bold;">{{ username }}</span>
      <UserActions />
      </div>
    </div>

    <!-- Offcanvas -->
    <div
      class="offcanvas offcanvas-end d-lg-none"
      tabindex="-1"
      id="mobile-menu"
      aria-labelledby="mobile-menu-label"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="mobile-menu-label">Menú</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body d-flex flex-column align-items-center">
        <ul class="navbar-nav flex-column text-center">
          <li class="nav-item py-2">
            <RouterLink
              active-class="active"
              to="/category/rackets"
              class="nav-link"
              @click="closeCanvas()"
              >Palas</RouterLink
            >
          </li>
          <li class="nav-item py-2">
            <RouterLink
              active-class="active"
              to="/category/balls"
              class="nav-link"
              @click="closeCanvas()"
              >Bolas</RouterLink
            >
          </li>
          <li class="nav-item py-2">
            <RouterLink
              active-class="active"
              to="/category/shoes"
              class="nav-link"
              @click="closeCanvas()"
              >Calzado</RouterLink
            >
          </li>
          <li class="nav-item py-2">
            <RouterLink
              active-class="active"
              to="/category/accessories"
              class="nav-link"
              @click="closeCanvas()"
              >Accesorios</RouterLink
            >
          </li>
          <li class="nav-item py-2">
            <RouterLink
              to="/category/ofertas"
              class="nav-link"
              @click="closeCanvas()"
              active-class="active"
              >Ofertas</RouterLink
            >
          </li>
        </ul>

        <!-- Acciones de usuario móvil -->
        <div class="mt-4 d-flex flex-column align-items-center">
        <span class="mb-2" style="color:#ffc107; font-weight:bold;">{{ username }}</span>
        <UserActions />
      </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import UserActions from "./UserActions.vue";
import { RouterLink } from "vue-router";
import { Offcanvas } from "bootstrap";
import { ref, onMounted } from "vue";

const username = ref("Invitado");

const loadUsername = () => {
  const user = sessionStorage.getItem("usuario");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      username.value = parsed.Username || "Invitado";
    } catch {
      username.value = "Invitado";
    }
  } else {
    username.value = "Invitado";
  }
};

const closeCanvas = () => {
  const offcanvasElement = document.getElementById("mobile-menu");
  const offcanvas = Offcanvas.getInstance(offcanvasElement);
  if (offcanvas) {
    offcanvas.hide();
  }
};

onMounted(() => {
  loadUsername();
  window.addEventListener("storage", loadUsername);
});
</script>

<style scoped lang="scss">
.navbar-toggler {
  color: #ffffff; /* Color del ícono */
  padding: 0.5rem;
}

.navbar-toggler:hover {
  color: #3498db;
}

.navbar {
  font-family: "Poppins", sans-serif;
  background-color: #2c3e50;
  color: #f8f9fa;
}

.logo-img {
  max-width: 150px;
  height: auto;
}

.logo-img:hover {
  transition: transform 0.3s ease;
  transform: scale(1.15);
}

nav .nav-link {
  color: #f8f9fa;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

nav .nav-link:hover {
  transition: transform 0.3s ease;
  transform: scale(1.15);
  border-radius: 3px;
  font-weight: 600;
  color: #ffc107 !important;
}

nav .nav-link.active {
  color: #f8f9fa !important;
  font-weight: 600;
  transform: scale(1.15);
}

.nav-link.active:hover {
  color: #ffc107 !important;
}

.user-actions {
  display: flex;
  align-items: center;
}

.offcanvas-header {
  background-color: #2c3e50;
  color: white;
}

.offcanvas-body {
  background-color: #2c3e50;
}
</style>
