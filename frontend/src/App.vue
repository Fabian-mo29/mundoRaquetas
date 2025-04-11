<template>
  <div class = "layout">
    <HeaderBar/>  
    <VertSidebar/>
    <!-- <NavBar/> -->
    <RouterView/>
    <FooterBar/>
  </div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
import HeaderBar from './components/HeaderBar.vue';
import VertSidebar from './components/VertSidebar.vue';
import FooterBar from './components/FooterBar.vue';

  export default {
    components: {
      //NavBar,
      HeaderBar,
      VertSidebar,
      FooterBar,
    },
  };  
</script>

<style lang="scss" scoped>
</style>
