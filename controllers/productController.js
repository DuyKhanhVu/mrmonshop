var products_model = require('../models/productModel');
var numeral=require('numeral');
exports.index = function(req, res){
    res.render('product');
}

exports.getProductsById = function(req, res){
    var id = req.params.id;
    var data = products_model.getProductsById(id);
    var totalQty=0
    if(req.session.cart){
        totalQty=req.session.cart.totalQty;
    } 
    
    data.then(function (product) {
        product.forEach(element => {
            element.price=numeral(element.price).format('0,0');
        });
        
        var dataRender = {
            id:id,
            product: product[0],
            error: false,
            islogin:req.isAuthenticated(),
            totalQty:totalQty
        };
        res.render("product", { data: dataRender });
    }).catch(function (err) {
        res.render("product", { data: { error: true } });
    });
}