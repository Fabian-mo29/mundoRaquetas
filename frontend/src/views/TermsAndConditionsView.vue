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
          <h1>Términos y Condiciones <br />PADELTA</h1>

          <h3>Información general</h3>
          <ul>
            <li>
              Bienvenido/a a PADELTA, tienda online especializada en la venta de
              artículos de pádel. Al realizar una compra en nuestro sitio web,
              aceptas los siguientes términos y condiciones.
            </li>
            <li>
              Los presentes términos regulan la relación entre PADELTA y los
              usuarios/clientes de nuestra plataforma de ecommerce.
            </li>
          </ul>

          <h3>1. Productos</h3>
          <ul>
            <li>
              Todos los productos de pádel (palas, pelotas, accesorios, y ropa)
              mostrados en nuestro catálogo están sujetos a disponibilidad.
            </li>
            <li>
              Nos reservamos el derecho de modificar precios y especificaciones
              sin previo aviso.
            </li>
            <li>
              Las imágenes de los productos son ilustrativas y pueden no
              coincidir exactamente con el producto físico.
            </li>
            <li>
              Las características técnicas de los productos se basan en
              información proporcionada por los fabricantes.
            </li>
          </ul>

          <h3>2. Proceso de compra</h3>
          <ul>
            <li>
              Para realizar una compra, debes añadir los productos deseados al
              carrito y completar el proceso de pago.
            </li>
            <li>
              Asegúrate de proporcionar información precisa para evitar
              problemas en la entrega.
            </li>
            <li>
              El proceso de compra consta de:
              <ul>
                <li>Selección de productos</li>
                <li>Verificación del carrito</li>
                <li>Introducción de datos personales y de envío</li>
                <li>Selección de método de pago</li>
                <li>Confirmación del pedido</li>
              </ul>
            </li>
            <li>
              Recibirás un email de confirmación una vez completado el pedido.
            </li>
            <li>
              Si deseas revisar tus pedidos anteriores, puedes hacerlo en la
              sección de
              <a href="/trackOrder" style="color: #ffc107"
                >Seguimiento de órdenes</a
              >
            </li>
          </ul>

          <h3>3. Precios y pagos</h3>
          <ul>
            <li>
              Los precios de los productos se indican en colones costarricenses
              e incluyen IVA.
            </li>
            <li>
              Los gastos de envío se calcularán al finalizar la compra y se
              mostrarán antes de confirmar el pedido.
            </li>
            <li>
              Métodos de pago aceptados:
              <ul>
                <li>Tarjeta de crédito/débito</li>
                <li>PayPal</li>
                <li>Transferencia bancaria</li>
              </ul>
            </li>
            <li>
              Los pedidos no se procesarán hasta que el pago haya sido
              confirmado.
            </li>
          </ul>

          <h3>4. Envíos y entregas</h3>
          <ul>
            <li>
              Plazo de entrega estimado: 1-3 días laborables para el Gran Área
              Metropolitana y de 5-7 días laborables para el resto del país.
            </li>
            <li>
              Para envíos internacionales, el plazo puede variar entre 5-15 días
              laborables.
            </li>
            <li>
              Los gastos de envío varían según el destino y el peso del paquete.
            </li>
            <li>
              En el momento de la entrega, el cliente debe verificar el estado
              del paquete antes de firmar el recibo.
            </li>
          </ul>

          <h3>5. Reembolsos y garantías</h3>
          <ul>
            <li>
              Para información más detallada sobre reembolsos, consulta nuestra
              <a href="/refunds" style="color: #ffc107"
                >Política de Devoluciones</a
              >.
            </li>
            <li>
              Derecho de desistimiento: 14 días naturales desde la recepción del
              producto.
            </li>
            <li>
              Los productos deben devolverse en su embalaje original y en
              perfecto estado.
            </li>
            <li>
              Los gastos de devolución corren por cuenta del cliente, excepto en
              caso de error por parte de PADELTA.
            </li>
            <li>
              Las palas de pádel tienen garantía del fabricante contra defectos
              de fabricación.
            </li>
          </ul>

          <h3>6. Privacidad y protección de datos</h3>
          <ul>
            <li>
              Todos los datos personales se tratarán conforme a nuestra
              <a href="/privacyPolicy" style="color: #ffc107"
                >Política de Privacidad.</a
              >
            </li>
            <li>
              Los datos proporcionados solo se utilizarán para procesar el
              pedido y mejorar nuestra servicio.
            </li>
            <li>
              Puedes ejercer tus derechos ARCO (Acceso, Rectificación,
              Cancelación y Oposición) contactando con nosotros.
            </li>
          </ul>

          <h3>7. Contacto</h3>
          <ul>
            <li>
              Para cualquier consulta sobre estos términos o sobre tu pedido,
              puedes visitar nuestro apartado de
              <a href="/contactUs" style="color: #ffc107">Contacto</a><br />
              De igual manera, puedes contactarnos a través de los siguientes
              medios:
              <ul>
                <li>Email: PadeltaConsultas@gmail.com</li>
                <li>Teléfono: (506) 2511-8000.</li>
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
/* Estilos para las letras */
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
</style>
