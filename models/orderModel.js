var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function CreateOrder(entity) {
    var defer = q.defer();
    var query = conn.query('INSERT INTO orders SET ?',
        entity, function (err, value) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(value.insertId);
            }
        });
    return defer.promise;
}
function CreateOrderDetail(entity) {
    var defer = q.defer();
    var query = conn.query('INSERT INTO orders_detail SET ?',
        entity, function (err, value) {
            if (err) {
                console.log(err);
                defer.reject(err);
            } else {
                defer.resolve(value.insertId);
            }
        });
    return defer.promise;
}

module.exports = {
    CreateOrder: CreateOrder,
    CreateOrderDetail: CreateOrderDetail,   
}