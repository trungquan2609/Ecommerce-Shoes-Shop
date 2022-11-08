const express = require('express');
const router = express.Router();
const OrderController = require('../../app/controllers/api/OrderController.js');

router.get('/cancelorder', OrderController.cancelOrder)

router.get('/', OrderController.index);

module.exports = router;