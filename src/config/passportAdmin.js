const passport = require('passport');
var passportAdmin = new passport.Passport();
const Admin = require('../app/models/admin_model');
const LocalStrategy = require('passport-local').Strategy;

// Passport session setup
// used to serialize the admin for the session

module.exports = function(passport) {
    passportAdmin.serializeUser(function(admin, done) {
        done(null, admin.id);
    });
    
    // used to deserialize the admin
    passportAdmin.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            if (err) {
                done(null, false, {error:err})
            } else {
                done(null, admin);
            }
        });
    });
    
    // local sign up
    passportAdmin.use('local.adminRegister', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        Admin.findOne({ 'email': email }, function(err, admin) {
                if (err) { return done(err); }
                if (admin) {
                    return done(null, false, {message: 'Email đã được sử dụng'});
                }
                var newUser = new Admin();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                newUser.fullname = req.body.fullname;
                newUser.address = req.body.address;
                newUser.phone = req.body.phone;
                newUser.avatar = req.body.avatar;
                newUser.dateOfBirth = req.body.dateOfBirth;
                newUser.gender = req.body.gender;
                newUser.role = req.body.role;
                newUser.status = req.body.status;
                newUser.avatar = req?.file
                newUser.save(function(err, admin) {
                    if (err) { 
                        return done(err); 
                    }
                    return done(null, newUser);
                });
            });
    }));
    
    
    passportAdmin.use('local.adminLogin', new LocalStrategy({
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
            // if (!admin.validPassword(password)) {
            //     return done(null, false, {message: 'Sai mật khẩu'});
            // }
            done(null, admin);
        });
    }));
}
