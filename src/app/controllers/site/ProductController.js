const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongoosesToObject } = require('../../../util/mongoose');

class ProductController {

    // Get /site/index
    index(req, res, next) {
        // res.render('site/product/product', {
        //     title: 'N&Q Shop',
        //     styles: ['product','productdetail'],
        //     scripts: ['product'],
        //     layout: 'layout_site.hbs'
        // });
        if ( req.param('brand') ) {
            Product.aggregate([
                { $match: { brandId: req.param('brand')}},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage'
                }}}
            ])
                // .then(products => console.log(products))
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    // percent: 100 * (products._id.salePrice / products._id.price * 100),
                }))
                .catch(next);
        } else {
            Product.aggregate([
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage'
                }}}
            ])
                // .then(products => console.log(products))
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    // percent: 100 * (products._id.salePrice / products._id.price * 100),
                }))
                .catch(next);
        }
    }

}

module.exports = new ProductController;
