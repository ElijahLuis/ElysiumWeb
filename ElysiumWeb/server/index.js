// dependencies and variables
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// AWS imports
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');

// Initialize DynamoDB Client
const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const dynamoDb = DynamoDBDocumentClient.from(client);

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
