const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    avatar: Object,
    dateOfBirth: Date,
    gender: { type: String},
    role: { type: String, default: 'mod'} ,
    status: String
}, {
    collection: 'admins',
    timestamps: true,
});

adminSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(6), null);
};
adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
