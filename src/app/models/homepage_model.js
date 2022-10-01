const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homePageSchema = new Schema({
    name: String,
    SKU: String,
    SKU2: String,
    SKU3: String,
    SKU4: String,
}, {
    collection: 'Homepage',
    timestamps: true,
});


module.exports = mongoose.model('Homepage', homePageSchema);