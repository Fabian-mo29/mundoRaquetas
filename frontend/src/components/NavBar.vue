<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <router-link class="nav-link" :to="'/category/men'">Hombres</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" :to="'/category/women'">Mujeres</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" :to="'/category/kids'">Niños</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" :to="'/category/accessories'">Accesorios</router-link>
            </li>
            <li class="nav-item">
            <router-link class="nav-link" :to="'/category/ofertas'">Ofertas</router-link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
</div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
  