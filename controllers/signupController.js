var bcrypt = require('bcrypt');
var account_model = require('../models/accountModel');
var mailer = require('../common/mailer')
var randtoken = require('rand-token')

exports.index = function(req, res){
    res.render('account/signup', { data: { error: "" } });
}

exports.create_account = function(req, res){
    var params = req.body;
    if (params.password !== params.confirmpassword) {
        res.render('account/signup', { data: { error: "Password not match" } });
    } else if (params.password.length < 8) {
        res.render('account/signup', { data: { error: "Password too short - minimum length is 8 characters" }});
    } else {
        var token = randtoken.generate(16);
        console.log(token)
        //Send email validate
        var mailOptions = {
            from: 'shopsp098@gmail.com',
            to: params.email,
            subject: 'Siêu thị máy tính xác nhận tài khoản',
            html: '<h2>Welcome</h2><p>Bạn đã đăng kí thành công tài khoản tại Siêu thị máy tính. Click vào <a href=http://localhost:3000/validate/'+token+'>Link</a> để xác nhận tài khoản.</p>'
        };
        mailer.sendEmail(mailOptions);
        //Save account to dbs
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(params.password, salt);
        var account = {
            username: params.username,
            password: hash,
            email: params.email,
            token: token
        }
        account_model.createAccount(account).then(function(){
            res.redirect('/signin');
        }).catch(function (err) {
            res.render('account/signup', { data: { error: "Can't create account" } });
        });
    }
}