const express = require('express');
const router = express.Router();
const features = require('../data/features');

// Endpoint to fetch all schemes
router.get('/', (req, res) => {
    res.json(features);
});

module.exports = router;
