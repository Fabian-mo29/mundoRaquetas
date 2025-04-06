<template>
    <header class="headerBar">
      <h1>Padelta</h1>
      <UserActions />
    </header>
</template>
  
<script>
import UserActions from './UserActions.vue';

export default {
  name: 'HeaderBar',
  components: {
    UserActions
  }
};

</script>
  
<style lang="scss" scoped>
/* Estilo para la barra del encabezado */
.headerBar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 250px;
}
</style>
