<template>
  <div class="bg-image">
    <div class="overlay">
      <div class="main-container container mx-auto p-5 content-box">
        <h2 class="fw-bold mb-4 responsive-text text-center">
          Buscador de productos
        </h2>

        <div class="mb-4 input-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            id="search"
            placeholder="Buscar productos..."
          />
          <button type="button" @click="buscar" class="search-btn">
            <i class="pi pi-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");

function buscar() {
  console.log("Buscando productos:", searchQuery.value);
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  height: 60vh;
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
  padding: 2rem;
  color: white;
  width: 100%;
  max-width: 900px;
}

h2 {
  color: white;
}

.input-wrapper {
  display: flex;
  position: relative;
  background-color: white;
  width: 100%;
  border-radius: 10px;
  height: 2.5rem;
  padding: 0;
  align-items: center;
}

input {
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.search-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
}

.search-btn:hover {
  color: #3498db;
}

.search-btn i {
  color: inherit;
}

input:focus {
  outline: none;
  box-shadow: none;
}
</style>
