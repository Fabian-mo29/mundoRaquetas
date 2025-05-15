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
  <!-- Ejemplo obtenido de: https://bootstrapbrain.com/demo/components/contacts/contact-6/#! -->
  <section class="chas py-3 py-md-5 py-xl-8 bg-image">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div
            class="card border border-dark rounded shadow-sm overflow-hidden"
          >
            <div class="card-body p-0">
              <div class="row gy-3 gy-md-4 gy-lg-0">
                <!-- Información sobre garantía -->
                <div
                  class="col-12 col-lg-6 bsb-overlay background-position-center background-size-cover"
                  style="
                    --bsb-overlay-opacity: 0.7;
                    background-color: transparent;
                  "
                >
                  <div
                    class="warrantyInfo-card-color row align-items-lg-center justify-content-center h-100"
                  >
                    <div class="col-11 col-xl-10">
                      <div class="contact-info-wrapper py-4 py-xl-5">
                        <h2 class="primary-font h1 mb-3 text-light">
                          Solicitud de garantía
                        </h2>
                        <p
                          class="secondary-font lead fs-4 text-light opacity-75 mb-4 mb-xxl-5"
                        >
                          Para nosotros es importante que estés satisfecho con
                          tu compra. Si tienes algún problema con algún
                          producto, no dudes en llenar este formulario para
                          llevar a cabo el proceso de garantía.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Formulario para solicitar garantía -->
                <div class="form-card-color col-12 col-lg-6">
                  <div class="row align-items-lg-center h-100">
                    <div class="col-12">
                      <form action="#!">
                        <div class="row gy-4 gy-xl-5 p-4 p-xl-5">
                          <div class="col-12">
                            <label
                              for="productName"
                              class="form-label secondary-font"
                              >Nombre del producto
                              <span class="text-danger">*</span></label
                            >
                            <input
                              type="text"
                              class="form-control"
                              id="productName"
                              name="productName"
                              value=""
                              required
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <label
                              for="purchaseDate"
                              class="form-label secondary-font"
                              >Fecha de compra
                              <span class="text-danger">*</span></label
                            >
                            <div class="input-group">
                              <input
                                type="date"
                                class="form-control"
                                id="purchaseDate"
                                name="purchaseDate"
                                value=""
                                required
                              />
                            </div>
                          </div>
                          <div class="col-12 col-md-6">
                            <label
                              for="receiptID"
                              class="form-label secondary-font"
                              >Número de recibo</label
                            >
                            <div class="input-group">
                              <input
                                type="number"
                                class="form-control"
                                id="receiptID"
                                name="receiptID"
                                value=""
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <label
                              for="productImageDefect"
                              class="form-label secondary-font"
                              >Imagen del producto defectuoso
                              <span class="text-danger">*</span></label
                            >
                            <input
                              type="file"
                              accept="image/*"
                              class="form-control"
                              id="productImageDefect"
                              name="productImageDefect"
                              value=""
                              required
                            />
                          </div>
                          <div class="col-12">
                            <label
                              for="problemDescription"
                              class="form-label secondary-font"
                              >Descripción del problema
                              <span class="text-danger">*</span></label
                            >
                            <textarea
                              class="form-control"
                              id="problemDescription"
                              name="problemDescription"
                              rows="3"
                              required
                            ></textarea>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <!-- Se puede hacer que una vez hecho un mensaje, este pueda ser enviado automáticamente al correo. -->
                              <button
                                class="button-color secondary-font btn btn-primary btn-lg"
                                type="reset"
                              >
                                Enviar mensaje
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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

/* Estilos para poner el color de los contenedores y botón */
.warrantyInfo-card-color {
  background-color: #3498db;
}
.form-card-color {
  background-color: #2c3e50;
}
.button-color {
  background-color: #3498db;
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
