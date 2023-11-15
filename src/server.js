// Import the necessary modules:
const express = require('express'); 
const apiOne = require("./API's/apiOne");
const apiTwo = require("./API's/apiTwo");
const apiThree = require("./API's/apiThree");

// Create an instance of the express application
const server = express();

server.use('/api/one', apiOne); // Mount apiOne at the /api/one path
server.use('/api/two', apiTwo); // Mount apiTwo at the /api/two path
server.use('/api/three', apiThree); // Mount apiThree at the /api/three path

// // Set the port number for the server
const port = 3000;

// Start the Express application

if (require.main === module) {
    // Only start the server if this script is run directly (not required as a module)
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }



