# Greentube QA assignment

## Instalation

1. Clone repository and use `npm install` to install dependencies.

### UI E2E test with Gherkin

2. Go to `/src/helper/env` folder and create files `.env.prod.chrome` and `.env.prod.chrome`.
3. Open browser and navigate to `https://www.gametwist.com/en/` and register a new user.
4. Store login credentials to both `.env` files.
5. To execute tests in Chrome run `npm run cucumber-chrome` or to execute them in Firefox run `npm run cucumber-firefox`.
6. Test results are stored in `/reports` folder

> [!NOTE]
> Cucumber tests are located in `src/tests/features` folder

### Petstore Swagger API tests
2. On root of the projec create a new `.env` file.
3. Open browser and navigate to `https://petstore.swagger.io/`.
4. Click on `Authorize` button in the upper right corrner and set new `api_key`.
5. Paste key to `.env` file under key `API_KEY`.
6. To execute API test run `npx playwright test`.
7. Test results are stored in `/test-results` folder.

> [!NOTE]
> API tests are located in `tests` folder

> [!IMPORTANT]
> While working on the API test, the petstore was not working reliably.
> Especialy `GET pet by ID` and `DELETE pet` endpoints.

## Test scenarios

### Login
```gherkin
Scenario: Login should be successful :white_check_mark:
    When User enters valid nickname for login
    And User enters valid password for login
    When User clicks on a log in button
    Then Valid user should be logged in

Scenario: Login should be unsuccessful :white_check_mark:
    When User enters nickname "test1"
    And User enters password "test123"
    When User clicks on a log in button
    But Login should fail
```
### Registration
```gherkin
Scenario: Validate that all inputs are mandatory :white_check_mark:
    When New user clicks on the Begin Adventure button to register
    Then All inputs fields show error message

Scenario: Validate password tooltip is shown :white_check_mark:
    When User clicks on the password input
    Then Tooltip message should be visible

Scenario: New user fills registration form except captcha :white_check_mark:
    When New user enters email 'test-email-007@testdomain.com'
    And New user enters nickname 'new1Nick2User'
    And New user enters password 'abcdefghij1'
    And New user sets correct birth date
    And New user agrees with terms
    When New user clicks on the Begin Adventure button to register
    Then All inputs are validated except captcha

Scenario: Validate error messages for invalid passwords :white_check_mark:
    When User enters invalid "<password>"
    Then Correct "<error>" warning should be shown

    Examples:
        | password      | error                                                 |
        | abc           | Your password must be at least 10 characters long.Your password must contain at least one letter, one number or a special character.  |
        | abc1          | Your password must be at least 10 characters long.    |
        | abcdefgh1     | Your password must be at least 10 characters long.    |
        | abcdefghij    | Your password must contain at least one letter, one number or a special character.   |

Scenario: New user successfully registers :x:
    When New user enters email 'test-email-008@testdomain.com'
    And New user enters nickname 'new1Nick3User'
    And New user enters password 'abcdefghij1'
    And New user sets correct birth date
    And New user solves capthcha
    And New user agrees with terms
    When New user clicks on the Begin Adventure button to register
    Then New user should be registered
```

### Explanation
For the login and the registration part of the application I would automate all possible edge cases.
