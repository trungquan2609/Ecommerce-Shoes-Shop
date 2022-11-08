const express = require('express');
const router = express.Router();
const CartController = require('../../app/controllers/api/CartController.js');

router.get('/', CartController.cart);

module.exports = router;