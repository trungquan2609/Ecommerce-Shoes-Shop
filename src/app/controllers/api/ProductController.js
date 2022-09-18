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
            Product.aggregate([
                { $group: {
                    _id: {
                        SKU: '$SKU',
                        name: '$productName',
                        price: '$price' ,
                        salePrice: '$salePrice',
                        productImage: '$productImage'
                }}}
            ])
                .skip(skip)
                .limit(PAGE_SIZE)
                .then(data=> {
                    // res.json(data)
                    Product.aggregate([
                        { $group: {
                            _id: {
                                SKU: '$SKU',
                                name: '$productName',
                                price: '$price' ,
                                salePrice: '$salePrice',
                                productImage: '$productImage'
                        }}},
                        {
                            $count: 'SKU'
                        }
                    ])
                    .then((total) => {
                        var totalPage = Math.ceil(total[0].SKU/PAGE_SIZE)
                        res.json({
                            total,
                            totalPage,
                            data
                        })
                    })
                })
        }
    }
}

module.exports = new ProductController
