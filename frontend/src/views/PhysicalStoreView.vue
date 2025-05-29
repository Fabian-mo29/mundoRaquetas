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
  <!-- Ejemplo adaptado de: https://bootstrapbrain.com/demo/components/contacts/contact-6/#! -->
  <div class="bg-image">
    <div class="overlay">
      <div class="chas py-3 py-md-5 py-xl-8">
        <div class="container">
          <div class="row justify-content-md-center">
            <div
              class="content-box col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6"
            >
              <h2 class="primary-font mb-4 display-5 text-center">
                Nuestra tienda física
              </h2>
              <p class="mb-1 text-center lead fs-4 secondary-font">
                Si te interesa ver nuestros productos en persona, te invitamos a
                visitar nuestra tienda física. Aquí podrás encontrar una amplia
                variedad de artículos relacionados con el pádel, desde palas y
                bolas hasta ropa y accesorios. Nuestro personal especializado de
                Padelta estará encantado de ayudarte a encontrar lo que
                necesitas y responder a cualquier pregunta que puedas tener.
                <br />¡Te esperamos!<br />
              </p>
            </div>
          </div>
        </div>

        <div class="container mt-3">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
              <div
                class="card border border-dark rounded shadow-sm overflow-hidden"
              >
                <div class="card-body p-0">
                  <!-- Mapa de la tienda física (es la ubicación de la ECCI) -->
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.952474398913!2d-84.05195309999999!3d9.9379125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3f14d13a1b5%3A0x6e3f67d73fdf3079!2sWWQX%2B567%2C%20San%20Jos%C3%A9%2C%20San%20Pedro!5e0!3m2!1sen!2scr!4v1748101630507!5m2!1sen!2scr"
                    width="100%"
                    height="450"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  >
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bs-brain@2.0.4/utilities/bsb-overlay/bsb-overlay.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bs-brain@2.0.4/utilities/background/background.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bs-brain@2.0.4/utilities/margin/margin.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/bs-brain@2.0.4/utilities/padding/padding.css"
    />
  </head>
</template>

<script setup></script>

<style lang="css" scoped>
/* Estilo  para el fondo*/
.bg-image {
  background-image: url("@/assets/canchaPadel.jpg");
  background-size: cover;
  background-position: center;
  height: 100%;
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
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Estilo para el cuadro del intro */
.content-box {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 5%;
  color: white;
  max-width: 900px;
}

/* Estilos para poner el color de los contenedores y botón */
.contact-card-color {
  background-color: #2c3e50;
}
.form-card-color {
  background-color: #3498db;
}
.button-color {
  background-color: #2c3e50;
}

/* Estilos para las letras */
.primary-font {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #ffffff;
}
.secondary-font {
  font-family: Noto Sans, sans-serif;
  color: #ffffff;
}
p {
  font-weight: bold;
}
</style>
