const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SchoolCoreAPI',
    password: 'postgres', 
    port: 5432,
});

pool.connect();

module.exports = pool;