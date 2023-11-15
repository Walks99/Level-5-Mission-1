# API 3. Convert "Car Value" and "Risk Rating" to a "Quote"

This API takes 2 parameters as input in JSON format that includes - the "car value" (e.g. $6,614) and "risk rating" of the driver between 1 to 5 (e.g. 5 meaning high risk). And the output is a JSON format with the suggested monthly and yearly premium for the insurance policy, such as "$50", "$614,". Here are the example specifications and business rules of conversion:

### EXAMPLE

| Input                              | Output                                        | ERROR                          |
| ---------------------------------- | --------------------------------------------- | ------------------------------ |
| { car_value: 6614; risk_rating: 5} | { monthly_premium: 27.5; yearly_premium: 330} | { error: "there is an error" } |

### BUSINESS RULES

Yearly premium is calculated by car_value multiplied by driver rating divided by 100. For example, car value of $6,614 and driver rating of 5, the yearly premium will be $6,614 \* 5 / 100 = $330. The monthly premium is the yearly premium divided by 12. So the monthly premium in this example will be $300 /12 = $27.5. If input values are not valid, return an error.

# Test Cases for calculateInsuranceQuote function

### Initial test

| Test Case | Description                         | Expected Result                                                                                                       |
| --------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| TC-001    | Calculate insurance_quote correctly | Pass: Response status is 200, contains 'insurance_quote' property, and "monthly_premium": 27.5, "yearly_premium": 330 |

### carValue Parameter Tests

| Test Case | Description                                                | Expected Result                                                      |
| --------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| TC-002    | 'car_value' parameter is a string                          | Fail: Response status is 400, contains 'error' property with message |
| TC-003    | 'car_value' parameter is null                              | Fail: Response status is 400, contains 'error' property with message |
| TC-004    | 'car_value' parameter is undefined                         | Fail: Response status is 400, contains 'error' property with message |
| TC-005    | 'car_value' parameter is false                             | Fail: Response status is 400, contains 'error' property with message |
| TC-006    | 'car_value' parameter contains non-alphabetical characters | Fail: Response status is 400, contains 'error' property with message |

### riskRating Parameter Tests

| Test Case | Description                                       | Expected Result                                                      |
| --------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| TC-007    | 'risk_rating' parameter is lower than zero        | Fail: Response status is 400, contains 'error' property with message |
| TC-008    | 'risk_rating' parameter is higher than than five  | Fail: Response status is 400, contains 'error' property with message |
| TC-009    | 'risk_rating' parameter data-type is not a number | Fail: Response status is 400, contains 'error' property with message |
