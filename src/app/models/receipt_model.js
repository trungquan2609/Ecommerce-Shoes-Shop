const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    receipt: Number
}, {
    collection: 'receipts',
    timestamps: true,
});


module.exports = mongoose.model('Receipt', receiptSchema);