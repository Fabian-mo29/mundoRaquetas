<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                :class="[acttiveLink('/category/men'), 'nav-link']"
                :to="'/category/men'"
                >Hombres</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="[acttiveLink('/category/women'), 'nav-link']"
                :to="'/category/women'"
                >Mujeres</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="[acttiveLink('/category/kids'), 'nav-link']"
                :to="'/category/kids'"
                >Niños</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="[acttiveLink('/category/accessories'), 'nav-link']"
                :to="'/category/accessories'"
                >Accesorios</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :class="[acttiveLink('/category/ofertas'), 'nav-link']"
                :to="'/category/ofertas'"
                >Ofertas</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";

const acttiveLink = (link) => {
  const route = useRoute();
  return route.path === link ? "active" : "";
};
</script>

<style lang="scss" scoped></style>
