var products_model = require("../models/productModel");
var numeral=require('numeral');
exports.products_type = function(req, res){
    var id = req.params.id;
    var data = products_model.getProductsByProductType(id);
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
           
        };
        console.log(dataRender);
        res.render("collections", { data: 
            {
                dataRender,
                islogin:req.isAuthenticated(),
                totalQty:totalQty
            } });
    }).catch(function (err) {
        res.render("collections", { data: { 
            error: true,
            islogin:req.isAuthenticated(),
            totalQty:totalQty

         } });
    });
}