<template>
  <div class = "layout">
    <HeaderBar/>
    
    <VertSidebar/>
  
    <NavBar/>
    <ProductCard/>

    <FooterBar/>
  </div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
import HeaderBar from './components/HeaderBar.vue';
import ProductCard from './components/ProductCard.vue';
import VertSidebar from './components/VertSidebar.vue';
import FooterBar from './components/FooterBar.vue';

  export default {
    components: {
      //NavBar,
      HeaderBar,
      ProductCard,
      VertSidebar,
      FooterBar,
    },
  };  
</script>

<style lang="scss" scoped>
</style>
