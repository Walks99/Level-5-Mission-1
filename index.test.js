// ------------------------------------------------------------------------------------------------------------------------------
/* 
Imports the 'supertest' library and assigns it to a variable named request. 
This variable (request) is then used in your test cases to make HTTP requests 
and perform assertions on the responses, helping you test
 the behavior of your Express.js application.
*/
const request = require("supertest");
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ------------------------------------------------------------------------------------------------------------------------------
/*
Express application index.cjs is imported and assigned to a variable called app,
allow the calculateCarFunction to be tested within the index.test.js file
*/
const app = require("./index.cjs"); // Adjust the path based on your project structure
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ##############################################################################################################################
// Describe block for the 'calculateCarValue' function tests. A describe block is used to test related test cases
describe("calculateCarValue function", () => {

  // --- TEST CASE 1 -----------------------------------------------------
  // Test case: It should calculate car value correctly
  it("should calculate car value correctly", async () => {
    // Mock data for the request
    const requestData = {
      model: "Civic",
      year: 2014,
    };

    // Make a request to the endpoint with the mock data
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Check if the response is successful and contains the expected car_value
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
    expect(response.body.car_value).toBe(6614);
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // --- TEST CASE 2 -----------------------------------------------------
  // Test case: It should handle invalid input gracefully
  it("should handle invalid input gracefully", async () => {
    // Mock data with missing 'year'
    const requestData = {
      model: "Civic",
    };

    // Make a request to the endpoint with the mock data
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Check if the response indicates invalid input
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid input");
  });
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ##############################################################################################################################
