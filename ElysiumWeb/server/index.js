// dependencies, variables
require('dotenv').config({ path: './.env' });
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const app = express();
const PORT = 3000;

// AWS imports
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');

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

/* CRUD Routes for UserProfiles */
// Create new profile (PUT)
app.post('/api/profiles', authenticateToken, async (req, res) => {
    const { UserID, Username, FullName, Role, Bio, ProfilePictureURL } = req.body;

    if (!UserID || !Username || !FullName || !Role) {
        return res.status(400).json({ message: 'Required info is missing.' });
    }

    try {
        await dynamoDb.send(
            new PutCommand({
                TableName: 'UserProfiles',
                Item: {
                    UserID,
                    Username,
                    FullName,
                    Role,
                    Bio: Bio || '', // Default empty bio
                    ProfilePictureURL: ProfilePictureURL || '', // Default empty picture
                    JoinDate: new Date().toISOString(),
                    LastLogin: new Date().toISOString(),
                    Status: 'Active',
                },
            })
        );

        res.status(201).json({ message: 'Profile created successfully!' });
    } catch (error) {
        console.error('Error creating profile:', error);
        res.status(500).json({ message: 'Failed to create profile' });
    }
});

// Read profile by UserID (GET)
app.get('/api/profiles/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const { Item } = await dynamoDb.send(
            new GetCommand({
                TableName: 'UserProfiles',
                Key: { UserID: id },
            })
        );

        if (!Item) {
            return res.status(404).json({ message: 'Profile not found.' });
        }

        res.status(200).json(Item);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
});

// Update profile by UserID (PUT)
app.put('/api/profiles/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { FullName, Bio, ProfilePictureURL, Role, Status } = req.body;

    try {
        await dynamoDb.send(
            new PutCommand({
                TableName: 'UserProfiles',
                Item: {
                    UserID: id,
                    ...(FullName && { FullName }),
                    ...(Bio && { Bio }),
                    ...(ProfilePictureURL && { ProfilePictureURL }),
                    ...(Role && { Role }),
                    ...(Status && { Status }),
                    LastUpdated: new Date().toISOString(),
                },
            })
        );

        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
});

// Delete profile by UserID (DELETE)
app.delete('/api/profiles/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const { Item } = await dynamoDb.send(
            new GetCommand({
                TableName: 'UserProfiles',
                Key: { UserID: id },
            })
        );

        if (!Item) {
            return res.status(404).json({ message: 'Profile not found.' });
        }
        await dynamoDb.send(
            new DeleteCommand({
                TableName: 'UserProfiles',
                Key: { UserID: id },
            })
        );

        res.status(200).json({ message: 'Profile deleted successfully!' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Failed to delete profile.' });
    }
});

// Signup route (POST)
app.post('/api/signup', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const user = await dynamoDb.send(
            new GetCommand({
                TableName: 'Users',
                Key: { email },
            })
        );

        if (user.Item) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store user in DynamoDB
        await dynamoDb.send(
            new PutCommand({
                TableName: 'Users',
                Item: {
                    email,
                    name,
                    password: hashedPassword,  // Store hashed password
                },
            })
        );

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
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
        const { Item } = await dynamoDb.send(
            new GetCommand({
                TableName: 'Users',
                Key: { email }
            })
        );

        if (!Item) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, Item.password);
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

/* Protected Routes */
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.email}!` });
});

app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({ message: `Profile of ${req.user.email}` });
});

app.get('/api/settings', authenticateToken, (req, res) => {
    res.json({ message: `Settings for ${req.user.email}` });
});


// Start server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
