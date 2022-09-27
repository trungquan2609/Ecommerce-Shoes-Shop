const Product = require('../../models/product_model')

class ProductController {

    index(req, res, next ) {
        
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

            if (req.param('gt')) {
                var gt = parseInt(req.param('gt'));
            }
            if (req.param('lt')) {
                var lt = parseInt(req.param('lt'));
            }

            if(req.param('search')) {
                var q = req.param('search')
            }
            if ( req.param('sn') === 'name' ) {
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
                    }}},
                    { $sort: { '_id.name' : parseInt(req.param('order')) } }
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
                            { $sort: { '_id.name' : parseInt(req.param('order')) } }
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
            else if ( req.param('sn') == 'price' ) {
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
                    }}},
                    { $sort: { '_id.currentPrice' : parseInt(req.param('order')) } }
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
            // Product.aggregate([
            //     { $group: {
            //         _id: {
            //             SKU: '$SKU',
            //             name: '$productName',
            //             price: '$price' ,
            //             salePrice: '$salePrice',
            //             productImage: '$productImage'
            //     }}}
            // ])
            //     .skip(skip)
            //     .limit(PAGE_SIZE)
            //     .then(data=> {
            //         // res.json(data)
            //         Product.aggregate([
            //             { $group: {
            //                 _id: {
            //                     SKU: '$SKU',
            //                     name: '$productName',
            //                     price: '$price' ,
            //                     salePrice: '$salePrice',
            //                     productImage: '$productImage'
            //             }}},
            //             {
            //                 $count: 'SKU'
            //             }
            //         ])
            //         .then((total) => {
            //             var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
            //             res.json({
            //                 total,
            //                 totalPage,
            //                 data
            //             })
            //         })
            //     })
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

            if (req.param('gt')) {
                var gt = parseInt(req.param('gt'));
            }
            if (req.param('lt')) {
                var lt = parseInt(req.param('lt'));
            }
            if ( req.params.brandid && req.param('sn') === 'name' ) {
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
                    }}},
                    { $sort: { '_id.name' : parseInt(req.param('order')) } }
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
                            { $sort: { '_id.name' : parseInt(req.param('order')) } }
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
            else if ( req.params.brandid && req.param('sn') == 'price' ) {
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
                    }}},
                    { $sort: { '_id.currentPrice' : parseInt(req.param('order')) } }
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
        Product.find({_id: req.param('_id')})
        .then(rs=> res.json(rs))
    }

    search(req, res, next) {
        var q = req.param('search')
        // Product.find({productName: {$regex: new RegExp(q, 'i')}})
        // .then(rs=> {
        //     var result = rs.groupBy(({SKU}) => SKU)
        //     res.json(rs)
        // })

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
            }}},
        ])
        .then(rs => res.json(rs))
        
        // const PAGE_SIZE = 6;
        // var page = req.query.page
        // if(page) {
        //     page = parseInt(page)
        //     if(page < 1 ) {
        //         page = 1
        //     }
        //     var skip = (page-1) * PAGE_SIZE
        //     var lt = 9999999999
        //     var gt = 0

        //     if (req.param('gt')) {
        //         var gt = parseInt(req.param('gt'));
        //     }
        //     if (req.param('lt')) {
        //         var lt = parseInt(req.param('lt'));
        //     }
        //     if ( req.param('sn') === 'name' ) {
        //         Product.aggregate([
        //             { $match: { 
        //                 productName: {$regex: new RegExp(q, 'i')},
        //                 currentPrice: { $gte: gt, $lte: lt }
        //             }},
        //             { $group: {_id: {
        //                 SKU: '$SKU',
        //                 name: '$productName',
        //                 price: '$price' ,
        //                 salePrice: '$salePrice',
        //                 productImage: '$productImage',
        //             }}},
        //             { $sort: { '_id.name' : parseInt(req.param('order')) } }
        //         ])
        //             .skip(skip)
        //             .limit(PAGE_SIZE)
        //             .then(data => {
        //                 Product.aggregate([
        //                     { $match: { 
        //                         productName: {$regex: new RegExp(q, 'i')},
        //                         currentPrice: { $gte: gt, $lte: lt }
        //                     }},
        //                     { $group: {_id: {
        //                         SKU: '$SKU',
        //                     }}},
        //                     { $count: 'SKU' },
        //                     { $sort: { '_id.name' : parseInt(req.param('order')) } }
        //                 ])
        //                 .then((total) => {
        //                     var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
        //                     res.json({
        //                         total,
        //                         totalPage,
        //                         data
        //                     })
        //                 })
        //             })
        //             .catch(next);
        //     }
        //     else if ( req.param('sn') == 'price' ) {
        //         Product.aggregate([
        //             { $match: { 
        //                 productName: {$regex: new RegExp(q, 'i')},
        //                 currentPrice: { $gte: gt, $lte: lt }
        //             }},
        //             { $group: {_id: {
        //                 SKU: '$SKU',
        //                 name: '$productName',
        //                 price: '$price' ,
        //                 salePrice: '$salePrice',
        //                 currentPrice: '$currentPrice',
        //                 productImage: '$productImage',
        //             }}},
        //             { $sort: { '_id.currentPrice' : parseInt(req.param('order')) } }
        //         ])
        //             .skip(skip)
        //             .limit(PAGE_SIZE)
        //             .then(data => {
        //                 Product.aggregate([
        //                     { $match: { 
        //                         productName: {$regex: new RegExp(q, 'i')},
        //                         currentPrice: { $gte: gt, $lte: lt }
        //                     }},
        //                     { $group: {_id: {
        //                         SKU: '$SKU',
        //                     }}},
        //                     { $count: 'SKU' },
        //                 ])
        //                 .then((total) => {
        //                     var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
        //                     res.json({
        //                         total,
        //                         totalPage,
        //                         data
        //                     })
        //                 })
        //             })
        //             .catch(next);
        //     } else {
        //         Product.aggregate([
        //             { $match: { 
        //                 productName: {$regex: new RegExp(q, 'i')},
        //                 currentPrice: { $gte: gt, $lte: lt }
        //             }},
        //             { $group: {_id: {
        //                 SKU: '$SKU',
        //                 name: '$productName',
        //                 price: '$price' ,
        //                 salePrice: '$salePrice',
        //                 productImage: '$productImage',
        //             }}},
        //         ])
        //             .skip(skip)
        //             .limit(PAGE_SIZE)
        //             .then(data => {
        //                 Product.aggregate([
        //                     { $match: { 
        //                         productName: {$regex: new RegExp(q, 'i')},
        //                         currentPrice: { $gte: gt, $lte: lt }
        //                     }},
        //                     { $group: {_id: {
        //                         SKU: '$SKU',
        //                     }}},
        //                     { $count: 'SKU' },
        //                 ])
        //                 .then((total) => {
        //                     var totalPage = Math.ceil(total[0]?.SKU/PAGE_SIZE)
        //                     res.json({
        //                         total,
        //                         totalPage,
        //                         data
        //                     })
        //                 })
        //             })
        //             .catch(next);
        //     }
        // }
    }
}

module.exports = new ProductController
