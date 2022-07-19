const express = require('express');
const router = express.Router();

const productController = require('../../app/controllers/admin/ProductController');


router.post('/addproduct', productController.store);

router.get('/addproduct', productController.add);

router.delete('/:id', productController.delete);

router.get('/', productController.index);

module.exports = router;
