const { Pool } = require('pg');
require('dotenv').config();

// Use environment variables for database connection
const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL database successfully!'))
    .catch(err => console.error('Database connection error:', err.message));

module.exports = pool;
