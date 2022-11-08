const express = require('express');
const router = express.Router();
const FeedbackController = require('../../app/controllers/api/FeedbackController.js');

router.get('/:SKU', FeedbackController.feedback);

module.exports = router;