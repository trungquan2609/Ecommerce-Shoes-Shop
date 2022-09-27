const express = require('express');
const router = express.Router();
const ProductController = require('../../app/controllers/api/ProductController');


router.get('/sort/:brandid', ProductController.sort);

router.get('/search', ProductController.search);

router.get('/:SKU', ProductController.showQuantity);

router.get('/', ProductController.index);

module.exports = router;