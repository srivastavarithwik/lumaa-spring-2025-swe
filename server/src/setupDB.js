const { Pool } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
};

// Connect to PostgreSQL **without specifying a database**
const rootPool = new Pool(dbConfig);
const databaseName = process.env.DATABASE_NAME;

// Function to create the database if it doesn't exist
async function createDatabase() {
    try {
        const checkDb = await rootPool.query(`SELECT datname FROM pg_database WHERE datname = $1`, [databaseName]);
        if (checkDb.rows.length === 0) {
            console.log(`Database "${databaseName}" not found. Creating...`);
            await rootPool.query(`CREATE DATABASE ${databaseName}`);
            console.log(`Database "${databaseName}" created successfully!`);
        } else {
            console.log(`Database "${databaseName}" already exists.`);
        }
    } catch (error) {
        console.error('Error creating database:', error.message);
        throw error;
    }
}

// Now, connect to the newly created database
const dbPool = new Pool({
    ...dbConfig,
    database: databaseName
});

// Function to create tables if they don't exist
async function createTables() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    const createTasksTable = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            "isComplete" BOOLEAN DEFAULT FALSE,
            "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    try {
        await dbPool.query(createUsersTable);
        console.log("Users table is ready!");

        await dbPool.query(createTasksTable);
        console.log("Tasks table is ready!");
    } catch (error) {
        console.error("Error creating tables:", error.message);
        throw error;
    }
}

// Main function to initialize database and tables
async function setupDatabase() {
    await createDatabase();
    await createTables();
}

module.exports = setupDatabase;
