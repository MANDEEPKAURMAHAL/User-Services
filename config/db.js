const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_services'
});

connection.connect();
module.exports.localConnect = connection;










