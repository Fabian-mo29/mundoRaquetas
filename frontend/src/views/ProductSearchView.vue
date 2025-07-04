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
      <div class="main-container container mx-auto p-5 content-box">
        <h2 class="fw-bold mb-4 responsive-text text-center">
          Buscador de productos
        </h2>

        <form class="mb-4 input-wrapper" @submit.prevent="buscar">
          <input
            v-model.trim="searchQuery"
            type="text"
            id="search"
            placeholder="Buscar productos..."
            autocomplete="off"
          />
          <button type="submit" class="search-btn">
            <i class="pi pi-search"></i>
          </button>
        </form>
        <ul v-if="validateShowSuggestions()" class="suggestions-list">
          <li
            v-for="(product, index) in suggestions.slice(0, 7)"
            :key="index"
            class="suggestion-item"
            @click="selectSuggestion(index)"
          >
            {{ product.Name }}
          </li>
        </ul>
        <p v-else-if="searchQuery && showSuggestions">
          No hay productos que coincidan con la búsqueda.
        </p>
      </div>
    </div>
  </div>
  <div v-if="searchResults.length > 0" class="mt-5">
    <h2 class="fw-bold mb-4 responsive-text text-center">
      Resultados de la búsqueda
    </h2>
    <ProductList :inventory="searchResults" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProductList from "@/components/ProductList.vue";
import axios from "axios";
import { onMounted } from "vue";

const searchQuery = ref("");
const products = ref([]);
const suggestions = ref([]);
const searchResults = ref([]);
const showSuggestions = ref(true);

function getProducts() {
  axios
    .get("https://localhost:3000/api/products")
    .then((response) => {
      products.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

onMounted(() => {
  getProducts();
});

function buscar() {
  filterProducts();
  searchResults.value = suggestions.value;
  showSuggestions.value = false;
}

function filterProducts() {
  if (!searchQuery.value) {
    suggestions.value = [];
  }
  suggestions.value = products.value.filter((product) =>
    product.Name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}

function validateShowSuggestions() {
  if (searchQuery.value === "") {
    showSuggestions.value = true;
    return false;
  }
  filterProducts();
  return suggestions.value.length > 0 && showSuggestions.value;
}

function toggleSuggestions() {
  showSuggestions.value = !showSuggestions.value;
}

function selectSuggestion(index) {
  searchQuery.value = suggestions.value[index].Name;
  toggleSuggestions();
}
</script>

<style lang="scss" scoped>
.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  height: 80vh;
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

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #000000;
  font-family: "Poppins", sans-serif;
}

.suggestion-item:hover {
  color: #3498db;
  background-color: #f1f1f1;
}
</style>
