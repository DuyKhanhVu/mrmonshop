var account_model = require('../models/accountModel');

exports.index = function(req, res){
    res.render('mailer/validate', { data: { error: "" } });
}

exports.validateAccount = function(req, res){
    var token = req.params.token;
    account_model.validateAccountByToken(token).then(function(){
        res.redirect('/validate');
    }).catch(function (err) {
        res.render('signup', { data: { error: "Can't create account" } });
    });
}