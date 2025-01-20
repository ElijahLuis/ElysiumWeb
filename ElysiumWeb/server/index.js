// dependencies and variables
require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const path = require('path'); // Import path module
const app = express();
const PORT = 3000;
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Users';

// AWS SDK Config
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Tell Express to parse incoming reqs as JSON
app.use(express.json());

// Serve static files from client folder
app.use(express.static('C:/Users/elija/Projects/ElysiumWeb/client'));

// Basic API route placeholder
 app.get('/api', (req, res) => {
    res.json({ message: 'Heyo from the server! Wut it do?' });
}); 

// API Updates route placeholder
app.get('/api/updates', (req, res) => {
    res.json({ updates: ["Test feature added", "Bug fixes and improvements"] });
});


// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
