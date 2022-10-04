const Product = require('../../models/product_model');
const User = require('../../models/user_model');
const Rate = require('../../models/rate_model');
const Comment = require('../../models/comment_model');

class FeedbackController {
    async rate(req, res, next) {
        var userId = req.query.userId;
        var star = parseInt(req.query.star) + 1;
        var SKU = req.query.sku;
        var q1 = await Rate.find({$and:[{ userId: userId }, {SKU : SKU}]});
        // var rateNum = await Rate.find({ SKU: SKU})
        // var starAvg = Math.round(rateNum.map(r => r.rate).reduce((pre, acc) => pre + acc, 0 ) / rateNum.length)
        if ( q1.length == 0) {
            var newRate = new Rate({
                userId,
                rate: star,
                SKU
            })
            var q2 = await newRate.save()
            var rateNum = await Rate.find({ SKU: SKU})
            var starAvg = Math.round(rateNum.map(r => r.rate).reduce((pre, acc) => pre + acc, 0 ) / rateNum.length)
            var q3 = await Product.updateMany({SKU:SKU}, { $set: {rate:starAvg}})
            res.redirect('back')
        } else {
            var newRate = {
                userId,
                rate: star,
                SKU
            }
            var q2 = await Rate.updateOne({$and:[{ userId: userId }, {SKU : SKU}]}, newRate)
            var rateNum = await Rate.find({ SKU: SKU})
            var starAvg = Math.round(rateNum.map(r => r.rate).reduce((pre, acc) => pre + acc, 0 ) / rateNum.length)
            var q3 = await Product.updateMany({SKU:SKU}, { $set: {rate:starAvg}})
            res.redirect('back')
        }
        console.log(starAvg)
    }

    comment(req, res, next) {
        var addComment = new Comment({
            comment: req.body.comment,
            userId: req.body.userId,
            SKU: req.body.SKU,
        })
        addComment.save()
            .then(res.redirect('back'))
    }
}

module.exports = new FeedbackController;