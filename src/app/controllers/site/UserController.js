const User = require('../../models/user_model');
const multer = require('multer');
const bcrypt = require('bcrypt');

class UserController {

    // Get /user/register
    registerSite(req, res, next) {
        var messages = req.flash('error');
        res.render('site/user/register', {
            title: 'Đăng ký tài khoản',
            styles: ['login'],
            scripts: ['validator','registration'],
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
            messages: messages,
            hasErrors: messages.length > 0,
        });
    }

    // Get /user/profile
    profile(req, res, next) {
        var messages = req.flash('error');
        res.render('site/user/profile', {
            title: 'Thông tin tài khoản',
            styles: ['login', 'account'],
            scripts: ['account'],
            layout: 'layout_site.hbs',
            messages: messages,
        });
    }

    // Get /user/logout
    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/')
        });
    }

    // PATCH /user/profile
    updateProfile(req, res, next) {
        var avatar = '';
        if (req.file) {
            avatar = req.file.path.slice(10);
        }
        const updateUserProfile = {
            fullname: req.body.fullname,
            address: req.body.address,
            phone: req.body.phone,
            avatar: avatar,
        }
        User.updateOne( { _id: req.user._id }, updateUserProfile)
            .then(() => res.redirect('/user/profile'))
            .catch(next);
        // User.updateOne({ _id: req.user._id }, req.body)
        //     .then(() => res.redirect('/user/profile'))
        //     .catch(next);
    }

    // PUT /user/profile
    changePassword(req, res, next) {
        res.redirect('/profile');
    }

    login(req, res, next) {
        if (req.session.oldUrl) {
            const oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl)
        } else {
            res.redirect('/user/profile')
        }
    }

    register(req, res, next) {

    }
}

module.exports = new UserController;
