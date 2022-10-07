const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = require('./admin_model')

const contactSchema = new Schema({
    email: { type: String, required: true },
    fullname: { type: String, default: '' },
    phone: { type: String, default: '' },
    message: String,
    status: { type: String, default: 'Chưa liên hệ'},
    adminId: { type: Schema.Types.ObjectId, ref: Admin }
}, {
    collection: 'contacts',
    timestamps: true,
});


module.exports = mongoose.model('Contact', contactSchema);