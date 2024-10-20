const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"; // Updated from your previous code

async function generateResponse(prompt) {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        const data = {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        };

        console.log("Sending request to Gemini API:", data); // Log the request data

        // Make the API request
        const response = await axios.post(GEMINI_API_URL, data, {
            headers: headers,
            params: { key: GEMINI_API_KEY },
        });

        // Extract and return the response
        const botResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("Received response from Gemini API:", botResponse); // Log the received response
        return botResponse || "Sorry, something went wrong.";
    } catch (error) {
        console.error("Error communicating with Gemini API:", error.message);
        throw new Error("Failed to generate response");
    }
}

module.exports = { generateResponse };
