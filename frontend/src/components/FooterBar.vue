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
                        <a href="#">Términos y condiciones</a>
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
                        <a href="#">Solicitar garantía</a>
                        <li class="py-1"></li>
                        <a href="#">Seguir orden</a>
                        <li class="py-1"></li>
                        <a href="#">Contáctanos</a>
                    </ul>
                </div>
                <div class="col">
                    <h3>Nosotros</h3>
                    <ul class="list-unstyled pt-2">
                        <li class="py-1"></li>
                        <a href="#">Tiendas físicas</a>
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
                        <a href="#" class="text-light fs-2 me-3"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-light fs-2 me-3"><i class="bi bi-tiktok"></i></a>
                        <a href="#" class="text-light fs-2 me-3"><i class="bi bi-instagram"></i></a>
                        <a href="#" class="text-light fs-2"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </div>
            </div>
            <hr>
            <div class="d-sm-flex justify-content-between py-1">
                <p>2025 &copy; Padelta Dev Team. All Rights Reserved. </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
</script>

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
    color : #3498db;
}

/* Estilo para el color de los iconos de redes sociales al pasar el mouse*/
.social-media i:hover {
    color: #3498db;
    transition: transform 0.3s ease, color 0.3s ease;
}
</style>