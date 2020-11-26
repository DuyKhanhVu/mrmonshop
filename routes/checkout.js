var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Cart = require('../controllers/cartController');
var orderModel = require('../models/orderModel');
var numeral = require('numeral');
var accountModel = require('../models/accountModel');

/* GET users listing. */
router.get('/', auth, (req, res, next) => {
    var totalQty = 0
    if (!req.session.cart) {
        return res.render('checkout', {
            data: {
                islogin: req.isAuthenticated(),
                products: null,
                totalQty: totalQty,
            }
        })
    }

    var cart = new Cart(req.session.cart);
    totalQty = req.session.cart.totalQty;
    var products = cart.generateArray();
    products.forEach(element => {
        //element.price = numeral(element.price).format('0,0');
        //element.item.price = numeral(element.item.price).format('0,0');
    });
    accountModel.getAccountByUsername(req.user.username).then(user=>{
        res.render('checkout', {
            data: {
                products: products,
                totalPrice: numeral(cart.totalPrice).format('0,0'),
                islogin: req.isAuthenticated(),
                totalQty: totalQty,
                cost: numeral(cart.totalPrice + 120000).format('0,0'),
                error: "",
                user: user[0],
    
            }
        })    
    }).catch(err => {
        console.log(err);
    });
    
});
router.post('/bill', auth, (req, res, next) => {

    var cart = new Cart(req.session.cart);
    //totalQty = req.session.cart.totalQty;
    var account = {
        display_name: req.body.display_name,
        phone: req.body.phone,
        address: req.body.address,
    };
    console.log(account);
    accountModel.addInfo(account,req.user.id).catch(err => {
        console.log(err);
    });
    var products = cart.generateArray();
    var entity = {
        iduser: req.user.id,
        total: cart.totalPrice,
        shipping_fee: 120000,
        create_at: new Date(),
        //status:'0',
    };
    //console.log(entity);
    orderModel.CreateOrder(entity).then(id => {

        products.forEach(element => {
            var entity2 = {
                id_order: id,
                id_product: element.item.id,
                amount: element.qty,
            };
            orderModel.CreateOrderDetail(entity2).catch(err => {
                console.log(err);
            });
        });
        cart = new Cart({});
        req.session.cart = cart;

        res.redirect('/');
    }).catch(function (err) {
        res.redirect('/cart');
    });

});


module.exports = router;