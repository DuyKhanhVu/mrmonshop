var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function getAccountByUsername(username) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM users WHERE ?', { username: username }, function (err, user) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function createAccount(account) {
    var defer = q.defer();
    var query = conn.query('INSERT INTO users SET username = ?, password = ?, email = ?, token = ?, emailValidated = 0',
        [account.username, account.password, account.email, account.token], function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
    return defer.promise;
}

function validateAccountByToken(token) {
    var defer = q.defer();
    var query = conn.query('UPDATE users SET emailValidated = true WHERE token = ?', [token],
        function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
    return defer.promise;
}

function updatePassword(username, password) {
    var defer = q.defer();
    var query = conn.query('UPDATE users SET password = ? WHERE username = ?', [password, username],
        function (err, result) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
    return defer.promise;
}

function addInfo(account,id) {
    var defer = q.defer();
    var query = conn.query('UPDATE users SET ? WHERE id = ?', [account,id],
        function (err, result) {
            if (err) {
                //console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });
    return defer.promise;
}


module.exports = {
    getAccountByUsername: getAccountByUsername,
    createAccount: createAccount,
    validateAccountByToken: validateAccountByToken,
    updatePassword: updatePassword,
    addInfo:addInfo,
}