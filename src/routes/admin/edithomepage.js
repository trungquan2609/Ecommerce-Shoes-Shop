const express = require('express');
const router = express.Router();

const EditHomePage = require('../../app/controllers/admin/EditHomePageController.js');

router.patch('/:_id', isLoggedIn, EditHomePage.update);

router.get('/:_id', isLoggedIn, EditHomePage.edit)

router.get('/', isLoggedIn, EditHomePage.index);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}