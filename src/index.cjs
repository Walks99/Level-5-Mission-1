// Import the necessary modules: express for creating the web server and bodyParser for handling request bodies
const express = require("express");
const bodyParser = require("body-parser");

// Create an instance of the express application
const app = express();

// Set the port number for the server
const port = 3000;

// Use the body-parser middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------------------------------------------------------------------------------------------------------------------
// Function to calculate the car value based on the provided model and year
function calculateCarValue(model, year) {
  try {
    // Remove spaces and convert the model to uppercase
    model = model.replace(/\s/g, "").toUpperCase();

    // Convert the characters of the model to an array, then filter and map to calculate alphabet positions
    const alphabetPositions = [...model]
      // Filter out non-alphabetic characters (keeping only A-Z)
      .filter((char) => /[A-Z]/.test(char))
      /* 
      # Map each remaining character to its alphabet position (1 for A, 2 for B, etc.)

        Let's use an example to illustrate. Consider the character 'C':

          * char.charCodeAt(0): This part retrieves the Unicode code point of the character. For 'C', the code point is 67.

          * 'A'.charCodeAt(0): This part retrieves the Unicode code point of the letter 'A', which is 65.

          * Subtracting these two values: 67 - 65 = 2. This gives the relative position of 'C' with respect to 'A'.

          * Finally, add 1: 2 + 1 = 3. This adjustment is made because in the context of this code, 'A' is considered to be at position 1, 'B' at position 2, and so on.

      So, for the character 'C', this code calculates its position in the alphabet, which is 3. This logic is applied to each character in the string, resulting in an array of positions.

      Here's the breakdown for a few characters:

          'A': (65 - 65) + 1 = 1
          'B': (66 - 65) + 1 = 2
          'C': (67 - 65) + 1 = 3
          etc...
       */
      .map((char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1);

    // Calculate the car value based on the alphabet positions, with an additional weight for the year
    const carValue =
      alphabetPositions
        // Use reduce to sum up all the alphabet positions
        .reduce((acc, position) => acc + position, 0) *
        // Multiply the sum by 100 to scale the value, then add the provided year
        100 +
      year;

    return { car_value: carValue };
  } catch (error) {
    // If any error occurs during the calculation, return an error message
    return { error: "There is an error" };
  }
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
// ------------------------------------------------------------------------------------------------------------------------
/* 
Start the server and listen on the specified port.

It's generally a good practice to avoid calling app.listen when running tests. When you use supertest to test your Express application, it creates a virtual server to handle the requests, so there's no need to start the actual server.

Here's a common pattern to handle this situation:

In your main app file (e.g., app.js), you can conditionally call app.listen only if the script is being run directly and not required as a module. This allows you to start the server when running your application but avoids starting it when running tests.
 */
if (require.main === module) {
  // Only start the server if this script is run directly (not required as a module)
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ------------------------------------------------------------------------------------------------------------------------
/*
In Node.js, the module.exports statement is used to define what a module exports, making its functionality available for use in other modules. In the context of your Express application, this line specifically exports the app instance created using Express.
 */ 
module.exports = app;
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

