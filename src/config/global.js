const express = require('express');
const passport = require('passport');
const csrf = require('csurf');
const BrandSite = require('../app/models/brand_model')


function global(app) {
    app.use(csrf());
    app.use(function (req, res, next) {
        var token = req.csrfToken();
        res.cookie('XSRF_TOKEN', token);
        res.locals.csrfToken = token;
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.user = req.user;
        // console.log(BrandSite);
        next();
    })
}

module.exports = global ;