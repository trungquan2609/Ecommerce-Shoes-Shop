const Rate = require('../../models/rate_model');
const Comment = require('../../models/comment_model')
const User = require('../../models/user_model');

class FeedbackController {
    async feedback(req, res, next) {
        var comment = await Comment.find({ SKU: req.params.SKU}).populate('userId').sort({createdAt : -1})
        var rate = await Rate.find({ SKU: req.params.SKU}).populate('userId').sort({createdAt : -1})
        var star = Math.round(rate.map(r => r.rate).reduce((pre, acc) => pre + acc, 0 ) / rate.length)
        res.json({
            comment,
            rate,
            star
        })
    }
}

module.exports = new FeedbackController