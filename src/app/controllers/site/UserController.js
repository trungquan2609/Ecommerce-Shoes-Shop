const app = require("express");
const User = require('../../models/user_model');
const passport = require('passport');
var csrf = require('csurf');
var csrfProtection = csrf();

class UserController {

    // Get /user/register
    registerSite(req, res, next) {
        var messages = req.flash('error');
        res.render('site/user/register', {
            title: 'Đăng ký tài khoản',
            styles: ['login'],
            scripts: ['registration'],
            layout: 'layout_site.hbs',
            // csrfToken: req.csrfToken(),
            messages: messages,
            hasErrors: messages.length > 0,
        });
    }

    // Get /user/login
    loginSite(req, res, next) {
        var messages = req.flash('error');
        res.render('site/user/login', {
            title: 'Đăng nhập',
            styles: ['login'],
            scripts: ['login'],
            layout: 'layout_site.hbs',
            // csrfToken: req.csrfToken(),
            messages: messages,
            hasErrors: messages.length > 0,
        });
    }

    // Get /user/profile
    profile(req, res, next) {
        res.render('site/user/profile', {
            title: 'Thông tin tài khoản',
            styles: ['login', 'account'],
            scripts: ['account'],
            layout: 'layout_site.hbs',
        });
    }

    // Get /user/logout
    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/')
        });
    }

    // Put /user/updateprofile
    updateProfile(req, res, next) {
        console.log(req.user._id)
        User.updateOne({ _id: req.user._id }, req.body)
            .then(() => res.redirect('site/user/profile'))
            .catch(next);
    }
}

module.exports = new UserController;
