const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');
const Comment = require('../../models/comment_model');
const User = require('../../models/user_model');
const Rate = require('../../models/rate_model');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongoosesToObject } = require('../../../util/mongoose');
String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};
const _ = require('lodash');
const { result } = require('lodash');

class ProductController {

    // Get /site/products
    index(req, res, next) {
        res.render('site/product/product', {
            title: 'N&Q Shop',
            styles: ['product','productdetail'],
            scripts: ['pagination.min', 'product', 'products'],
            layout: 'layout_site.hbs',
        })
}

    sort(req, res, next) {
        if ( req.params.brandid && req.query.sn === 'name' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.name' : parseInt(req.query.order) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['pagination.min','product', 'products'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.query.brand
                }))
                .catch(next);
        }
        else if ( req.params.brandid && req.query.sn == 'price' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.price' : parseInt(req.query.order) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['pagination.min','product', 'products'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.query.brand
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
                    scripts: ['pagination.min','product', 'products'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.query.brand
                }))
                .catch(next);
        }
    }

    //GET site/productdetail
    async detail(req, res, next) {
        var user = req.user ? req.user : null;
        
        var message = req.flash('info')
        if (message == 'Đã thêm vào giỏ hàng') {
            var info = 'success';
        } else {
            var info = 'danger'
        }
        Product.find({ SKU: req.params.SKU}).populate('brandId','brandName')
            .then(product => {
                Product.aggregate([
                    { $match: { brandId: product[0].brandId._id }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage',
                    }}},
                ]).limit(4)
                    .then(closeProduct => {
                        res.render('site/product/productDetail', {
                            title: 'N&Q Shop',
                            styles: ['productdetail'],
                            scripts: ['zoomsl','productdetai'],
                            layout: 'layout_site.hbs',
                            product,
                            user,
                            message,
                            info,
                            closeProduct,
                        })
                    })
            })
            .catch(next);
    }

}

module.exports = new ProductController;
