const express = require ('express');
const router = express.Router();
const {isAuthenticatedUser} = require('../middlewares/auth')

const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);


module.exports = router;