const express = require('express');
const router = express.Router();
const AuthController = require( '../controllers/AuthController' );

router.post('/log-in',AuthController.login);
router.post('/sign-up',AuthController.register);
router.post('/logout',AuthController.logout);
router.get('/get-user',AuthController.checkLogin, AuthController.getUser);
router.post('/save-user-info',AuthController.checkLogin, AuthController.saveUserData);


module.exports = router;