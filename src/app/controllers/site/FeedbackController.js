const Product = require('../../models/product_model');
const User = require('../../models/user_model');
const Rate = require('../../models/rate_model');
const Comment = require('../../models/comment_model');

class FeedbackController {
    async rate(req, res, next) {
        var userId = req.param('userId');
        var star = parseInt(req.param('star')) + 1;
        var SKU = req.param('sku');
        var q1 = await Rate.find({$and:[{ userId: userId }, {SKU : SKU}]}).count();
        var rate = await Rate.find({ SKU: SKU})
        var star2 = Math.round(rate.map(r => r.rate).reduce((pre, acc) => pre + acc, 0 ) / rate.length)
        if ( q1 == 0) {
            var newRate = new Rate({
                userId,
                rate: star,
                SKU
            })
            newRate.save()
            .then(rs => Product.updateMany({SKU:SKU}, { $set: {'rate':star2}}))
            .then(res.redirect('back'))
        } else {
            var newRate = {
                userId,
                rate: star,
                SKU
            }
            Rate.updateOne({ userId: userId}, newRate)
            .then(rs => Product.updateMany({SKU:SKU}, { $set: {'rate':star2}}))
            .then(res.redirect('back'))
        }
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