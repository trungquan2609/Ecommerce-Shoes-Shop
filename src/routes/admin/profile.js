const express = require('express');
const router = express.Router();
const passport = require('passport');
// const csrf = require('csurf');
const ProfileController = require('../../app/controllers/admin/ProfileController');
// var csrfProtection = csrf();
const upload = require('../../config/upload');

// router.use(csrfProtection);

// router.put('/profile/changepassword', ProfileController.changePassword);

// router.get('/profile', isLoggedIn, ProfileController.profile);

// router.patch('/profile', upload.single('avatar'), ProfileController.updateProfile);

// router.delete('/logout', isLoggedIn, ProfileController.logout);

// router.use('/', notLoggedIn, function (req, res, next) {
//     next();
// });

// router.get('/register', ProfileController.registerSite);

// router.post('/register', passport.authenticate('local.register', {
//     successRedirect: '/user/login',
//     failureRedirect: '/user/register',
//     failureFlash: true,
//     session: false
// }));

router.get('/login', ProfileController.login);

router.post('/login', passport.authenticate('admin.signup', {
    failureRedirect: '/admin/login',
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