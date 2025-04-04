<template>
  <div id="flexbox" class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow" style="width: 18rem;">
      <img src="../../public/raqueta.jpg" class="card-img-top" alt="Imagen de raqueta" />
      <div class="card-body">
        <p class="card-text"><strong>Wilson m23</strong></p>
        <p class="card-text">Raqueta wilson de tennis...</p>
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: large;"><strong>$99,99</strong></p>
          <button class="btn btn-success">Comprar</button>
        </div>
      </div>
    </div>

    <div class="card shadow" style="width: 18rem;">
      <img src="../../public/raqueta.jpg" class="card-img-top" alt="Imagen de raqueta" />
      <div class="card-body">
        <p class="card-text"><strong>Wilson m23</strong></p>
        <p class="card-text">Raqueta wilson de tennis...</p>
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: large;"><strong>$99,99</strong></p>
          <button class="btn btn-success">Comprar</button>
        </div>
      </div>
    </div>

    <div class="card shadow" style="width: 18rem;">
      <img src="../../public/raqueta.jpg" class="card-img-top" alt="Imagen de raqueta" />
      <div class="card-body">
        <p class="card-text"><strong>Wilson m23</strong></p>
        <p class="card-text">Raqueta wilson de tennis...</p>
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: large;"><strong>$99,99</strong></p>
          <button class="btn btn-success">Comprar</button>
        </div>
      </div>
    </div>

    <div class="card shadow" style="width: 18rem;">
      <img src="../../public/raqueta.jpg" class="card-img-top" alt="Imagen de raqueta" />
      <div class="card-body">
        <p class="card-text"><strong>Wilson m23</strong></p>
        <p class="card-text">Raqueta wilson de tennis...</p>
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-size: large;"><strong>$99,99</strong></p>
          <button class="btn btn-success">Comprar</button>
        </div>
      </div>
      </div>

  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
 #flexbox {
  display: flex;
  flex-wrap: wrap; /* Permite que las cartas se acomoden en varias líneas si es necesario */
  gap: 3%;
  margin-left: 250px; /* Empuja las cartas a la derecha para que no tapen el sidebar */
  padding: 20px; /* Espacio adicional */
}
</style>
