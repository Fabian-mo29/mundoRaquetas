<template>
    <div class="user-actions">
      <a href="#" class="icon">👤</a> <!-- Cuenta de usuario -->
      <a href="#" class="icon">🔎</a> <!-- Búsqueda -->
      <a href="#" class="icon">🛒</a> <!-- Carrito -->
    </div>
</template>
  
<script>
export default {
name: 'UserActions',
};
</script>

<style lang="scss" scoped>
/* Estilo para el contenedor de acciones de usuario (Cuenta de usuario, Búsqueda y Carrito) */
.user-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #547596;
    border-radius: 30px;
    max-width: 600px;
    margin:0%;
    }

/* Estilo para cada ícono (emojis) */
.icon {
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
    position: relative;
}

/* Estilo para hacer el hover para cada ícono */
.icon:hover {
    opacity: 0.8;
}

/* Estilo para hacer el círculo detrás de cada ícono */
.icon:hover::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  opacity: 0.6;
  z-index: -1;
}
</style>
