const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../../app/controllers/admin/AdminController');

router.delete('/logout', isLoggedIn, adminController.logout);

router.get('/login', notLoggedIn, adminController.login);

router.post('/login', passport.authenticate('local.adminLogin', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true,
}));

router.get('/', isLoggedIn, adminController.index);

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