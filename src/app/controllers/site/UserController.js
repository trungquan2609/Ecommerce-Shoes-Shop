const app = require("express");
const users = require('../../models/user_model');
const passport = require('passport');

class UserController {

    // Get /account/register
    registerSite(req, res, next) {
        var messages = req.flash('error');
        res.render('site/account/register', {
            title: 'Đăng ký tài khoản',
            styles: ['login'],
            scripts: ['validator', 'registration'],
            layout: 'layout_site.hbs',
            messages: messages,
            haseErrors: messages.length > 0
        });
    }

    // Get /account/login
    loginSite(req, res, next) {
        var messages = req.flash('error');
        res.render('site/account/login', {
            title: 'Đăng nhập',
            styles: ['login'],
            scripts: ['validator', 'login'],
            layout: 'layout_site.hbs',
            messages: messages,
            haseErrors: messages.length > 0
        });
    }

    // Post /account/register
    register(req, res, next) {
        passport.authenticate('local.register', {
            successRedirect: '/site/account/login',
            failureRedirect: '/site/account/register',
            failureFlash: true
        });
    }
}

module.exports = new UserController;
