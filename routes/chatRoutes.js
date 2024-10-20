const express = require("express");
const router = express.Router();
const schemes = require("../data/schemes");
const { generateResponse } = require("../services/geminiService");

// Endpoint to handle user queries
router.post("/ask", async (req, res) => {
    console.log("Received request at /ask:", req.body); // Log the incoming request

    const { query, schemeId } = req.body;

    if (!query || !schemeId) {
        console.log("Missing query or schemeId");
        return res.status(400).json({ message: "Query and Scheme ID are required." });
    }

    // Retrieve the selected scheme information
    const selectedScheme = schemes.find((scheme) => scheme.id === schemeId);

    if (!selectedScheme) {
        console.log("Scheme not found:", schemeId);
        return res.status(404).json({ message: "Scheme not found." });
    }

    // Prepare the prompt for Gemini API
    const prompt = `Scheme: ${selectedScheme.title}\nInformation: ${selectedScheme.text}\nUser Query: ${query}\nAnswer:`;
    console.log("Prepared prompt for Gemini API:", prompt); // Log the prepared prompt

    try {
        const response = await generateResponse(prompt);
        console.log("Generated response from Gemini API:", response); // Log the response from Gemini API
        res.json({ answer: response });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ message: "Failed to generate response." });
    }
});

module.exports = router;
