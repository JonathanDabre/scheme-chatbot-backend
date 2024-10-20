const express = require('express');
const router = express.Router();
const schemes = require('../data/schemes');

// Endpoint to fetch all schemes
router.get('/', (req, res) => {
    res.json(schemes);
});

module.exports = router;
