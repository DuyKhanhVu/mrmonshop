var products_model = require('../models/productModel');
var numeral=require('numeral');
exports.index = function(req, res){
    var data = products_model.getAllProducts();
    var totalQty=0
    if(req.session.cart){
        totalQty=req.session.cart.totalQty;
    } 
    data.then(function (products) {
        products.forEach(element => {
            element.price=numeral(element.price).format('0,0');
        });
        
        var dataRender = {
            products: products,
            error: false,
            islogin:req.isAuthenticated(),
            totalQty:totalQty
        };
        //console.log(dataRender);
        res.render("index", { data: dataRender });
    }).catch(function (err) {
        res.render("index", { data: { error: true } });
    });
}