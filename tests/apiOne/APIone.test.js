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
Express application 'apiOne.js' is imported and assigned to a variable called app,
allow the calculateCarValue Function to be tested within the apiOne.test.js file
*/
const app = require("../../src/API's/apiOne"); // Adjust the path based on your project structure
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ##############################################################################################################################
// Describe block for the 'calculateCarValue' function tests. A describe block is used to test related test cases
describe("calculateCarValue function", () => {
  // --- INITIAL TEST CASE -----------------------------------------------------
  // Test case: It should calculate car value correctly
  it("should calculate car value correctly", async () => {
    // Arrange
    const requestData = {
      model: "Civic",
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("car_value");
    expect(response.body.car_value).toBe(6614);
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // EDGE CASES FOR INPUT: MODEL
  // --- TEST CASE 1 -----------------------------------------------------
  it("should return an error when the 'model' parameter is an empty string ", async () => {
    // Arrange
    const requestData = {
      model: "",
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'model' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 2 -----------------------------------------------------
  it("should return an error when the 'model' parameter is null", async () => {
    // Arrange
    const requestData = {
      model: null,
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'model' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 3 -----------------------------------------------------
  it("should return an error when the 'model' parameter is undefined", async () => {
    // Arrange
    const requestData = {
      model: undefined,
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'model' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 4 -----------------------------------------------------
  it("should return an error when the 'model' parameter is false", async () => {
    // Arrange
    const requestData = {
      model: false,
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'model' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 5 -----------------------------------------------------
  it("should return an error when the 'model' parameter contains non-alphabetical characters", async () => {
    // Arrange
    const requestData = {
      model: "!@#$%^&*()_-+=<>,.?/:;'{[}]|`~123456789",
      year: 2014,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Non-alphabetic characters cannot be used in the 'model' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // EDGE CASES FOR INPUT: YEAR
  // --- TEST CASE 1 -----------------------------------------------------
  it("should return an error when the 'year' parameter contains a value lower than the minimum possible valid year", async () => {
    // Arrange
    const requestData = {
      model: "Civic",
      year: 1899,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "'Year' must be 1900 and above"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 2 -----------------------------------------------------
  it("should return an error when the 'year' parameter contains a value heigher than the maximum possible valid year", async () => {
    // Arrange
    const requestData = {
      model: "Civic",
      year: 2024,
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "'Year' must be 2023 and below"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 3 -----------------------------------------------------
  it("should return an error when the data-type of 'year' parameter is not a number", async () => {
    // Arrange
    const requestData = {
      model: "Civic",
      year: "2019",
    };

    // Act
    const response = await request(app)
      .post("/calculateCarValue")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "'Year' must be typeof number"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
});
// ##############################################################################################################################
