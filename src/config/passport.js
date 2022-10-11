const passport = require('passport');
const User = require('../app/models/user_model');
const Admin = require('../app/models/admin_model')
const LocalStrategy = require('passport-local').Strategy;

// Passport session setup
// used to serialize the user for the session

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err) done(err);
            if (user) {
                done(err, user);
            } else {
                Admin.findById(id, function(err, admin) {
                    if (err) done(err);
                    done(null, admin);
                })
            }
        });
    });
    
    // local sign up
    passport.use('local.register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        User.findOne({ 'email': email }, function(err, user) {
                if (err) { return done(err); }
                if (user) {
                    return done(null, false, {message: 'Email đã được sử dụng'});
                }
                var newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                newUser.save(function(err, user) {
                    if (err) { 
                        return done(err); 
                    }
                    return done(null, newUser);
                });
            });
    }));
    
    
    passport.use('local.login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        User.findOne({ 'email': email }, function(err, user) {
            if (err) { return done(err); }
            if (!user || !user.validPassword(password)) {
                return done(null, false, {message: 'Sai tài khoản hoặc mật khẩu'});
            }
            if (user?.status == 'banned') {
                return done(null, false, {message: 'Tài khoản của bạn đã bị xoá'});
            }
            return done(null, user);
        });
    }));
    
    
    // local admin sign up
    passport.use('local.adminRegister', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        Admin.findOne({ 'email': email }, function(err, admin) {
                if (err) { return done(err); }
                if (admin) {
                    return done(null, false, {message: 'Email đã được sử dụng'});
                }
                var newAdmin = new Admin();
                newAdmin.email = email;
                newAdmin.password = newAdmin.encryptPassword(password);
                newAdmin.fullname = req.body.fullname;
                newAdmin.address = req.body.address;
                newAdmin.phone = req.body.phone;
                newAdmin.avatar = req.body.avatar;
                newAdmin.dateOfBirth = req.body.dateOfBirth;
                newAdmin.gender = req.body.gender;
                newAdmin.status = req.body.status;
                newAdmin.avatar = req?.file
                newAdmin.save(function(err, admin) {
                    if (err) { 
                        return done(err); 
                    }
                    return done(null, newAdmin);
                });
            });
    }));
    
    
    passport.use('local.adminLogin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        Admin.findOne({ email: email }, function(err, admin) {
            if (err) {
                console.log(err);
                return done(err); 
            }
            if (!admin || !admin.validPassword(password)) {
                return done(null, false, {message: 'Sai tài khoản hoặc mật khẩu'});
            }
            if (admin?.status == 'banned') {
                return done(null, false, {message: 'Tài khoản của bạn đã bị xoá'});
            }
            done(null, admin);
        });
    }));
}
