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

            // Exclude the password from the response
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
            // Ensure all fields are filled in
            if (!username || !fullName || !email || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Check if the username already exists in the database
            const existingUser = await db.collection('Accounts').findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Username already taken' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);  // Log the hashed password
            
            // Create the user object
            const user = { username, fullName, email, password: hashedPassword };

            // Insert the new user into the database
            const result = await db.collection('Accounts').insertOne(user);
            console.log('Insert result:', result);  // Log the result of the insert operation

            if (result.insertedId) {
                res.status(201).json({ message: 'User created successfully', user: { username, fullName, email } });
            } else {
                console.log('Error: No insertedId in the result');
                throw new Error('Failed to create user in the database');
            }
        } catch (error) {
            console.error('Error in signup route:', error);  // Log the actual error details
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
