import {
    Given,
    When,
    Then,
    setDefaultTimeout,
} from "@cucumber/cucumber";

import { pageFixture } from "../../hooks/pageFixture";
import RegistrationPage from "../../pages/registrationPage";

setDefaultTimeout(10 * 1000)

let registrationPage: RegistrationPage;

Given('New user clicks on the Register button', async () => {
    registrationPage = new RegistrationPage(pageFixture.page);
    await registrationPage.navigateToRegistrationForm();
});

When('New user clicks on the Begin Adventure button to register', async () => {
    await pageFixture.page.locator('form .c-btn--primary').click();
});

Then('All inputs field show error message', async () => {
    await registrationPage.validateAllErrorMessages();
});

When('New user enters email {string}', async (email: string) => {
    await registrationPage.enterEmail(email);
});

When('New user enters nickname {string}', async (nickname: string) => {
    await registrationPage.enterNickname(nickname);
});

When('New user enters password {string}', async (password: string) => {
    await registrationPage.enterPassword(password);
});

When('User enters valid email', async () => {
    await pageFixture.page.locator('[name="email"]').fill('test-email@testdomain.si');
});

When('User enters valid nickname', async () => {
    await pageFixture.page.locator('[name="nickname"]').fill('validnickname');
});

When('User enters valid password', async () => {
    await pageFixture.page.locator('[name="password"]').fill('abcdefghij123');
});

When('New user sets correct birth date', async () => {
    await registrationPage.setValidDateOfBirth();
});

Then('User confirms he is not a robot', async () => {
    await pageFixture.page.waitForTimeout(5000);
    const captchaFrame = pageFixture.page.frameLocator('iframe[title="reCAPTCHA"]');
    await captchaFrame.locator('div.rc-anchor-content').click();

    await pageFixture.page.waitForTimeout(5000);
});

When('New user agrees with terms', async () => {
    await registrationPage.clickTerms();
});

When('User clicks on the password input', async () => {
    await registrationPage.clickOnPasswordInput();
});


Then('Tooltip message should be visible', async () => {
    await registrationPage.validatePasswordInputTooltip();
});

When('User enters invalid {string}', async (password: string) => {
    await registrationPage.enterPassword(password);
});

Then('Correct {string} warning should be shown', async (error: string) => {
    await registrationPage.validateErrorMessageForPassword(error);
});

Then('All inputs are validated except captcha', async () => {
    await registrationPage.onlyCaptchaErrorIsShown();
});
