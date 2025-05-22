<template>
  <div class="bg-image">
    <div class="overlay">
      <div
        id="mainCard"
        class="d-flex justify-content-center align-items-center content-box my-5 py-4"
      >
        <div class="form-container" style="width: 100%; max-width: 400px">
          <h2 class="text-center mb-4">Mi Perfil</h2>
          <div v-if="usuario">
            <div class="mb-3">
              <label class="form-label">Usuario:</label>
              <div class="form-value">{{ usuario.Username }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Nombre:</label>
              <div class="form-value">{{ usuario.Nombre }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Primer Apellido:</label>
              <div class="form-value">{{ usuario.Apellido1 }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Segundo Apellido:</label>
              <div class="form-value">{{ usuario.Apellido2 }}</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Correo:</label>
              <div class="form-value">{{ usuario.Correo }}</div>
            </div>
            <div class="mb-3">
              <button
                class="btn btn-outline-warning w-100 mt-2"
                @click="logout"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
          <div v-else class="text-center">
            <p>No hay datos de usuario. Por favor, inicia sesión.</p>
            <RouterLink to="/logIn" class="btn btn-primary mt-2">Iniciar Sesión</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";

const usuario = ref(null);
const router = useRouter();

onMounted(() => {
  const userStr = sessionStorage.getItem("usuario");
  if (userStr) {
    try {
      usuario.value = JSON.parse(userStr);
    } catch {
      usuario.value = null;
    }
  }
});

function logout() {
  sessionStorage.removeItem("usuario");
  window.dispatchEvent(new Event("storage"));
  router.push("/");
}
</script>

<style scoped lang="scss">
.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
}

.overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4)
  );
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content-box {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 5%;
  color: white;
  max-width: 900px;
  min-height: 430px;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: white;
}

.form-label {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}

.form-value {
  font-family: Noto Sans, sans-serif;
  font-size: 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: white;
}

button {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
}
</style>