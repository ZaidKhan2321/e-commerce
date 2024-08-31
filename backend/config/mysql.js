import mysql from 'mysql2' ;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_SECRET,
    database: 'users_database'
}) ;
export default connection ;
// process.env.MYSQL_SECRET