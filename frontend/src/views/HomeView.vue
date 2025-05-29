<template>
    <div>
    <CarruselMarca/>
    <CarruselOfertas/>
    <ProductList/>
    </div>
</template>

<script setup>

import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductList from '@/components/ProductList.vue';
import CarruselOfertas from '@/components/CarruselOfertas.vue';
import CarruselMarca from '@/components/CarruselMarca.vue';
import { onMounted } from 'vue';

onMounted(() => {
  AOS.init({
    offset: 20,
  });
});

</script>

<style lang="scss" scoped>

</style>