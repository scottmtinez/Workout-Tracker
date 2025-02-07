const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Create Express app
    const app = express();
    app.use(cors());
    app.use(express.json());

// MongoDB connection details
    const mongoUrl = 'mongodb+srv://scottmtinez:Daisy77sxp@workouttrackercluster.h0dvi.mongodb.net/WorkoutTracker?retryWrites=true&w=majority';
    const dbName = 'WorkoutTracker';
    let db;

// Connect to MongoDB using MongoClient
    MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            console.log('Connected to MongoDB');
            db = client.db(dbName);
        })
        .catch((error) => {
            console.error('Failed to connect to MongoDB:', error.message);
            process.exit(1); // Exit the application if connection fails
        });

// Connect to MongoDB using Mongoose
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Mongoose connected to MongoDB'))
        .catch((error) => {
            console.error('Failed to connect Mongoose to MongoDB:', error.message);
            process.exit(1); // Exit the application if connection fails
        });

// Login Route
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

            // Exclude password from response
            const { password: _, ...userWithoutPassword } = user;
            res.status(200).json(userWithoutPassword);
        } catch (error) {
            console.error('Error in login route:', error);
            res.status(500).json({ error: 'Failed to login' });
        }
    });

// Signup Route
    app.post('/signup', async (req, res) => {
        const { username, fullName, email, password } = req.body;

        try {
            // Validate input
                if (!username || !fullName || !email || !password) {
                    return res.status(400).json({ error: 'All fields are required' });
                }

            // Check for existing user
                const existingUser = await db.collection('Accounts').findOne({ username });
                if (existingUser) {
                    return res.status(400).json({ error: 'Username already taken' });
                }

            // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

            // Create user object
                const user = { username, fullName, email, password: hashedPassword };

            // Save user to database
                const result = await db.collection('Accounts').insertOne(user);
                if (result.insertedId) {
                    res.status(201).json({ message: 'User created successfully', user: { username, fullName, email } });
                } else {
                    throw new Error('Failed to create user in the database');
                }
        } catch (error) {
            console.error('Error in signup route:', error.message);
            res.status(500).json({ error: 'Failed to create user', details: error.message });
        }
    });

    // User Info Schema --- Add height, weight, bmi, and age fields
    // Define the user schema
        const userSchema = new mongoose.Schema({
            username: { type: String, required: true, unique: true },
            fullName: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            height: { type: String, required: true },
            weight: { type: String, required: true },
            bmi: { type: Number, default: 0 },
            age: { type: String, required: true },
        }, { timestamps: true });
        
        const UserInfo = mongoose.model('UserInfo', userSchema);
        
        module.exports = UserInfo;

    // Fetch User Info
    // NOTE: This route is not complete. You need to add the logic to fetch user info from the database

        
    // Workout Schema
        const workoutSchema = new mongoose.Schema({
            username: { type: String, required: true },  // Add username to associate workout with a user
            id: { type: Number, required: true },
            elapsedTime: { type: Number, required: true },
            startTime: { type: Date },
            endTime: { type: Date },
            exercises: [
                {
                    name: { type: String, required: true },
                    weight: { type: Number },
                    reps: { type: Number },
                    sets: [
                        {
                            weight: { type: Number },
                            reps: { type: Number },
                        },
                    ],
                },
            ],
        });

        const Workout = mongoose.model('Workout', workoutSchema);

// Save Workout Data
    app.post('/workouts', async (req, res) => {
        const { username, id, elapsedTime, startTime, endTime, exercises } = req.body;

        try {
            const workout = new Workout({
                username,
                id,
                elapsedTime,
                startTime,
                endTime,
                exercises,
            });

            const savedWorkout = await workout.save();
            res.status(201).json(savedWorkout);  // Respond with the saved workout
        } catch (error) {
            console.error('Error saving workout data:', error.message);
            res.status(500).json({ error: 'Failed to save workout data' });
        }
    });

// Fetch All Workouts for a User
    app.get('/workouts', async (req, res) => {
        const { username } = req.query;  // Username sent as a query parameter

        try {
            const workouts = await Workout.find({ username });
            res.status(200).json(workouts);
        } catch (error) {
            console.error('Error fetching workouts:', error.message);
            res.status(500).json({ error: 'Failed to fetch workouts' });
        }
    });

// Save Exercises Route
    app.post('/exercises', async (req, res) => {
        const { exercises } = req.body;

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty exercises array' });
        }

        try {
            // Assuming you're saving it to MongoDB
                const result = await db.collection('Exercises').insertMany(exercises);
                res.status(201).json({ message: 'Exercises saved successfully', result });

        } catch (error) {
            console.error('Error saving exercises:', error.message);
            res.status(500).json({ error: 'Failed to save exercises' });
        }
    });

// Fetch all exercises from the Exercises collection
    app.get('/exercises', async (req, res) => {
        try {
            const exercises = await db.collection('Exercises').find({}).toArray();
            res.status(200).json(exercises);
        } catch (error) {
            console.error('Error fetching exercises:', error.message);
            res.status(500).json({ error: 'Failed to fetch exercises' });
        }
    });

// Define User Schema and Model
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        access: { type: String, required: true }, // Added access field
    });

    const User = mongoose.model('User', UserSchema, 'Accounts'); // Third argument specifies the collection name

// Fetch user count
    app.get('/count', async (req, res) => {
        try {
            const userCount = await User.countDocuments(); // Count all users
            res.status(200).json({ count: userCount });
        } catch (error) {
            console.error('Failed to fetch user count:', error.message);
            res.status(500).json({ error: 'Failed to fetch user count' });
        }
    });

// Fetch List of Recent workouts and time of workout


// Fetch Users Workouts Overview


// Fetch Exercises that want to be added to ExerciseDB

        // Add Exercise to ExerciseDB

        // Reject Exercise request

// Fetch Blog posts that want to be posted to BlogDB
// Define Blog post Schema
    const postSchema = new mongoose.Schema({
        username: { type: String, required: true },
        content: String,
        comments: [
        {
            username: String,
            content: String,
            timestamp: { type: Date, default: Date.now },
        },
        ],
    });

    const Post = mongoose.model('Post', postSchema);

    app.get('/posts', async (req, res) => {
        try {
          const posts = await Post.find().sort({ date: -1 }); // Sort by most recent
          res.json(posts);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch posts' });
        }
      });
      
    // Add a new post
        app.post('/posts', async (req, res) => {
            try {
            const { username, content } = req.body;
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }
            const newPost = new Post({ username, content });
            await newPost.save();
            res.status(201).json(newPost);
            } catch (error) {
            res.status(500).json({ message: 'Error creating post' });
            }
        });

    // Add a comment to a post
        app.post('/posts/:id/comment', async (req, res) => {
            try {
            const { username, content } = req.body;
            if (!username || !content) {
                return res.status(400).json({ message: 'Username and content are required' });
            }
        
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
        
            post.comments.push({ username, content });
            await post.save();
        
            res.status(200).json(post);
            } catch (error) {
            res.status(500).json({ message: 'Error adding comment' });
            }
        });
  
    // Delete a post
        app.delete('/posts/:id', async (req, res) => {
            try {
                const { id } = req.params;
                await Post.findByIdAndDelete(id);
                res.status(200).json({ message: 'Post deleted successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete post' });
            }
        });

    // Reject Blog post request

// Fetch 

// Root Route
    app.get('/', (req, res) => {
        res.send('Server is running');
        console.log('Root route accessed');
    });

// Start the Server
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
