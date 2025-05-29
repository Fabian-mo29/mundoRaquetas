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
          <h1>Guía para Comprar <br />en PADELTA</h1>

          <h3>Inicio de sesión o registro</h3>
          <ul>
            <li>
              Para realizar compras en PADELTA, puedes iniciar sesión con tu
              cuenta existente o registrarte como nuevo usuario.
            </li>
          </ul>

          <h3>Selección de productos</h3>
          <ul>
            <li>
              Navega por nuestras categorías principales:
              <ul>
                <li>Palas de pádel</li>
                <li>Pelotas</li>
                <li>Accesorios</li>
                <li>Ropa y calzado</li>
                <li>Ofertas</li>
              </ul>
            </li>
            <li>
              Haz clic en cualquier producto para ver sus detalles completos.
            </li>
          </ul>

          <h3>Agregar productos al carrito</h3>
          <ul>
            <li>
              Una vez que hayas encontrado el producto deseado:
              <ul>
                <li>Puedes hacer clic en "Añadir al carrito"</li>
              </ul>
            </li>
            <li>
              Puedes seguir navegando y añadiendo más productos o ir
              directamente a finalizar tu compra.
            </li>
          </ul>

          <h3>Gestión del carrito de compras</h3>
          <ul>
            <li>
              En el carrito puedes:
              <ul>
                <li>Eliminar los items que no deseas</li>
                <li>Proceder a finalizar la compra</li>
              </ul>
            </li>
            <li>
              En la sección derecha verás el resumen detallado del costo total
              de tu compra, incluyendo gastos de envío.
            </li>
          </ul>

          <h3>Proceso de pago</h3>
          <ul>
            <li>
              Debes seleccionar tu método de pago:
              <ul>
                <li>Tarjeta de crédito/débito (procesamiento seguro)</li>
              </ul>
            </li>
            <li>
              Completa los datos de envío verificando que la dirección sea
              correcta.
            </li>
            <li>
              Revisa cuidadosamente el resumen final antes de confirmar tu
              compra.
            </li>
            <li>
              Recibirás un correo electrónico de confirmación con los detalles
              de tu pedido.
            </li>
          </ul>

          <h3>Seguimiento de tu pedido</h3>
          <ul>
            <li>
              Puedes ver el estado de tus pedidos en la sección "Ordenes".
            </li>
            <li>
              Recibirás actualizaciones por email sobre el estado de tu envío.
            </li>
            <li>
              Para cualquier consulta sobre tu pedido, contáctanos a través de
              nuestro
              <a href="/contacto" style="color: #ffc107"
                >formulario de contacto</a
              >.
            </li>
          </ul>

          <div class="contact-info">
            <h3>¿Necesitas ayuda con tu compra?</h3>
            <p>Estamos disponibles para ayudarte:</p>
            <ul>
              <li>Email: PadeltaConsultas@gmail.com</li>
              <li>Teléfono: (506) 2511-8000</li>
              <li>Horario de atención: Lunes a Viernes de 9:00 am a 5:00 pm</li>
            </ul>
          </div>

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

h4 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
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

.contact-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
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

a {
  color: #4fc3f7;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
