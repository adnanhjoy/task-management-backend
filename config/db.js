const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 9000,
    database: 'taskmanagement',
    password: '1234'
})

module.exports = pool