const express = require('express');
const router = express.Router();

const productController = require('../../app/controllers/site/ProductController');

router.get('/:SKU', productController.detail);

router.get('/', productController.index);

module.exports = router;
