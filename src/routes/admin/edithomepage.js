const express = require('express');
const router = express.Router();

const EditHomePage = require('../../app/controllers/admin/EditHomePageController');

router.patch('/:_id', EditHomePage.update);

router.get('/:_id', EditHomePage.edit)

router.get('/', EditHomePage.index);

module.exports = router;
