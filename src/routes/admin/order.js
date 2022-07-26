const express = require('express');
const router = express.Router();

const orderController = require('../../app/controllers/admin/orderController');

router.get('/:id', orderController.detail)

router.get('/', orderController.index);

module.exports = router;
