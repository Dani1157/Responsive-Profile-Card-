require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/likesDB';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on fatal error
});

// Like Schema
const likeSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    item_id: { type: Number, required: true },
});

const Like = mongoose.model('Like', likeSchema);

// --- Input Validation Middleware ---
const validateLike = [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('item_id').isInt().withMessage('Item ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Endpoint to like/unlike an item
app.post('/like', validateLike, async (req, res) => {
    const { user_id, item_id } = req.body;

    try {
        // Check if the user already liked this item
        const existingLike = await Like.findOne({ user_id, item_id });

        if (existingLike) {
            // User already liked, remove the like
            await Like.deleteOne({ user_id, item_id });
            return res.status(200).send({ message: 'Unliked' });
        } else {
            // Add a new like
            const like = new Like({ user_id, item_id });
            await like.save();
            return res.status(200).send({ message: 'Liked' });
        }
    } catch (error) {
        console.error('Error processing like/unlike:', error);
        return res.status(500).send({ error: 'Error processing your request' });
    }
});

// Endpoint to get the like count for a specific item
app.get('/likes/:item_id', async (req, res) => {
    const { item_id } = req.params;

    if (!/^\d+$/.test(item_id)) {
        return res.status(400).send({ error: 'Item ID must be an integer' });
    }

    try {
        const count = await Like.countDocuments({ item_id });
        return res.status(200).send({ like_count: count });
    } catch (error) {
        console.error('Error fetching likes:', error);
        return res.status(500).send({ error: 'Error fetching likes' });
    }
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Endpoint to get users who liked a specific item
app.get('/likes/users/:item_id', async (req, res) => {
    const { item_id } = req.params;

    if (!/^\d+$/.test(item_id)) {
        return res.status(400).send({ error: 'Item ID must be an integer' });
    }

    try {
        // Find all likes for the specified item_id
        const likes = await Like.find({ item_id }).select('user_id');

        // Extract user IDs from likes
        const user_ids = likes.map(like => like.user_id);
        
        return res.status(200).send({ user_ids });
    } catch (error) {
        console.error('Error fetching likes:', error);
        return res.status(500).send({ error: 'Error fetching likes' });
    }
});