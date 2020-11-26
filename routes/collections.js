var express = require('express');
var router = express.Router();

var collections_controller = require('../controllers/collectionsController');

/* GET users listing. */

router.get('/:id', collections_controller.products_type)

module.exports = router;
