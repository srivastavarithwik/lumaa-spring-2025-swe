const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure .env is loaded

const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    console.log("Incoming Headers:", req.headers); // Debugging log

    if (!authHeader) {
        console.error("No Authorization header found.");
        return res.status(401).json({ error: 'Token required' });
    }
    const token = authHeader.split(' ')[0]; // Extract the token
    if (!token) {
        console.error("No token found in Authorization header.");
        return res.status(401).json({ error: 'Token required' });
    }

    console.log(jwtSecret);
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.error("Invalid token:", err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }

        console.log("Token verified. User ID:", user.id); // Log successful verification
        req.user = user; // Attach user info to request
        next();
    });
}

module.exports = authenticateToken;
