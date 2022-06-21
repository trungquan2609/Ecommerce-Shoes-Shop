const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');
const userController = require('../../app/controllers/site/UserController');
var csrfProtection = csrf();
const upload = require('../../config/upload');

// router.use(csrfProtection);

router.put('/profile/changepassword', csrfProtection, userController.changePassword);

router.get('/profile', isLoggedIn, userController.profile);

router.patch('/profile', upload.single('avatar'), csrfProtection, userController.updateProfile);

router.delete('/logout', isLoggedIn, csrfProtection, userController.logout);

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/register', userController.registerSite);

router.post('/register', csrfProtection, passport.authenticate('local.register', {
    successRedirect: '/user/login',
    failureRedirect: '/user/register',
    failureFlash: true,
    session: false
}));

router.get('/login', userController.loginSite);

router.post('/login', csrfProtection, passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}