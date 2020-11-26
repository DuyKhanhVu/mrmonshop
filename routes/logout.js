var express = require('express');
var router = express.Router();
var passport=require('passport');
var login_controller = require('../controllers/loginController')
var auth=require('../middlewares/auth');

/* GET users listing. */

router.get('/', function(req, res, next) {
    req.logOut();
    res.redirect('/');
  });
module.exports = router;  