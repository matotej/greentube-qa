Feature: Login
    Feature Login page will work depending on the user credentials.

    Background:
        Given User navigates to the application
        And User navigates to the Login form

    Scenario: Login should be successful
        When User enters valid nickname for login
        And User enters valid password for login
        When User clicks on a log in button
        Then Valid user should be logged in

    Scenario: Login should be unsuccessful
        When User enters nickname "test1"
        And User enters password "test123"
        When User clicks on a log in button
        But Login should fail