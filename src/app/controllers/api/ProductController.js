const Product = require('../../models/product_model')
const Rate = require('../../models/rate_model')

class ProductController {

    async index(req, res, next ) {
        const PAGE_SIZE = 6;
        var page = req.query.page
        if(page) {
            page = parseInt(page)
            if(page < 1 ) {
                page = 1
            }
            var skip = (page-1) * PAGE_SIZE
            var lt = 9999999999
            var gt = 0

            if (req.query.gt) {
                var gt = parseInt(req.query.gt);
            }
            if (req.query.lt) {
                var lt = parseInt(req.query.lt);
            }

            if(req.query.search) {
                var q = req.query.search
            }
            if ( req.query.sn === 'name' ) {
                Product.aggregate([
                    { "$match": { 
                        "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                    { $sort: { '_id.name' : parseInt(req.query.order) } }
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { "$match": { 
                                "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                            { $sort: { '_id.name' : parseInt(req.query.order) } }
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            }
            else if ( req.query.sn == 'price' ) {
                Product.aggregate([
                    { "$match": { 
                        "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        currentPrice: '$currentPrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                    { $sort: { '_id.currentPrice' : parseInt(req.query.order) } }
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { "$match": { 
                                "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            } else {
                Product.aggregate([
                    { "$match": { 
                        "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { "$match": { 
                                "$or": [ {productName: {$regex: new RegExp(q, 'i')}}, { productName2: {$regex: new RegExp(q, 'i')}}],
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            }
        }
    }

    async sort(req, res, next) {
        const PAGE_SIZE = 6;
        var page = req.query.page
        if(page) {
            page = parseInt(page)
            if(page < 1 ) {
                page = 1
            }
            var skip = (page-1) * PAGE_SIZE
            var lt = 9999999999
            var gt = 0

            if (req.query.gt) {
                var gt = parseInt(req.query.gt);
            }
            if (req.query.lt) {
                var lt = parseInt(req.query.lt);
            }
            if ( req.params.brandid && req.query.sn === 'name' ) {
                Product.aggregate([
                    { $match: { 
                        brandId: req.params.brandid.toObjectId(),
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                    { $sort: { '_id.name' : parseInt(req.query.order) } }
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { $match: { 
                                brandId: req.params.brandid.toObjectId(),
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                            { $sort: { '_id.name' : parseInt(req.query.order) } }
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            }
            else if ( req.params.brandid && req.query.sn == 'price' ) {
                Product.aggregate([
                    { $match: { 
                        brandId: req.params.brandid.toObjectId(),
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        currentPrice: '$currentPrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                    { $sort: { '_id.currentPrice' : parseInt(req.query.order) } }
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { $match: { 
                                brandId: req.params.brandid.toObjectId(),
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            } else {
                Product.aggregate([
                    { $match: { 
                        brandId: req.params.brandid.toObjectId(),
                        currentPrice: { $gte: gt, $lte: lt }
                    }},
                    { $group: {_id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage',
                        rate: '$rate'
                    }}},
                ])
                    .skip(skip)
                    .limit(PAGE_SIZE)
                    .then(data => {
                        Product.aggregate([
                            { $match: { 
                                brandId: req.params.brandid.toObjectId(),
                                currentPrice: { $gte: gt, $lte: lt }
                            }},
                            { $group: {_id: {
                                SKU: '$SKU',
                            }}},
                            { $count: 'SKU' },
                        ])
                        .then((total) => {
                            var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
                            res.json({
                                total,
                                totalPage,
                                data
                            })
                        })
                    })
                    .catch(next);
            }
        }
    }

    showQuantity(req, res, next) {
        Product.find({_id: req.query._id})
        .then(rs=> res.json(rs))
    }

    search(req, res, next) {
        var q = req.query.search
        Product.aggregate([
            { $match: { 
                productName: {$regex: new RegExp(q, 'i')},
            }},
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage',
                rate: '$rate'
            }}},
        ])
        .then(rs => res.json(rs))
    }
}

module.exports = new ProductController
