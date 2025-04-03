<template>
  <NavBar/>
  <ProductCard/>
</template>

<script>
import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';

  export default {
    components: {
      NavBar,
      ProductCard
    },
  };  
</script>

<style lang="scss" scoped>
</style>
