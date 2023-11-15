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
Express application 'apiThree.js' is imported and assigned to a variable called app,
allows the calculateInsuranceQuote function to be tested within the apiThree.test.js file
*/
const app = require("../../src/API's/apiThree"); // Adjust the path based on your project structure
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// ##############################################################################################################################
describe("calculateInsuranceQuote", () => {
  it("Should calculate the insurance quote correctly", async () => {
    // Arrange
    const requestData = {
      car_value: 6614,
      risk_rating: 3,
    };
    // Act
    const response = await request(app)
      .post("/calculateInsuranceQuote")
      .send(requestData);
    // Assert
        
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("insurance_quote");
    expect(response.body.insurance_quote).toEqual({
      yearly_premium: 198.42,
      monthly_premium: 16.54,
    });
  });

  it.todo(
    "Should return and error when the car_value paramter is passed an empty string"
  );
  it.todo(
    "Should return and error when the car_value paramter is passed a null value"
  );
  it.todo(
    "Should return and error when the car_value paramter is passed an undefined value"
  );
  it.todo(
    "Should return and error when the car_value paramter is passed a false value"
  );
});
// ##############################################################################################################################
