const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadMod');
const passport = require('passport');

const ModController = require('../../app/controllers/admin/ModController');

router.post('/add', upload.single('avatar'), passport.authenticate('local.adminRegister', {
    successRedirect: '/admin/moderator',
    failureRedirect: '/admin/moderator/add',
    failureFlash: true,
    session: false
}));

router.get('/add', ModController.add);

router.get('/', ModController.index);

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