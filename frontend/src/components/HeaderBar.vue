<template>
  <header class="headerBar">
    <h1><a href="#">Padelta</a></h1>
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
  margin-left: 250px;
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
</style>
