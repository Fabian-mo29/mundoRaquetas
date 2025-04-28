<template>
    <!-- Código inspirado en ejemplo de "bootstrapexamples.com" -->
    <!-- Fuente: https://bootstrapexamples.com/@valeria/bootstrap-5-shopping-cart-design -->
    <div class="container mt-5">
        <div class="row">
            <!-- Productos del Shopping Cart -->
            <div class="col-lg-8">
                <h3 class="mb-5">Tu carrito de compras</h3>

                <!-- Producto 1 del carrito -->
                <div class="cart-item d-flex justify-content-between">
                    <div class="d-flex">
                        <img src="imagesProducts/palaPadel.jpg" alt="Product" class="product-img me-3">
                        <div>
                            <h5>Head Graphene 360+ Alpha Pro</h5>
                            <p class="text-muted">Raqueta profesional de pádel con tecnología Graphene 360+ que maximiza la estabilidad y la potencia en cada golpe.</p>
                            <input type="number" class="form-control fixed-input" value="1">
                        </div>
                    </div>
                    <div class="item-price-btn d-flex flex-column justify-content-between">
                        <span>$219.99</span>
                        <button class="btn btn-sm btn-danger">Eliminar</button>
                    </div>
                </div>

                <!-- Producto 2 del carrito -->
                <div class="cart-item d-flex justify-content-between">
                    <div class="d-flex">
                        <img src="imagesProducts/pelotasPadel.jpg" alt="Product" class="product-img me-3">
                        <div>
                            <h5>Head Padel Pro S</h5>
                            <p class="text-muted">Pelotas de pádel de alta calidad, ideales para competiciones. Su durabilidad y rendimiento superior las hacen perfectas para cualquier nivel.</p>
                            <input type="number" class="form-control fixed-input" value="1">
                        </div>
                    </div>
                    <div class="item-price-btn d-flex flex-column justify-content-between">
                        <span>$4.99</span>
                        <button class="btn btn-sm btn-danger">Eliminar</button>
                    </div>
                </div>
            </div>

            <!-- Resumen del carrito -->
            <div class="col-lg-4">
                <div class="cart-summary">
                    <h4>Productos del carrito</h4>
                    <ul class="list-unstyled">
                        <li class="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span>$224.98</span>
                        </li>
                        <li class="d-flex justify-content-between">
                            <span>Costos de envío:</span>
                            <span>$5.00</span>
                        </li>
                        <li class="d-flex justify-content-between">
                            <span class="total-price">Total:</span>
                            <span class="total-price">$229.98</span>
                        </li>
                    </ul>
                    <button class="btn btn-success w-100">Realizar compra</button>
                </div>
            </div>
        </div>
        <RouterLink to="/"><button class="btn btn-success mt-1 mb-4">Regresar</button></RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
// Estilo para los items del carrito
.cart-item {
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

// Estilo para el cálculo de precios del carrito
.cart-summary {
    border: 1px solid #e0e0e0;
    margin-top: 80px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

// Estilo para el tamaño de las textos para el precio total y subtotal
.cart-summary .total-price {
    font-size: 1.5rem;
    font-weight: bold;
}

// Estilo para tener un ancho fijo para el cuadro de cantidad de productos
.fixed-input {
    width: 60px;
}

// Estilo para la imagen del item del carrito
.product-img {
    max-width: 150px;
    height: auto;
    object-fit: cover;
}

// Estilo para el botón de eliminar producto y el precio
.item-price-btn {
    align-items: center;
}

// Estilos para cuando se reduzca la pantalla
@media (max-width: 768px) {
    .cart-summary {
        margin-top: auto;
        margin-bottom: 20px;
    }

    .cart-item {
        flex-direction: column;
        align-items: center;
    }

    .item-price-btn {
        margin-top: 20px;
        gap: 10px;
    }

}

h3 {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
}

h4 {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
}

h5 {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
}

p {
    font-family: Noto Sans, sans-serif;
    font-weight: normal;
    font-size: 1rem;
}

span {
    font-family: Noto Sans, sans-serif;
    font-weight: normal;
    font-size: 1rem;
}

button {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
}
</style>