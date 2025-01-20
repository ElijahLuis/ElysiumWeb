// dependencies and variables
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;

// AWS imports
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

// Initialize DynamoDB Client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const dynamoDb = DynamoDBDocumentClient.from(client);

// Middleware
app.use(express.json());
app.use(express.static('C:/Users/elija/Projects/ElysiumWeb/client'));

// Function to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

/* API Routes */
// Basic route placeholder (GET)
app.get('/api', (req, res) => {
    res.json({ message: 'Heyo from the server! Wut it do?' });
});

// Updates route placeholder (GET)
app.get('/api/updates', (req, res) => {
    res.json({ updates: ["Test feature added", "Bug fixes and improvements"] });
});

// Signup route (POST)
app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the user already exists
        const user = await dynamoDb.send(
            new GetCommand({
                TableName: 'Users',
                Key: { email },
            })
        );

        if (user.Item) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in DynamoDB
        await dynamoDb.send(
            new PutCommand({
                TableName: 'Users',
                Item: {
                    email,
                    name,
                    password: hashedPassword,
                },
            })
        );

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        // Detailed error logging for debugging
        console.error('Error during signup:', error.message);  // Log the error message
        console.error('Stack trace:', error.stack);  // Log the stack trace for better context
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route (POST)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // Retrieve user from DynamoDB
        const user = await dynamoDb.get({
            TableName: 'Users',
            Key: { email },
        });

        if (!user.Item) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.Item.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route placeholder
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}!` });
});


// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
