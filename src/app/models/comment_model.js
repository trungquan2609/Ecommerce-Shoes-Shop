const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user_model');
const Product = require('./product_model');
const Admin = require('./admin_model');

const commentSchema = new Schema({
    comment: String,
    userId: {type: Schema.Types.ObjectId, ref: User },
    adminId: {type: Schema.Types.ObjectId, ref: Admin },
    SKU: { type: String, ref: Product}
}, {
    timestamps: true,
    collection: 'comments'
})

module.exports = mongoose.model('Comment', commentSchema)