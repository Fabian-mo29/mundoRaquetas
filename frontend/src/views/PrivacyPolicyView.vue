<template>
  <!-- Se exportan las fonts -->
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
    rel="stylesheet"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <section>
    <div class="bg-image">
      <div class="overlay">
        <div
          class="justify-content-center align-items-center content-box my-5 py-4 primary-font"
        >
          <h1>Política de Privacidad <br />PADELTA</h1>

          <h3>1. Recopilación de información</h3>
          <ul>
            <li>
              Recopilamos datos personales necesarios para procesar tus compras:
              nombre, dirección, email y datos de pago.
            </li>
            <li>
              Usamos cookies para mejorar tu experiencia en nuestro sitio web.
            </li>
          </ul>

          <h3>2. Uso de tus datos</h3>
          <ul>
            <li>
              Tus datos se utilizan exclusivamente para:
              <ul>
                <li>Procesar pedidos y envíos</li>
                <li>Comunicaciones relacionadas con tu compra</li>
                <li>Mejorar nuestros servicios (anónimamente)</li>
              </ul>
            </li>
            <li>
              No compartimos tu información con terceros sin tu consentimiento,
              excepto proveedores esenciales (transporte, pagos).
            </li>
          </ul>

          <h3>3. Protección de datos</h3>
          <ul>
            <li>
              Implementamos medidas de seguridad para proteger tu información.
            </li>
            <li>Los pagos se procesan a través de plataformas seguras.</li>
          </ul>

          <h3>4. Tus derechos</h3>
          <ul>
            <li>Puedes visualizar, modificar o eliminar tus datos.</li>
            <li>
              Puedes oponerte al procesamiento de tus datos para marketing.
            </li>
            <li>
              Para ejercer estos derechos, contáctanos en
              PadeltaConsultas@gmail.com
            </li>
          </ul>

          <h3>5. Cambios en la política</h3>
          <ul>
            <li>
              Nos reservamos el derecho de actualizar esta política. Las
              modificaciones se publicarán en esta página.
            </li>
          </ul>

          <p class="mt-4 secondary-font">
            Última actualización: 29 de mayo de 2025
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 0;
  min-height: 100vh;
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
  padding: 2rem 0;
}

.content-box {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 5%;
  color: white;
  max-width: 800px;
  margin: 2rem auto;
}

h1 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

h3 {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: white;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

ul {
  font-family: Noto Sans, sans-serif;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  ul {
    margin-top: 0.5rem;
    padding-left: 1.5rem;
  }
}

.primary-font {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #ffffff;
}

li {
  font-family: Noto Sans, sans-serif;
  color: #ffffff;
}

p {
  font-family: Noto Sans, sans-serif;
  font-size: 0.9rem;
  text-align: right;
  color: rgba(255, 255, 255, 0.8);
}

a {
  color: #4fc3f7;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
