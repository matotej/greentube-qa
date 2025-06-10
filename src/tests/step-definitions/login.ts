import {
    Given,
    When,
    Then
} from "@cucumber/cucumber";

import { pageFixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;

Given('User navigates to the application', async () => {
    await pageFixture.page.goto(process.env.BASE_URL as string);
});

When('User navigates to the Login form', async () => {
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.navigateToLoginForm();
});

When('User enters valid nickname for login', async () => {
    await loginPage.enterNickname();
});

When('User enters nickname {string}', async (nickname: string) => {
    await loginPage.enterNickname(nickname);
});

When('User enters valid password for login', async () => {
    await loginPage.enterPassword();
});

When('User enters password {string}', async (password: string) => {
    await loginPage.enterPassword(password);
});

When('User clicks on a log in button', async () => {
    await loginPage.clickLoginButton();
});

Then('Valid user should be logged in', async () => {
    await loginPage.userShouldBeLoggedIn();
});

Then('Login should fail', async () => {
    await loginPage.loginFailed();
});
