const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productShema = new Schema({
    SKU: { type: String, default: ''},
    productName: { type: String, default: '' },
    brandId: { type: Schema.Types.ObjectId, ref: 'brands' },
    price: { type: Number, default: '' },
    salePrice: { type: Number, default: '' },
    size: { type: Number, default: '' },
    productImage: { type: String, default: '' },
    quantity: { type: Number, default: '' },
    description: { type: String, default: '' },
}, {
    collection: 'products',
    timestamps: true,
});


module.exports = mongoose.model('Product', productShema);