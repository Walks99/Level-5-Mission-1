// Import the necessary modules: express for creating the web server and bodyParser for handling request bodies
const express = require("express");
const bodyParser = require("body-parser");
const calculateInsuranceQuote = require("../functions/calculateInsuranceQuote");

// Create an instance of the express application
const app = express();

// Use the body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ------------------------------------------------------------------------------------------------------------------------

// Endpoint for handling POST requests to calculate the insurance_quote
app.post("/calculateInsuranceQuote", (req, res) => {
    // Extract car_value and risk_rating from the request body
    const { car_value, risk_rating } = req.body;

    // Call the calculateInsuranceQuote function with the provided parameters
    const result = calculateInsuranceQuote(car_value, risk_rating);

    // Send the result as a JSON response
    res.json(result);
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Export the app instance for use in other modules
module.exports = app;