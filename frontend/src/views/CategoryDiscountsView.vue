<!-- Manera con el carrusel y las advertencias de oferta -->
<template>
  <div>
    <OfertaList />
  </div>
</template>

<script setup>
import OfertaList from "@/components/OfertaList.vue";
</script>

<style lang="scss" scoped></style>

<!-- Manera simple solo las ofertas sin el carrusel ni las advertencias de oferta -->
<!-- <template>
  <CategoryView categoryType="Ofertas" categoryHeader="Ofertas del día"/>
</template>

<script setup>
import CategoryView from '@/views/CategoryView.vue';
</script> -->
