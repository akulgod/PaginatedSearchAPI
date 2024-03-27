// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const items = await Item.find().skip(skip).limit(limit);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        description: req.body.description
        // Add other fields as needed
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Other CRUD routes (GET by ID, PUT, DELETE) can be added similarly

module.exports = router;
