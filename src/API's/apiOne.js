// Import the necessary modules: express for creating the web server and bodyParser for handling request bodies
const express = require("express");
const bodyParser = require("body-parser");
const calculateCarValue = require("../functions/calculateCarValue");

// Create an instance of the express application
const app = express();

// Use the body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------------------------------------------------------------
// Endpoint for handling POST requests to calculate the car value
app.post("/calculateCarValue", (req, res) => {
    // Extract model and year from the request body
    const { model, year } = req.body;
  
    // Validate input parameters
    // if (!model || !year || typeof year !== "number") {
    //   return res.status(400).json({ error: "Invalid input" });
    // }
  
    // CONDITIONS FOR INPUT: MODEL
    if (/[^A-Z]/i.test(model)) {
      return res.status(400).json({ error: "Non-alphabetic characters cannot be used in the 'model' input" });
    }
  
    if ((model === null || model === undefined || model === false || model === "") && year) {
      return res.status(400).json({ error: "Please provide a 'model' input" });
    }
    
    // CONDITIONS FOR INPUT: YEAR
    if (model && typeof year !== 'number') {
      return res.status(400).json({ error: "'Year' must be typeof number" });
    }
  
    if (model && year < 1900) {
      return res.status(400).json({ error: "'Year' must be 1900 and above" });
    }
  
    if(model && year > 2023) {
      return res.status(400).json({error: "'Year' must be 2023 and below"});
    } 
  
    // Call the calculateCarValue function with the provided parameters
    const result = calculateCarValue(model, year);
  
    // Send the result as a JSON response
    res.json(result);
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  module.exports = app;