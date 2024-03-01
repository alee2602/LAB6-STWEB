import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    port: 3306,
    user: 'grammy_winner',
    database: 'blog_db',
    password: 'grammys2024',
})


export default pool

