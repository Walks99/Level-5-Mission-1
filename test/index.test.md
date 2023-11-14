# Test Cases for calculateCarValue function

## Model Parameter Tests

| Test Case | Description                                            | Expected Result                                                                      |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| TC-001    | Calculate car value correctly                          | Pass: Response status is 200, contains 'car_value' property, and 'car_value' is 6614 |
| TC-002    | 'model' parameter is an empty string                   | Fail: Response status is 400, contains 'error' property with message                 |
| TC-003    | 'model' parameter is null                              | Fail: Response status is 400, contains 'error' property with message                 |
| TC-004    | 'model' parameter is undefined                         | Fail: Response status is 400, contains 'error' property with message                 |
| TC-005    | 'model' parameter is false                             | Fail: Response status is 400, contains 'error' property with message                 |
| TC-006    | 'model' parameter contains non-alphabetical characters | Fail: Response status is 400, contains 'error' property with message                 |

## Year Parameter Tests

| Test Case | Description                                            | Expected Result                                                      |
| --------- | ------------------------------------------------------ | -------------------------------------------------------------------- |
| TC-007    | 'year' parameter is lower than the minimum valid year  | Fail: Response status is 400, contains 'error' property with message |
| TC-008    | 'year' parameter is higher than the maximum valid year | Fail: Response status is 400, contains 'error' property with message |
| TC-009    | 'year' parameter data-type is not a number             | Fail: Response status is 400, contains 'error' property with message |
