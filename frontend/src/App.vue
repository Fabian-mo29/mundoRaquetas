<template>
  <div class="layout">
    <HeaderBar />
    <!-- <VertSidebar/> -->
    <NavBar />
    <RouterView />
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
// import VertSidebar from './components/VertSidebar.vue';
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    HeaderBar,
    NavBar,
    // VertSidebar,
    FooterBar,
  },
};
</script>

<style lang="scss" scoped>
.vertsidebar {
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
}

header {
  position: relative;
  z-index: 10;
}
</style>
