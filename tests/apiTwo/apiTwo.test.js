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
Express application 'apiTwo.js' is imported and assigned to a variable called app,
allows the calculateRiskRating function to be tested within the apiTwo.test.js file
*/
const app = require("../../src/API's/apiTwo"); // Adjust the path based on your project structure
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ##############################################################################################################################
describe("calculateRiskRating", () => {
  // --- TEST CASE 1 -----------------------------------------------------
  it("Should calculate the risk rating correctly", async () => {
    // Arrange
    const requestData = {
      claim_history:
        "I have crashed on the motorway. Collided into a dairy. Scratched a Ferrari",
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("risk_rating");
    expect(response.body.risk_rating).toBe(3);
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 2 -----------------------------------------------------
  it("Should return an error when the claim_history parameter is passed an empty string", async () => {
    // Arrange
    const requestData = {
      claim_history: "",
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'claim history' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 3 -----------------------------------------------------
  it("Should return an error when the claim_history parameter is passed and argument of null", async () => {
    // Arrange
    const requestData = {
      claim_history: null,
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'claim history' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 4 -----------------------------------------------------
  it("Should return an error when the claim_history parameter is passed and argument of undefined", async () => {
    // Arrange
    const requestData = {
      claim_history: undefined,
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'claim history' input"
    );
  });
  // --- TEST CASE 5 -----------------------------------------------------
  it("Should return an error when the claim_history parameter is passed and argument of false", async () => {
    // Arrange
    const requestData = {
      claim_history: false,
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Please provide a 'claim history' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --- TEST CASE 6 -----------------------------------------------------
  it("Should return an error when the claim_history parameter is passed an argument containing non-alphabetical characters", async () => {
    // Arrange
    const requestData = {
      claim_history: "I have crashed on the motorway.^ Collided into a dairy. Scratched a Ferrari",
    };

    // Act
    const response = await request(app)
      .post("/calculateRiskRating")
      .send(requestData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Invalid characters in the 'claim history' input"
    );
  });
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
});
// ##############################################################################################################################
