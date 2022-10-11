const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/admin/UserController');

router.get('/', isLoggedIn, userController.index);

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