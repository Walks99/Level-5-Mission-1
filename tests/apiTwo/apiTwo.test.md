# API 2. Convert "Claim History" to a "Risk Rating"

This API takes 1 parameters as input in JSON format that has a text field describing the claim history in the last 3 years of a driver requesting for a quote. The output is a JSON format with the suggested rating of the driver from 1 to 5, 5 being a high risk driver and 1 being a low risk driver. Here are the example specifications and business rules of conversion:

### EXAMPLE

| Input                                                                                                                                 | Output             | ERROR                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------ |
| { claim_history: "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." } | { risk_rating: 3 } | { error: "there is an error" } |

### BUSINESS RULES

Risk rating is calculated by counting the number of occurrences of a list of keywords. Each occurrence (regardless of whether they are repeats) will add 1 to the risk rating. The keyword list is "collide", "crash", "scratch", "bump", "", and "smash". For example, "My only claim was a crash into my house's garage door that left a scratch on my car. There are no other crashes." returns a rating of 3 (counting the underlined letters). If input value is not valid, return an error.

# Test Cases for calculateRiskingRating function

### Initial test

| Test Case | Description                                            | Expected Result                                               |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| TC-001    | Calculates risk rating correctly                              | Pass: Response status is 200, contains 'risking_rating' property, provides a risk_rating between 1 - 5 |

### claimHistory Parameter Tests

| Test Case | Description                                                   | Expected Result                                                                          |
| --------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| TC-002    | 'claimHistory' parameter is an empty string                   | Fail: Response status is 400, contains 'error' property with message                     |
| TC-003    | 'claimHistory' parameter is null                              | Fail: Response status is 400, contains 'error' property with message                     |
| TC-004    | 'claimHistory' parameter is undefined                         | Fail: Response status is 400, contains 'error' property with message                     |
| TC-005    | 'claimHistory' parameter is false                             | Fail: Response status is 400, contains 'error' property with message                     |
| TC-006    | 'claimHistory' parameter contains non-alphabetical characters | Fail: Response status is 400, contains 'error' property with message                     |
