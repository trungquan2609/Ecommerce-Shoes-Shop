const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    brandName: { type: String, default: ''},
    brandImage: { type: String, default: ''},    
}, {
    collection: 'brands',
    timestamps: true,
});


module.exports = mongoose.model('Brand', brandSchema);