var express = require('express');
var router = express.Router();
var passport = require('passport');
var login_controller = require('../controllers/loginController')
var auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', noLoggedIn, login_controller.index);

router.get('/forgot-account', noLoggedIn, login_controller.forgot_account);

router.post('/forgot-account', noLoggedIn, login_controller.forgot_account_post);

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    console.log(user);
    if (err) { return next(err); }
    if (!user) {
      return res.render("account/signin", { data: { error: info.message } });
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});


module.exports = router;
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
function noLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}