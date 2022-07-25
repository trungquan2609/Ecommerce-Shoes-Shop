const express = require('express');
const passport = require('passport');
const csrf = require('csurf');
const BrandSite = require('../app/models/brand_model')
const Brand = require('../app/models/brand_model');



function global(app) {
    app.use(csrf());
    app.use(async function (req, res, next) {
        var token = await req.csrfToken();
        res.cookie('XSRF_TOKEN', token);
        res.locals.brandName = await Brand.find();
        res.locals.csrfToken = token;
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.user = req.user;
        // console.log(brandName);
        next();
    })
}

module.exports = global ;