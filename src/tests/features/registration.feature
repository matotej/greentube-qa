Feature: Registration
     Feature Registration page will work depending on the correct user data.

    Background:
        Given User navigates to the application
        And New user clicks on the Register button

    Scenario: Validate that all inputs are mandatory
        When New user clicks on the Begin Adventure button to register
        Then All inputs fields show error message

    Scenario: Validate password tooltip is shown
        When User clicks on the password input
        Then Tooltip message should be visible

    Scenario: New user fills registration form except captcha
        When New user enters email 'test-email-007@testdomain.com'
        And New user enters nickname 'new1Nick2User'
        And New user enters password 'abcdefghij1'
        And New user sets correct birth date
        And New user agrees with terms
        When New user clicks on the Begin Adventure button to register
        Then All inputs are validated except captcha

    Scenario: Validate error messages for invalid passwords
        When User enters invalid "<password>"
        Then Correct "<error>" warning should be shown

        Examples:
            | password      | error                                                 |
            | abc           | Your password must be at least 10 characters long.Your password must contain at least one letter, one number or a special character.  |
            | abc1          | Your password must be at least 10 characters long.    |
            | abcdefgh1     | Your password must be at least 10 characters long.    |
            | abcdefghij    | Your password must contain at least one letter, one number or a special character.   |