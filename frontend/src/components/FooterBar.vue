<template>
    <!-- Código inspirado en el tutorial de "Coding Yaar" en YouTube -->
    <!-- Video: https://www.youtube.com/watch?v=YFJ4IVicc_s -->
    <footer class="custom-footer text-light pt-5">
        <div class="container px-5">
            <div class="row">
                <div class="col">
                    <h3>Políticas</h3>
                    <ul class="list-unstyled pt-2">
                        <li class="py-1">Términos y condiciones</li>
                        <li class="py-1">Reembolso</li>
                        <li class="py-1">Privacidad</li>
                        <li class="py-1">Cookies</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Ayuda</h3>
                    <ul class="list-unstyled pt-2">
                        <li class="py-1">Solicitar garantía</li>
                        <li class="py-1">Seguir orden</li>
                        <li class="py-1">Contáctanos</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Nosotros</h3>
                    <ul class="list-unstyled pt-2">
                        <li class="py-1">Tiendas físicas</li>
                        <li class="py-1">Blog</li>
                    </ul>
                </div>
                <div class="col">
                    <h3>Recursos</h3>
                    <ul class="list-unstyled pt-2">
                        <li class="py-1">Guía para comprar</li>
                        <li class="py-1">Garantías</li>
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
</style>