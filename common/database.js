var mysql = require("mysql");

var db_config = {
    host    : "sql12.freemysqlhosting.net",
    user    : "sql12295891",
    password: "gifFLFjUwe",
    port    : "3306",
    database: "sql12295891",
}

var connection = mysql.createConnection(db_config);

connection.connect();

function getConnection(){
    if (!connection){
        connection.connect();
    }

    return connection;
}

module.exports = {
    getConnection: getConnection
}