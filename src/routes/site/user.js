const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');
const userController = require('../../app/controllers/site/UserController');
var csrfProtection = csrf();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/public/img/userImages');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = function(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
})

// router.use(csrfProtection);

router.get('/profile', isLoggedIn, userController.profile);

router.patch('/profile', upload.single('avatar'), csrfProtection, userController.updateProfile);

router.put('/profile', csrfProtection, userController.changePassword);

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