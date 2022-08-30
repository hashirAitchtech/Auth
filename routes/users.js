const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/')
    .get(authController.login);

router.route('/getAllUsers')
    .get(authController.getAllUsers);

router.route('/refresh')
    .get(authController.refresh);
    
router.route('/logout')
    .post(authController.logout);

router.route('/register')
    .post(authController.register);

module.exports = router;