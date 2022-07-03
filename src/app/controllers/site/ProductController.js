const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongoosesToObject } = require('../../../util/mongoose');
String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};
const _ = require('lodash')

class ProductController {

    // Get /site/products
    index(req, res, next) {
        Product.aggregate([
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage'
            }}}
        ])
            .then(products => res.render('site/product/product', {
                title: 'N&Q Shop',
                styles: ['product','productdetail'],
                scripts: ['product'],
                layout: 'layout_site.hbs',
                products,
            }))
            .catch(next);
    }

    sort(req, res, next) {
        if ( req.params.brandid && req.param('sn') === 'name' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.name' : parseInt(req.param('s')) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        }
        else if ( req.params.brandid && req.param('sn') == 'price' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.price' : parseInt(req.param('s')) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        } else {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        }
    }

    //GET site/productdetail
    detail(req, res, next) {
        Product.find({ SKU: req.params.SKU}).populate('brandId','brandName')
            // .then(function (product) {
            //     res.send((product));
            // })
            .then(product => res.render('site/product/productDetail', {
                title: 'N&Q Shop',
                styles: ['productdetail'],
                scripts: ['zoomsl','productdetail'],
                layout: 'layout_site.hbs',
                product: product,
            }))
            .catch(next);
    }

}

module.exports = new ProductController;
