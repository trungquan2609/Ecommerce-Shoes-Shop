const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user_model');
const Product = require('./product_model');

const rateSchema = new Schema({
    rate: Number,
    userId: {type: Schema.Types.ObjectId, ref: User },
    SKU: { type: String, ref: Product}
}, {
    timestamps: true,
    collection: 'rates'
})

module.exports = mongoose.model('Rates', rateSchema)