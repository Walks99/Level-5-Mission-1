# API 1. Convert "Model" and "Year" of a car to a suggested "Car Value"

This API takes 2 parameters as input in JSON format that includes - the "model" (e.g. "Civic") and a numeric "year" of a car (e.g. 2014).  And the output is a JSON format with the suggested value for the car, such as "$6,614".  Here are the example specifications and business rules of conversion:

### EXAMPLE

| Input | Output | Error output |
| --- | --- | --- |
| { model: "Civic"; year: 2014 } | { car_value: 6614 } | { error: "there is an error" } |


### BUSINESS RULES

Car_value is calculated by adding up the positions of alphabets of the letters in the name, times a hundred, and add the year value.  Position of alphabet means the letter in the order of alphabets (e.g. A is the first letter, so it is 1.  Z is the last letter, so it is 26).  Space and any other signs are ignored.   For example, a "Civic" in year 2014 will be worth (3 + 9 + 22 + 9 + 3) * 100 + 2014 = $6,614.  If input values are not valid, return an error.

# Test Cases for calculateCarValue function

### Initial test

| Test Case | Description                                            | Expected Result                                               |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| TC-001    | Calculate car value correctly                          | Pass: Response status is 200, contains 'car_value' property, and 'car_value' is 6614 |

### Model Parameter Tests

| Test Case | Description                                            | Expected Result                                               |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| TC-002    | 'model' parameter is an empty string                   | Fail: Response status is 400, contains 'error' property with message                 |
| TC-003    | 'model' parameter is null                              | Fail: Response status is 400, contains 'error' property with message                 |
| TC-004    | 'model' parameter is undefined                         | Fail: Response status is 400, contains 'error' property with message                 |
| TC-005    | 'model' parameter is false                             | Fail: Response status is 400, contains 'error' property with message                 |
| TC-006    | 'model' parameter contains non-alphabetical characters | Fail: Response status is 400, contains 'error' property with message                 |

### Year Parameter Tests

| Test Case | Description                                            | Expected Result                                                      |
| --------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| TC-007    | 'year' parameter is lower than the minimum valid year  | Fail: Response status is 400, contains 'error' property with message |
| TC-008    | 'year' parameter is higher than the maximum valid year | Fail: Response status is 400, contains 'error' property with message |
| TC-009    | 'year' parameter data-type is not a number             | Fail: Response status is 400, contains 'error' property with message |
