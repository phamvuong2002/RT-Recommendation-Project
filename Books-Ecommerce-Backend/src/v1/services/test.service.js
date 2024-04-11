const mysql = require('mysql2/promise');
const {bookDB_master} = require('../services/dbpool.service');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'vuong',
    database: 'gravity_books'
});
const {executeQuery, executeWithConnection} = require('../helpers/database.mysql.helper');

const getBooks = async () => {
    const query = 'SELECT * FROM book Limit 10';
    // const books = await executeQuery({pool, procedureName});
    const [results, fields, rows] = await bookDB_master.query(query);
    
    return results
}

module.exports = {getBooks};