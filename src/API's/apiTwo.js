// Import the necessary modules: express for creating the web server and bodyParser for handling request bodies
const express = require("express");
const bodyParser = require("body-parser");
const calculateRiskRating = require("../functions/calculateRiskRating");

// Create an instance of the express application
const app = express();

// Use the body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------------------------------------------------------------
// Endpoint for handling POST requests to calculate the risk-rating
app.post("/calculateRiskRating", (req, res) => {
    // Extract claim_history from the request body
    const { claim_history } = req.body;

    // Validate input parameters for claim_history
    // Check for invalid characters in the claim history input
    if (/[^A-Za-z\s.,']/.test(claim_history)) {
        return res.status(400).json({ error: "Invalid characters in the 'claim history' input" });
    }

    // Check if claim_history is null, undefined, false, or an empty string
    if (claim_history === null || claim_history === undefined || claim_history === false || claim_history === "") {
        return res.status(400).json({ error: "Please provide a 'claim history' input" });
    }

    // Call the calculateRiskRating function with the provided parameters
    const result = calculateRiskRating(claim_history);

    // Send the result as a JSON response
    res.json(result);
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Export the app instance for use in other modules
module.exports = app;
