const express = require('express');
const router = express.Router();

const feedbackController = require('../../app/controllers/site/FeedbackController');

router.post('/comment', isLoggedIn, feedbackController.comment);

router.get('/rate', isLoggedIn, feedbackController.rate);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/login');
}
