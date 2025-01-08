const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Create Express app
    const app = express();
    app.use(cors());
    app.use(express.json());

// MongoDB connection details
    const url = 'HIDDEN';
    const dbName = 'WorkoutTracker';
    let db;

// Connect to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            console.log('Connected to MongoDB');
            db = client.db(dbName);
        })
        .catch((error) => console.error('Failed to connect to MongoDB', error));

// Define routes
//  Login
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.collection('Accounts').findOne({ username });
            if (!user) {
                return res.status(400).json({ error: 'User not found!' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            // Return user data (excluding password)
            const { password: _, ...userWithoutPassword } = user;
            res.status(200).json(userWithoutPassword);
        } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
        }
    });

//  Signup
    app.post('/signup', async (req, res) => {
        const { username, fullName, email, password } = req.body;
        try {
            console.log('Received data:', req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);
            const user = { username, fullName, email, password: hashedPassword };
            const result = await db.collection('Accounts').insertOne(user);
            console.log('Insert result:', result);
            if (result.insertedCount === 1) {
                res.status(201).json({ message: 'User created successfully' });
            } else {
                res.status(500).json({ error: 'Failed to create user', details: result });
            }
        } catch (error) {
            console.error('Error in signup route:', error);
            res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    });


// Root route
    app.get('/', (req, res) => {
        res.send('Server is running');
        console.log('Server is running...');
    });

//  Start server
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
