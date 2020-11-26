var express = require('express');
var router = express.Router();

var product_controller = require('../controllers/productController');+

/* GET users listing. */
router.get('/', product_controller.index);

router.get('/:id', product_controller.getProductsById);

module.exports = router;
