const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const user = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, default: '' },
    phone: { type: Number, default: '' },
    avatar: { type: String, default: '' },
    role: { type: String, default: 'member' },
    status: { type: String, default: 'noactive' },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
}, {collection: 'users'});

user.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', user);
