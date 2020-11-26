var express = require('express');
var router = express.Router();

var validate_controller = require('../controllers/validateController');+



/* GET home page. */
router.get('/', validate_controller.index);

router.get('/:token', validate_controller.validateAccount);

module.exports = router;
