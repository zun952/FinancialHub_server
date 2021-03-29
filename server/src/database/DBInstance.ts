import mariadb from 'mariadb';
const config = require('./dbconfig');

const pool = mariadb.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.user,
    database: config.database,
    connectionLimit: 5
});

const dbHelper = (): any => {

}

module.exports = dbHelper();