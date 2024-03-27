// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { port, mongoURI } = require('./config/config');
const itemRouter = require('./routes/items');

const app = express();

app.use(bodyParser.json());
app.use('/items', itemRouter);

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });
