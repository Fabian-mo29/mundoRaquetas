<template>
  <div class = "layout">
    <VertSidebar/>
  
  <NavBar/>
  <ProductCard/>
</div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';
import VertSidebar from './components/VertSidebar.vue';

  export default {
    components: {
      //NavBar,
      ProductCard,
      VertSidebar,
    },
  };  
</script>

<style lang="scss" scoped>
</style>
