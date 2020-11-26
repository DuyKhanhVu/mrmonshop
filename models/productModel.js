var db = require("../common/database");

var conn = db.getConnection();

var q = require("q");

function getAllProducts() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products', function (err, products) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(products);
        }
    });
    return defer.promise;
}

function getProductsByProductType(products_type) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products WHERE ?',{products_type : products_type}, function (err, products) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(products);
        }
    });
    return defer.promise;
}

function getProductsById(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products WHERE ?',{id : id}, function (err, products) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(products);
        }
    });
    return defer.promise;
}

function getAllProductsType() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products_type', function (err, products_type) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(products_type);
        }
    });
    return defer.promise;
}

function getProductsTypeById(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM products_type WHERE ?',{id : id}, function (err, product_type) {
        if (err) {
            console.log(err);
            defer.reject(err);
        } else {
            defer.resolve(product_type);
        }
    });
    return defer.promise;
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductsByProductType: getProductsByProductType,
    getProductsById : getProductsById,
    
}