const express = require('express');
const router = express.Router();

const ContactController = require('../../app/controllers/admin/ContactController');

router.get('/:id', isLoggedIn, ContactController.confirm);

router.get('/', isLoggedIn, ContactController.index);

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