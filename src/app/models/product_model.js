const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Brand = require('./brand_model');

const productShema = new Schema({
    SKU: { type: String},
    productName: { type: String },
    productName2: String,
    brandId: { type: Schema.Types.ObjectId, ref: Brand },
    price: { type: Number },
    salePrice: { type: Number },
    currentPrice: Number,
    size: { type: Number },
    productImage: { type: String },
    quantity: { type: Number },
    description: { type: String },
}, {
    collection: 'products',
    timestamps: true,
});


module.exports = mongoose.model('Product', productShema);
