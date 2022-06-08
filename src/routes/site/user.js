const express = require('express');
const router = express.Router();

const userController = require('../../app/controllers/site/UserController');

router.get('/register', userController.registerSite);
router.post('/register', userController.register);
router.get('/login', userController.loginSite);

module.exports = router;
