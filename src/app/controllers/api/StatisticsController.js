const Order = require('../../models/order_model')

class Statistics {
    async index(req, res, next) {
        var from = new Date(req.query.from ? req.query.from : '2022-10-12')
        var to = new Date(req.query.to ? req.query.to : Date.now())
        to.setHours(23,59,59,9999)
        var material = req.query.material 
        var sexual = req.query.sexual
        var order = await Order.find({$and:[{createdAt: {$gte:from}}, {createdAt:{$lte:to}}]})
        var data = []
        for ( var i in order ) {
            var productId = order[i].productId
            for (var j in productId) {
                var product = productId[j]
                data.push(product)
                for ( var k in data) {
                    if ( data[k].SKU != product.SKU && data[k].size != product.size) {
                    }
                }
            }
        }
        // product2.createdAt = order[i].createdAt
        // data.push(product2)
        res.json(data)
        
    }
}

module.exports = new Statistics