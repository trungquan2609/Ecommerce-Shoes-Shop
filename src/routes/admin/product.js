const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadProduct');

const productController = require('../../app/controllers/admin/ProductController');

router.patch('/editproduct/:id', upload.single('productImage'), productController.update)

router.get('/editproduct/:id', productController.edit);

router.post('/addproduct', upload.single('productImage'),  productController.store);

router.get('/addproduct', productController.add);

router.delete('/:id', productController.delete);

router.get('/', productController.index);

module.exports = router;
