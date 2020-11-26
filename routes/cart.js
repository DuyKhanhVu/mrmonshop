var express = require('express');
var router = express.Router();
var products_model=require('../models/productModel');
var cart_controller = require('../controllers/cartController');
var Cart=require('../controllers/cartController');
var numeral=require('numeral');
/* GET users listing. */
router.get('/', (req,res)=>{
    var totalQty=0
    if(!req.session.cart){
        return res.render('cart',{ data : {
            islogin:req.isAuthenticated(),
            products:null,
            totalQty:totalQty,
        }
        })
    } 
    
    var cart=new Cart(req.session.cart);
    console.log(cart);
    totalQty=req.session.cart.totalQty;
    var products= cart.generateArray();
      
    res.render('cart', {
        data: {
            products: products,
            totalPrice:numeral(cart.totalPrice).format('0,0'),
            islogin: req.isAuthenticated(),
            totalQty: totalQty,
            cost:numeral(cart.totalPrice +120000).format('0,0'),
        }
    })
});
router.get('/add-to-cart/:id',(req,res)=>{
    var id = req.params.id;
    
    var data = products_model.getProductsById(id);
    
    var cart=  new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart);
    data.then( rows=>{

        cart.add(rows[0],rows[0].id);
        console.log(cart);
        req.session.cart=cart;
        //console.log(req.session.cart);
        res.redirect(`/product/${id}`);
    
    }).catch(function (err) {
        res.redirect('/cart');
    });
})
module.exports = router;
