<template>
  <header class="headerBar">
    <img src="../assets/logoPadelta.png" alt="Logo de Padelta" class="logo-img" />
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
.headerBar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease;
}

a:hover {
  transform: scale(1.2);
  cursor: pointer;
}

.logo-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-right: 1rem;
}
</style>
