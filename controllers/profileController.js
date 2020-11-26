var accountModel = require('../models/accountModel');

exports.index = function (req, res, next) {
    var totalQty = 0
    if (req.session.cart) {
        totalQty = req.session.cart.totalQty;
    }
    accountModel.getAccountByUsername(req.user.username).then(rows => {
        //console.log(user);
        var dataRender = {
            error: "",
            user: rows[0],
            islogin: req.isAuthenticated(),
            totalQty: totalQty
        }
        //console.log(dataRender);
        res.render('account/info_account', { data: dataRender });
    }).catch(err => {
        console.log(err);
        res.redirect('/');
    });
}

exports.update_profile = function (req, res, next) {
    var account = {
        display_name: req.body.display_name,
        phone: req.body.phone,
        address: req.body.address,
    };

    accountModel.addInfo(account, req.user.id).then(function () {
        accountModel.getAccountByUsername(req.user.username).then(user => {
            console.log(user);
        }).catch(err => {
            console.log(err);
        });
        res.redirect('/profile');
    }
    ).catch(err => {
        console.log(err);
    });
}

exports.change_password = function (req, res) {
    res.render('account/change_password', { data: '' });
}

exports.change_password_post = function (req, res) {
    var params = req.body;
    if (params.new_pasword !== params.confirm_newpass) {
        res.render('account/change_password', { data: { error: "Mật khẩu không khớp." } });
    } else if (params.new_pasword.length < 8) {
        res.render('account/change_password', { data: { error: "Mật khẩu quá ngắn - mật khẩu có ít nhất 8 kí tự." } });
    } else {
        res.redirect('/profile');
    }
}