<template>
    <footer class="footerBar">
    <div class="footerSections">
        <div>
            <h3>Políticas</h3>
                <nav>
                    <ul>  
                        <li><a href="#">Términos y condiciones</a></li>
                        <li><a href="#">Reembolso</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                    </ul>
                 </nav>
        </div>
        <div>
            <h3>Ayuda</h3>
                <nav>
                    <ul>  
                        <li><a href="#">Solicitar garantía</a></li>
                        <li><a href="#">Seguir orden</a></li>
                        <li><a href="#">Contáctanos</a></li>
                    </ul>
                </nav>
        </div>
        <div>
            <h3>Nosotros</h3>
                <nav>
                    <ul>  
                        <li><a href="#">Tiendas físicas</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                 </nav>
        </div>
        <div>
            <h3>Recursos</h3>
                <nav>
                    <ul>  
                        <li><a href="#">Guía para comprar</a></li>
                        <li><a href="#">Garantías</a></li>
                    </ul>
                 </nav>
        </div>
        <p>&copy; 2025 Padelta. Todos los derechos reservados.</p>
    </div>
        <SocialMedia/>
    </footer>
</template>

<script setup>
import SocialMedia from './SocialMedia.vue';


</script>

<style lang="scss" scoped>
/* Estilo para la barra de pie de página */
.footerBar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 250px;
}

/* Estilo para las secciones dentro del pie de página (Políticas, Ayuda, Nosotros y Recursos) */
.footerSections {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Estilo para que cada div dentro de footerSections tenga ese ancho */
.footerSections > div {
  width: 22%;
}

/* Estilo para cada lista dentro de cada sección */
nav ul {
  list-style: none;
  padding: 0;
}

/* Estilo para cada punto dentro de cada sección */
nav a {
  text-decoration: none;
  color: #6e99c5;
  display: block;
  padding: 5px 0;
}

/* Estilo para el hover de cada punto de cada sección */
nav ul li a:hover {
  color: #007bff; 
}

</style>