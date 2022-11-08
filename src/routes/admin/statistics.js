const express = require('express');
const router = express.Router();
const passport = require('passport');
// const csrf = require('csurf');
const StatisticsController = require('../../app/controllers/admin/StatisticsController.js');
// var csrfProtection = csrf();

router.get('/', isLoggedIn, StatisticsController.index)

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}