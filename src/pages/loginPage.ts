import { expect, Page } from "@playwright/test";


export default class LoginPage {

    private selectors = {
        loginFormBtn: '.c-btn--secondary',
        modalTitle: '.c-modal__headline',
        nicknameInput: '#username',
        passwordInput: '#password',
        loginBtn: 'button.js-confirmLoginModal',
    }

    private values = {
        modalTitle: 'Login',
    };

    constructor(private page: Page) { }

    async navigateToLoginForm() {
        await this.page.locator(this.selectors.loginFormBtn).click();
        await expect(this.page.locator(this.selectors.modalTitle)).toContainText(this.values.modalTitle);
    }

    async enterNickname(nickname: string = process.env.VALID_NICKNAME as string) {
        await this.page.locator('#username').fill(nickname);
    }

    async enterPassword(password: string = process.env.VALID_PASSWORD as string) {
        await this.page.locator('#password').fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(this.selectors.loginBtn).click();
    }

    async userShouldBeLoggedIn(nickname: string = process.env.VALID_NICKNAME as string) {
        // Wait for the response to get the user data
        await this.page.waitForResponse('https://www.gametwist.com/nrgs/en/api/userstate-v1');
        await expect(this.page.locator('div.c-bar-status__username')).toContainText(process.env.VALID_NICKNAME as string);
    }

    async loginFailed() {
        await expect(this.page.locator('.c-form-errors')).toContainText('Incorrect nickname/password combination.');
    }

}