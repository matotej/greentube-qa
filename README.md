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
:white_check_mark:
```gherkin
Scenario: Login should be successful
    Given User is on login form
    When User enters valid nickname for login
    And User enters valid password for login
    When User clicks on a log in button
    Then Valid user should be logged in
```
:x:
```gherkin
Scenario: Successful login with Log in automatically
    Given User is on login form
    When User enters valid nickname for login
    And User enters valid password for login
    And User click on Log in automatically
    When User clicks on a log in button
    Then Valid user should be logged in
```
:white_check_mark:
```gherkin
Scenario: Login should be unsuccessful
    Given User is on login form
    When User enters nickname "test1"
    And User enters password "test123"
    When User clicks on a Log in button
    But Login should fail
```
:x:
```gherkin
Scenario: User requests new password
    Given User is on login form
    When User click on Forgotten your password link
    Then Forgotten your password form is shown
    When User enters valid nickname for login
    And User enters valid E mail for login
    When Usser click on Send button
    Then Email with new credentials should be sent
```
### Registration

:white_check_mark:
```gherkin
Scenario: Validate that all inputs are mandatory
    Given User is on register form
    When New user clicks on the Begin Adventure button to register
    Then All inputs fields show error message
```
:white_check_mark:
```gherkin
Scenario: Validate password tooltip is shown
    Given User is on register form
    When User clicks on the password input
    Then Tooltip message should be visible
```
:white_check_mark:
```gherkin
Scenario: New user fills registration form except captcha
    Given User is on register form
    When New user enters email 'test-email-007@testdomain.com'
    And New user enters nickname 'new1Nick2User'
    And New user enters password 'abcdefghij1'
    And New user sets correct birth date
    And New user agrees with terms
    When New user clicks on the Begin Adventure button to register
    Then All inputs are validated except captcha
```
:white_check_mark:
```gherkin
Scenario: Validate error messages for invalid passwords
    Given User is on register form
    When User enters invalid "<password>"
    Then Correct "<error>" warning should be shown

    Examples:
        | password      | error                                                 |
        | abc           | Your password must be at least 10 characters long.Your password must contain at least one letter, one number or a special character.  |
        | abc1          | Your password must be at least 10 characters long.    |
        | abcdefgh1     | Your password must be at least 10 characters long.    |
        | abcdefghij    | Your password must contain at least one letter, one number or a special character.   |
```
:x:
```gherkin
Scenario: New user successfully registers
    Given User is on register form
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
For the login and registration features of the application, I would aim to automate as many edge cases as possible. My primary focus would be on field content validation for Email, Nickname, Password, and Date of Birth, as each of these inputs has multiple validation requirements. These include constraints on length, character types, value format, and uniqueness.

However, automating the entire registration process poses certain challenges in the current setup. The main obstacles are the Captcha and email confirmation steps. Similar challenges exist in the "Forgot your password" flow, which also relies on email validation. The "Log in automatically" functionality adds further complexity, as it requires verification of session persistence or cookie storage.

These obstacles may require extra effort but are manageable:
- For email handling, we could use an email provider with API access to validate confirmation flows.
- Captchas can be disabled in certain test environments or bypassed via API if allowed.
- The "Log in automatically" feature can be tested by verifying session or cookie storage through automation tools.

All these tests should be included as part of the regression testing suite. They should be executed manually on a regular basis, or at minimum, prior to each new release to ensure stability and prevent regressions in critical authentication flows.