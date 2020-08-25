var sql = require("mssql");
var connect = function()
{
    var config = {
        user: 'dbUser',
        password: 'dbPass',
        server: 'dbServer',
        database: 'Db name',
        "options": {
            "encrypt": true,
            "enableArithAbort": true
            },
       
    };
    

    return conn;
};

module.exports = connect;