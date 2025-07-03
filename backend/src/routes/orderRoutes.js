// En tu archivo de rutas (orderRoutes.js o similar)
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

// Rutas para tarjetas
router.get('/payment-methods/saved', auth.verifyToken, orderController.getSavedPaymentMethods);
router.post('/payment-methods/save', auth.verifyToken, orderController.savePaymentMethod);
router.delete('/payment-methods/:cardId', auth.verifyToken, orderController.deleteSavedPaymentMethod);

module.exports = router;