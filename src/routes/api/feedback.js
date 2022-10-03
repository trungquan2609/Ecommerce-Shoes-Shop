const express = require('express');
const router = express.Router();
const FeedbackController = require('../../app/controllers/api/FeedbackController');

router.get('/:SKU', FeedbackController.feedback);

module.exports = router;