const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Admin = require('./admin_model')
const Brand = require('./brand_model')

const stockInSchema = new Schema({
    adminId: {type: Schema.Types.ObjectId, ref: Admin },
    file: Object,
    data: [{
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
        rate: Number,
        adminId: {type: Schema.Types.ObjectId, ref: Admin }
    }],
}, {
    collection: 'StockIn',
    timestamps: true,
});


module.exports = mongoose.model('StockIn', stockInSchema);