// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection string
const mongoURI = 'mongodb://root:root@ac-zyeglkd-shard-00-00.msmb4pd.mongodb.net:27017,ac-zyeglkd-shard-00-01.msmb4pd.mongodb.net:27017,ac-zyeglkd-shard-00-02.msmb4pd.mongodb.net:27017/?replicaSet=atlas-wsjq1o-shard-0&ssl=true&authSource=admin';

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a Task schema
const Task = mongoose.model('Task', {
    title: String,
    description: String,
});

// Middleware
app.use(bodyParser.json());

// Routes
// Create a task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//hello worls

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
