const express = require('express');
const csrf = require('csurf');
const BrandSite = require('../app/models/brand_model')
const Brand = require('../app/models/brand_model');



function global(app) {
    app.use(csrf());
    app.use(async function (req, res, next) {
        var token = await req.csrfToken();
        res.cookie('XSRF_TOKEN', token);
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // your website
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
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