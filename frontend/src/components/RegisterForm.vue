<template>
    <div id="mainCard" class="d-flex justify-content-center align-items-center min-vh-100">
        <form @submit.prevent="logIn" class="border p-4 rounded shadow-sm" style="width: 100%; max-width: 400px;">
            <h3 class="text-center mb-4">Register</h3>
            
            <div class="mb-3">
                <label class="form-label" for="inputNombre">Nombre</label>
                <input class="form-control" type="Nombre" id="inputNombre" required placeholder="Pedro">
            </div>
            
            <div class="mb-3">
                <label class="form-label" for="inputApellido">Apellido</label>
                <input class="form-control" type="Apellido" id="inputApellido" required placeholder="Lopez">
            </div>

            <div class="mb-3">
                <label class="form-label" for="inputEmail">Email</label>
                <input class="form-control" type="email" id="inputEmail" required placeholder="correo@email.com">
            </div>

            <div class="mb-3">
                <label class="form-label" for="inputPassword">Password</label>
                <input class="form-control" type="password" id="inputPassword" required placeholder="password">
            </div>

            <div class="mb-4 form-check">
                <input class="form-check-input" type="checkbox" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember Me</label>
            </div>

            

            <div class="d-flex justify-content-between">
                <p class="mb-4">If you already have an account <RouterLink to="logIn" class="text-primary">Log In</RouterLink></p>
            </div>
            <button type="submit" class="btn btn-success" style="width: 100%;" >Register</button>
        </form>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';

    const datosSesion = { correo : "", password: ""};

    function logIn() {
        alert(`${datosSesion.correo}`);
    }

</script>

<style lang="scss" scoped>
</style>
