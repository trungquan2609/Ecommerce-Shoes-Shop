const express = require('express');
const router = express.Router();

const productController = require('../../app/controllers/site/ProductController.js');

router.get('/sort/:brandid', productController.sort);

router.get('/:SKU', productController.detail);

router.get('/', productController.index);

module.exports = router;
