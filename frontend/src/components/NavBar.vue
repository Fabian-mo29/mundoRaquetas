<script setup>
import UserActions from './UserActions.vue';
import { RouterLink, useRoute } from 'vue-router';

const activeLink = (link) => {
  const route = useRoute();
  return route.path === link ? "active" : "";
};
</script>

<template>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NavBar</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  <link href="https://cdn.lineicons.com/5.0/lineicons.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</head>

<nav class="navbar navbar-expand-lg py-4 shadow">
    <div class="container d-flex align-items-center justify-content-between">

      <!-- Logo -->
      <RouterLink to="/" class="d-flex align-items-center">
        <img src="@/assets/logoPadelta.png" alt="Logo de Padelta" class="logo-img" />
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
      <div class="d-none d-lg-flex align-items-center flex-grow-1 justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item px-3">
            <RouterLink :to="'/category/rackets'" :class="[activeLink('/category/rackets'), 'nav-link']">Palas</RouterLink>
          </li>
          <li class="nav-item px-3">
            <RouterLink :to="'/category/balls'" :class="[activeLink('/category/balls'), 'nav-link']">Bolas</RouterLink>
          </li>
          <li class="nav-item px-3">
            <RouterLink :to="'/category/shoes'" :class="[activeLink('/category/shoes'), 'nav-link']">Calzado</RouterLink>
          </li>
          <li class="nav-item px-3">
            <RouterLink :to="'/category/accessories'" :class="[activeLink('/category/accessories'), 'nav-link']">Accesorios</RouterLink>
          </li>
          <li class="nav-item px-3">
            <RouterLink :to="'/category/ofertas'" :class="[activeLink('/category/ofertas'), 'nav-link']">Ofertas</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Acciones de usuario desktop -->
      <div class="d-none d-lg-flex user-actions">
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
            <RouterLink :to="'/category/rackets'" :class="[activeLink('/category/rackets'), 'nav-link']" data-bs-dismiss="offcanvas">Palas</RouterLink>
          </li>
          <li class="nav-item py-2">
            <RouterLink :to="'/category/balls'" :class="[activeLink('/category/balls'), 'nav-link']" data-bs-dismiss="offcanvas">Bolas</RouterLink>
          </li>
          <li class="nav-item py-2">
            <RouterLink :to="'/category/shoes'" :class="[activeLink('/category/shoes'), 'nav-link']" data-bs-dismiss="offcanvas">Calzado</RouterLink>
          </li>
          <li class="nav-item py-2">
            <RouterLink :to="'/category/accessories'" :class="[activeLink('/category/accessories'), 'nav-link']" data-bs-dismiss="offcanvas">Accesorios</RouterLink>
          </li>
          <li class="nav-item py-2">
            <RouterLink :to="'/category/ofertas'" :class="[activeLink('/category/ofertas'), 'nav-link']" data-bs-dismiss="offcanvas">Ofertas</RouterLink>
          </li>
        </ul>

        <!-- Acciones de usuario móvil -->
        <div class="mt-4">
          <UserActions />
        </div>
      </div>
    </div>

  </nav>
</template>

<style scoped lang="scss">
.navbar-toggler {
  color: #ffffff; /* Color del ícono */
  padding: 0.5rem; 
}

.navbar-toggler:hover {
  color: #3498db
}

.navbar {
  font-family: 'Poppins', sans-serif;
  background-color: #2c3e50;
  color: #f8f9fa;
}

.logo-img {
  max-width: 150px;
  height: auto;
}

nav .nav-link {
  color: #f8f9fa;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

nav .nav-link:hover {
  color: #ffc107 !important;
}

nav .nav-link.active {
  color: #f8f9fa !important;
  font-weight: 600;
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
