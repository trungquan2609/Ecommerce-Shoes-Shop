const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./brand_model');
const User = require('./user_model');
const Product = require('./product_model');
const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: User},
    productId: Array,
    status: String,
    totalPrice: {type: Number},
    paypalFee: Number,
    lastTotal: Number,
}, {
    collection: 'orders',
    timestamps: true,
});


module.exports = mongoose.model('Order', orderSchema);
