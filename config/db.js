const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'taskmanagement',
    password: '1234'
})

module.exports = pool