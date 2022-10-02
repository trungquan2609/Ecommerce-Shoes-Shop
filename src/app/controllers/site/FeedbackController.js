const Product = require('../../models/product_model');
const User = require('../../models/user_model');
const Rate = require('../../models/rate_model');
const Comment = require('../../models/comment_model');

class FeedbackController {
    rate(req, res, next) {
        
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