<template>
  <div class="layout">
    <NavBar />
    <RouterView />
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    NavBar,
    FooterBar,
  },
};
</script>

<style lang="scss" scoped>

header {
  position: relative;
  z-index: 10;
}
</style>
