const express = require('express');
const router = express.Router();
const CartController = require('../../app/controllers/api/CartController');

router.get('/', CartController.cart);

module.exports = router;