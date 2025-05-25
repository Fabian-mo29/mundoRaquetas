<template>
  <!-- Código inspirado en el tutorial de "Coding Yaar" en YouTube -->
  <!-- Video: https://www.youtube.com/watch?v=YFJ4IVicc_s -->
  <footer class="custom-footer text-light pt-5">
    <div class="container px-5">
      <div class="row">
        <div class="col">
          <h3>Políticas</h3>
          <ul class="list-unstyled pt-2">
            <li class="py-1"></li>
            <RouterLink active-class="active" to="/termsAndConditions" class="nav-link"
              >Términos y condiciones</RouterLink
            >
            <li class="py-1"></li>
            <a href="#">Reembolsos</a>
            <li class="py-1"></li>
            <a href="#">Privacidad</a>
            <li class="py-1"></li>
            <a href="#">Cookies</a>
          </ul>
        </div>
        <div class="col">
          <h3>Ayuda</h3>
          <ul class="list-unstyled pt-2">
            <li class="py-1"></li>
            <RouterLink active-class="active" to="/reqWarranty" class="nav-link"
              >Solicitar garantía</RouterLink
            >
            <li class="py-1"></li>
            <RouterLink active-class="active" to="/trackOrder" class="nav-link"
              >Seguir orden</RouterLink
            >
            <li class="py-1"></li>
            <RouterLink active-class="active" to="/contactUs" class="nav-link"
              >Contáctanos</RouterLink
            >
          </ul>
        </div>
        <div class="col">
          <h3>Nosotros</h3>
          <ul class="list-unstyled pt-2">
            <li class="py-1"></li>
            <RouterLink active-class="active" to="/physicalStore" class="nav-link"
              >Tienda física</RouterLink>
            <li class="py-1"></li>
            <a href="#">Blog</a>
          </ul>
        </div>
        <div class="col">
          <h3>Recursos</h3>
          <ul class="list-unstyled pt-2">
            <li class="py-1"></li>
            <a href="#">Guía para comprar</a>
            <li class="py-1"></li>
            <a href="#">Garantías</a>
          </ul>
        </div>
        <div class="col-6 col-lg-3 text-lg-end">
          <h3>Redes Sociales</h3>
          <div class="social-media pt-2">
            <a href="#" class="text-light fs-2 me-3"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="#" class="text-light fs-2 me-3"
              ><i class="bi bi-tiktok"></i
            ></a>
            <a href="#" class="text-light fs-2 me-3"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="#" class="text-light fs-2"
              ><i class="bi bi-twitter-x"></i
            ></a>
          </div>
        </div>
      </div>
      <hr />
      <div class="d-sm-flex justify-content-between py-1">
        <p>2025 &copy; Padelta Dev Team. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
/* Estilo para poner el footer del mismo color que el header */
.custom-footer {
  background-color: #2c3e50;
}

/* Estilo para el color de los links */
a {
  color: inherit;
  text-decoration: none;
}

/* Estilo para el color de los links al pasar el mouse */
a:hover {
  color: #ffc107;
  transition: color 0.3s ease;
}

/* Estilo para el color de los iconos de redes sociales al pasar el mouse*/
.social-media i:hover {
  color: #3498db;
  transition: transform 0.3s ease, color 0.3s ease;
}

h3 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #ffffff;
}

ul {
  font-family: Noto Sans, sans-serif;
}

p {
  font-family: Noto Sans, sans-serif;
  color: #ffffff;
  font-size: 1rem;
}
</style>
