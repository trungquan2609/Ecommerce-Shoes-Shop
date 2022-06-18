const express = require('express');
const passport = require('passport');
const csrf = require('csurf');



function global(app) {
    app.use(csrf());
    app.use(function (req, res, next) {
        var token = req.csrfToken();
        res.cookie('XSRF_TOKEN', token);
        res.locals.csrfToken = token;
        res.locals.login = req.isAuthenticated();
        res.locals.session = req.session;
        res.locals.user = req.user;
        console.log(req.user);
        next();
    })
}

module.exports = global ;