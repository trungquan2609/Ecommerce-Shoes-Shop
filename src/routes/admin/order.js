const express = require('express');
const router = express.Router();

const orderController = require('../../app/controllers/admin/orderController');

router.patch('/:id', isLoggedIn, orderController.update)

router.get('/:id', isLoggedIn, orderController.detail)

router.get('/', isLoggedIn, orderController.index);

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