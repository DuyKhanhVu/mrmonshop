var account_model = require('../models/accountModel');
var bcrypt = require('bcrypt');
var mailer = require('../common/mailer')
var randtoken = require('rand-token')

exports.index = function(req, res){
    res.render('account/signin', { data: { error: "" }});
}

exports.forgot_account = function(req, res){
    res.render('account/forgot_account', {data: {error: ""}});
}

exports.forgot_account_post = function(req, res){
    account_model.getAccountByUsername(req.body.username).then(function (users) {
        var user = users[0]
        console.log(user);
        //random new password for user
        var new_pass = randtoken.generate(8);

        //send email
        var mailOptions = {
            from: 'shopsp098@gmail.com',
            to: user.email,
            subject: 'Siêu thị máy tính khôi phục tài khoản',
            html: '<h2>Khôi phục tài khoản</h2><p>Bạn đã yêu cầu khôi phục tài khoản thành công.</p><br><p>Mật khẩu mới của bạn là : ' + new_pass,
        };
        mailer.sendEmail(mailOptions);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(new_pass, salt);
        account_model.updatePassword(user.username, hash).then(function(){
            res.redirect('/signin');
        });
    }).catch(function (err) {
        console.log(err);
        res.render("account/forgot_account", { data: { error: 'Không tìm thấy tài khoản.' } });
    });
}