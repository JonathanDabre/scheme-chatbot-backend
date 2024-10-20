const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors module
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Allow only requests from your React frontend
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow only specific headers
    optionsSuccessStatus: 200 // Some legacy browsers choke on status 204, so use 200 instead
};

// Middleware to enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use chat routes
app.use('/api/chat', chatRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
