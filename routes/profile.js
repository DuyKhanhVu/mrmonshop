var express = require('express');
var router = express.Router();
var passport = require('passport');
var profile_controller = require('../controllers/profileController')
var auth = require('../middlewares/auth');
var accountModel = require('../models/accountModel');
/* GET users listing. */

router.get('/', auth, profile_controller.index);

router.post('/', profile_controller.update_profile);

router.get('/change-password', profile_controller.change_password);

router.post('/change-password', profile_controller.change_password_post);
module.exports = router;  