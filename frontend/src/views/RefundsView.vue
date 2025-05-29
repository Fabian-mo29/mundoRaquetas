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
          <h1>Política de Reembolsos <br />PADELTA</h1>

          <h3>Información general</h3>
          <ul>
            <li>
              En PADELTA nos esforzamos por ofrecer productos de calidad y un
              servicio excepcional. Sin embargo, entendemos que en ocasiones
              pueden ser necesarios reembolsos.
            </li>
            <li>
              Esta política detalla los procedimientos y condiciones para
              solicitar reembolsos en nuestra tienda online de artículos de
              pádel.
            </li>
          </ul>

          <h3>1. Condiciones para reembolsos</h3>
          <ul>
            <li>
              Los reembolsos están disponibles para productos comprados
              directamente en nuestro sitio web.
            </li>
            <li>
              El producto debe estar en su estado original, sin usar y con todos
              los accesorios y embalajes incluidos.
            </li>
            <li>
              Debes presentar el comprobante de compra original (factura o
              correo de confirmación).
            </li>
            <li>
              Los productos personalizados no son elegibles para reembolso.
            </li>
          </ul>

          <h3>2. Plazos para solicitar reembolsos</h3>
          <ul>
            <li>
              Tienes 14 días naturales desde la recepción del producto para
              solicitar un reembolso.
            </li>
            <li>
              Para productos defectuosos o incorrectos, este plazo se extiende a
              30 días naturales.
            </li>
            <li>
              Los reembolsos por garantía del fabricante siguen los plazos
              establecidos por cada marca.
            </li>
          </ul>

          <h3>3. Proceso de reembolso</h3>
          <ul>
            <li>
              Para iniciar un reembolso:
              <ul>
                <li>
                  Contacta a nuestro servicio al cliente a través del
                  <a href="/contactUs" style="color: #ffc107"
                    >formulario de contacto</a
                  >
                  o al email PadeltaConsultas@gmail.com
                </li>
                <li>Proporciona tu número de pedido y detalles del producto</li>
                <li>Describe el motivo del reembolso</li>
                <li>Adjunta fotos del producto si es necesario</li>
              </ul>
            </li>
            <li>
              Una vez aprobado el reembolso, recibirás instrucciones para
              devolver el producto.
            </li>
            <li>
              El reembolso se procesará dentro de los 5-7 días hábiles
              posteriores a la recepción y verificación del producto devuelto.
            </li>
          </ul>

          <h3>4. Métodos de reembolso</h3>
          <ul>
            <li>
              El reembolso se realizará mediante el mismo método de pago
              utilizado en la compra original.
            </li>
            <li>
              Para pagos con tarjeta: el reembolso se reflejará en tu cuenta en
              un plazo de 3-5 días hábiles después de procesado.
            </li>
            <li>
              Para transferencias bancarias: necesitaremos los datos de tu
              cuenta bancaria para realizar el reembolso.
            </li>
            <li>
              Los gastos de envío originales no son reembolsables, excepto en
              casos de error por parte de PADELTA.
            </li>
          </ul>

          <h3>5. Excepciones y casos especiales</h3>
          <ul>
            <li>
              <strong style="color: #ffc107">Productos defectuosos:</strong>
              Cubiertos por la garantía del fabricante. Podemos ofrecer
              reemplazo o reembolso completo.
            </li>
            <li>
              <strong style="color: #ffc107">Productos incorrectos:</strong>
              Reembolso completo incluyendo gastos de envío de devolución.
            </li>
            <li>
              <strong style="color: #ffc107"
                >Daños durante el transporte:</strong
              >
              Debes notificarlo dentro de las 48 horas posteriores a la
              recepción.
            </li>
            <li>
              <strong style="color: #ffc107">Palas de pádel usadas:</strong> No
              son elegibles para reembolso a menos que presenten defectos de
              fabricación.
            </li>
          </ul>

          <h3>6. Preguntas frecuentes</h3>
          <ul>
            <li>
              <strong style="color: #ffc107"
                >¿Cuánto tarda en llegar mi reembolso?</strong
              ><br />
              Depende del método de pago, pero generalmente entre 3-10 días
              hábiles después de aprobado.
            </li>
            <li>
              <strong style="color: #ffc107"
                >¿Puedo cambiar un producto en lugar de recibir
                reembolso?</strong
              ><br />
              Sí, ofrecemos la opción de cambio por otro producto de igual o
              mayor valor.
            </li>
            <li>
              <strong style="color: #ffc107"
                >¿Qué hago si recibí un producto equivocado?</strong
              ><br />
              Contáctanos inmediatamente para coordinar el reemplazo o
              reembolso.
            </li>
          </ul>

          <h3>7. Contacto</h3>
          <ul>
            <li>
              Para cualquier consulta sobre nuestra política de reembolsos,
              visita nuestro apartado de
              <a href="/contactUs" style="color: #ffc107">Contacto</a><br />
              O contáctanos directamente:
              <ul>
                <li>Email: PadeltaConsultas@gmail.com</li>
                <li>Teléfono: (506) 2511-8000</li>
                <li>
                  Horario de atención: Lunes a Viernes de 9:00 am a 5:00 pm
                </li>
              </ul>
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
  max-width: 900px;
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

strong {
  font-weight: 600;
  color: #4fc3f7;
}
</style>
