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
          <h1>Política de Garantías <br />PADELTA</h1>

          <h3>Cobertura de Garantía</h3>
          <ul>
            <li>
              Todos nuestros productos tienen garantía contra defectos de
              fabricación.
            </li>
            <li>
              La duración de la garantía varía según el producto y el fabricante
              (consultar en cada artículo).
            </li>
            <li>
              Las palas de pádel tienen garantía de 6 meses por defectos de
              fabricación.
            </li>
          </ul>

          <h3>Condiciones</h3>
          <ul>
            <li>
              La garantía no cubre daños por uso inadecuado, golpes o desgaste
              normal.
            </li>
            <li>
              Debes presentar el comprobante de compra original para hacer
              válida la garantía.
            </li>
            <li>
              El producto debe estar en su estado original, sin modificaciones.
            </li>
          </ul>

          <h3>Proceso de Reclamación</h3>
          <ul>
            <li>
              Puedes hacer la solicitud de garantía en el
              <a href="/reqWarranty" style="color: #ffc107">formulario</a> de
              nuestra página web
            </li>
            <li>
              Contacta a nuestro servicio al cliente describiendo el defecto.
            </li>
            <li>Envía fotos claras del producto y del defecto.</li>
            <li>
              Si se aprueba la garantía, te indicaremos cómo proceder con el
              envío.
            </li>
            <li>
              Evaluaremos si corresponde reparación, reemplazo o reembolso.
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
}

.primary-font {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #ffffff;
}

.secondary-font {
  font-family: Noto Sans, sans-serif;
  font-size: 0.9rem;
  text-align: right;
  color: rgba(255, 255, 255, 0.8);
}
</style>
