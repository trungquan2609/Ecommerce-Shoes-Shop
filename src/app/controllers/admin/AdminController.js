const Receipt = require('../../models/receipt_model');
const Brand = require('../../models/brand_model');
const Product = require('../../models/product_model');

class AdminController {

    // Get /admin/index
    async index(req, res, next) {
        const brand = await Brand.count();
        const product = await Product.find();
        var quantity = product.map(r => r.quantity).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        const qReceipt = await Receipt.find()
        const tReceipt = () => qReceipt.map(r => r.receipt).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        res.render('admin/index', {
            style: [],
            script: ['dashboard'],
            layout: 'layout_admin.hbs',
            tReceipt,
            brand, quantity
        });

    }

}

module.exports = new AdminController;
