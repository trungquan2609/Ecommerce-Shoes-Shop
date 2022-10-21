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
                product.createdAt = order[i].createdAt
                data.push(product)
            }
        }
        for ( var m in data ) {
            for ( var n = 0; n < data.length; n++) {
                if ( data[m].item.SKU == data[n].item.SKU && data[m].item.size == data[n].item.size) {
                    data[m].qty += data[n].qty;
                    data.splice(n,1)
                    n -= 1
                }                
            }
        }
        // product2.createdAt = order[i].createdAt
        // data.push(product2)
        res.json(data)
        
    }
}

module.exports = new Statistics