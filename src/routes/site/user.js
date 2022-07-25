const express = require('express');
const router = express.Router();
const passport = require('passport');
// const csrf = require('csurf');
const userController = require('../../app/controllers/site/UserController');
// var csrfProtection = csrf();
const upload = require('../../config/upload');

// router.use(csrfProtection);

router.put('/profile/changepassword', userController.changePassword);

router.get('/profile', isLoggedIn, userController.profile);

router.patch('/profile', upload.single('avatar'), userController.updateProfile);

router.delete('/logout', isLoggedIn, userController.logout);

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/register', userController.registerSite);

router.post('/register', passport.authenticate('local.register', {
    successRedirect: '/user/login',
    failureRedirect: '/user/register',
    failureFlash: true,
    session: false
}));

router.get('/login', userController.loginSite);

router.post('/login', passport.authenticate('local.login', {
    failureRedirect: '/user/login',
    failureFlash: true
}), userController.login);

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