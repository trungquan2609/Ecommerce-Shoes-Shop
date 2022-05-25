const express = require('express');
const router = express.Router();

const siteController = require('../../app/controllers/site/SiteController');

router.get('/', siteController.index);

module.exports = router;
