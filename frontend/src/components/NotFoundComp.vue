<template>
    <div class="container text-center mt-5">
        <div class="d-flex flex-column align-items-center">
            <i class="pi pi-exclamation-triangle text-warning display-1 mb-4"></i>
            <h2 class="mb-3">404 Not Found</h2>
            <p class="text-muted mb-4">
                Lo sentimos, la página que buscas no existe o fue movida.
            </p>
            <RouterLink to="/"><button class="btn btn-success mb-5">Regresar</button></RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.container {
    margin: auto;
}
</style>