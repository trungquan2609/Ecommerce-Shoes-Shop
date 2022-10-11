const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadProduct');

const productController = require('../../app/controllers/admin/ProductController');

router.patch('/editproductall/:SKU', isLoggedIn, upload.single('productImage'), productController.updateAll)

router.get('/editproductall/:SKU', isLoggedIn, productController.editAll)

router.patch('/editproduct/:id', isLoggedIn, upload.single('productImage'), productController.update)

router.get('/editproduct/:id', isLoggedIn, productController.edit);

router.post('/addproduct', isLoggedIn, upload.single('productImage'),  productController.store);

router.get('/addproduct', isLoggedIn, productController.add);

router.delete('/deleteall/:SKU', isLoggedIn, productController.deleteAll);

router.delete('/:id', isLoggedIn, productController.delete);

router.get('/', isLoggedIn, productController.index);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');
}
