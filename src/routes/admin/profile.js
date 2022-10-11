const express = require('express');
const router = express.Router();
const passport = require('passport');
// const csrf = require('csurf');
const ProfileController = require('../../app/controllers/admin/ProfileController');
// var csrfProtection = csrf();
const upload = require('../../config/upload');

router.get('/', isLoggedIn, ProfileController.profile)

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