<template>
  <div>
    <button @click="printProducts">Productos</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const products = ref();

onMounted(() => {
  fetchCart();
});

function printProducts() {
  console.log(products.value);
}
async function fetchCart() {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/api/cart/wishlist",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}
</script>

<style lang="scss" scoped></style>
