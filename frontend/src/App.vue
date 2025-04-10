<template>
  <div class = "layout">
    <HeaderBar/>
    
    <VertSidebar/>
  
    <!-- <NavBar/> -->
    <ProductList/>
    <CarruselOfertas/>
    <FooterBar/>
  </div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
import HeaderBar from './components/HeaderBar.vue';
import ProductList from './components/ProductList.vue';
import VertSidebar from './components/VertSidebar.vue';
import FooterBar from './components/FooterBar.vue';
import CarruselOfertas from './components/CarruselOfertas.vue';

  export default {
    components: {
      //NavBar,
      HeaderBar,
      ProductList,
      VertSidebar,
      FooterBar,
      CarruselOfertas
    },
  };  
</script>

<style lang="scss" scoped>
</style>
