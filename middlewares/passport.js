var passport = require('passport');
var LocalStratery = require('passport-local').Strategy;
var account_Model = require('../models/accountModel');
var bcrypt = require('bcrypt');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStratery({
        usernameField: 'username',
        passwordField: 'password'

    }, (username, password, done) => {
        account_Model.getAccountByUsername(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Invalid username.' })
            }
            var user = rows[0];
            
            if (bcrypt.compareSync(password, user.password)) {
                if (user.emailValidated == 1) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Email has not been validated.' });
                }
            } else {
                return done(null, false, { message: 'Invalid password.' });
            }
        }).catch(err => {
            return done(err, false);
        })
    });

    passport.use(ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });

}