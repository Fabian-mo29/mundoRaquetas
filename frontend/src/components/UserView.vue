<template>
  <div class="bg-image">
    <div class="overlay">
      <div id="mainCard" class="content-box my-5 p-4">
        <div class="form-container text-white">
          <h2 class="text-center mb-4">Mi Perfil</h2>

          <div v-if="usuario">
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Usuario:</label>
                <div class="form-value">{{ usuario.Username }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Nombre:</label>
                <div class="form-value">{{ usuario.Nombre }}</div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label">Primer Apellido:</label>
                <div class="form-value">{{ usuario.Apellido1 }}</div>
              </div>
              <div class="col-md-6">
                <label class="form-label">Segundo Apellido:</label>
                <div class="form-value">{{ usuario.Apellido2 }}</div>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Correo:</label>
              <div class="form-value">{{ usuario.Correo }}</div>
            </div>

            <div class="row g-2 mt-4">
              <div class="col-md-6">
                <RouterLink
                  to="userOrders"
                  class="btn btn-primary w-100"
                  style="background-color: #2c3e50; border: none"
                >
                  Historial de Compras
                </RouterLink>
              </div>
              <div class="col-md-6">
                <RouterLink
                  to="wishlist"
                  class="btn btn-info w-100"
                  style="background-color: #3498db; border: none"
                >
                  Ver Wishlist
                </RouterLink>
              </div>
              <div class="col-md-12">
                <button
                  class="btn btn-outline-warning w-100 mt-3"
                  @click="logout"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>

          <div v-else class="text-center">
            <p>No hay datos de usuario. Por favor, inicia sesión.</p>
            <RouterLink to="/logIn" class="btn btn-primary mt-2"
              >Iniciar Sesión</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import axios from "axios";

const usuario = ref(null);
const router = useRouter();

onMounted(() => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    usuario.value = null;
    return;
  }
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    const username = payload.username;

    if (username) {
      getUserData(username, token).then((data) => {
        usuario.value = data;
      });
    }
  } catch (error) {
    usuario.value = null;
  }
});

function logout() {
  sessionStorage.removeItem("token");
  window.dispatchEvent(new CustomEvent("user-session"));
  router.push("/");
}

function getUserData(username, token) {
  return axios
    .get(`https://localhost:3000/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching users data", error);
      return null;
    });
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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 0.5rem 1rem;
  color: white;
}

button {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  padding: 10px;
}
</style>
