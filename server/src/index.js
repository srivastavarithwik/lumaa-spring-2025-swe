require('dotenv').config();
const express = require('express');
const app = express();
const setupDatabase = require('./setupDB'); //Bootstraps DB and Table
const authRoutes = require('./routes/auth');

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to start the server after database setup
async function startServer() {
    try {
        await setupDatabase();  // Ensure database and tables are created before server starts
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed due to DB setup error:", error);
    }
}

// Define routes
app.use('/auth', authRoutes);

// Start the server
startServer();
