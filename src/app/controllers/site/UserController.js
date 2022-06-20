const app = require("express");
const User = require('../../models/user_model');
const multer = require('multer');
const bcrypt = require('bcrypt-nodejs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './img/userImages');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
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
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

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
    changePassword(req, res1, next) {
        let session = req.user;
        if (session.email) {
            var oldPassword = req.body.oldPassword;
            var newPassword = req.body.newPassword;
            var confirmPassword = req.body.confirmPassword;
            User.findOne({ "email": session.email }, function(err, user) {
                if (user != null) {
                    var hash = user.password;
                    bcrypt.compare(oldPassword, hash, function(err, res) {
                        if (res) {
                            if (newPassword === confirmPassword) {
                                bcrypt.hash(newPassword, 5, function(err, hash) {
                                    user.password = hash
                                    user.save(function(err, user) {
                                        if (err) {
                                            console.error(err);
                                        }
                                        res1.render('site/user/profile')
                                        console.log(user.email+'! Thay đổi mật khẩu thành công');
                                    })
                                })
                            }
                        }
                    })
                }
            })
        }
    }
}

module.exports = new UserController;
