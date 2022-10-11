const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadBrand');

const brandController = require('../../app/controllers/admin/BrandController');

router.patch('/edit/:id', isLoggedIn, upload.single('brandImage'), brandController.update)

router.get('/edit/:id', isLoggedIn, brandController.edit);

router.post('/add', isLoggedIn, upload.single('brandImage'),  brandController.store);

router.get('/add', isLoggedIn, brandController.add);

router.delete('/delete/:id', isLoggedIn, brandController.delete);

router.get('/', isLoggedIn, brandController.index);

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