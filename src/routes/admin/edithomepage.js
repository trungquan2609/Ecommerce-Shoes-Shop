const express = require('express');
const router = express.Router();

const EditHomePage = require('../../app/controllers/admin/EditHomePageController');

router.get('/:title', EditHomePage.edit)

router.get('/', EditHomePage.index);

module.exports = router;
