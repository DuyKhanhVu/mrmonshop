var express = require('express');
var router = express.Router();

var signup_controller = require('../controllers/signupController');

/* GET users listing. */
router.get('/', signup_controller.index);

router.post('/', signup_controller.create_account);

module.exports = router;
