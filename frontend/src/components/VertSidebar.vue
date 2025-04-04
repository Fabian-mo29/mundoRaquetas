<template>
  <div class="vertsidebar">
    <!-- Logo de la tienda tiene que estar centrado-->
    <div class="logo" style="text-align: center;">
      <h4>Padelta</h4>
    </div>
    <ul class="nav flex-column">
      <hr />
      <li class="nav-item">
        <span class="nav-title">CATEGORÍAS</span>
      </li>
      <li class="nav-item" v-for="item in categories" :key="item.name">
        <a href="#" class="nav-link">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const categories = ref([
  { name: "Palas" },
  { name: "Mochilas" },
  { name: "Zapatos" },
  { name: "Ropa" },
  { name: "Bolas" },
  { name: "Accesorios" },
]);
</script>

<style scoped>
.vertsidebar {
  width: 250px;
  height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.nav-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 0;
  color: #6c757d;
}

.nav-link {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  background: #e9ecef;
  border-radius: 5px;
}
</style>
