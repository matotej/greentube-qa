import { expect, Page } from "@playwright/test";


export default class RegistrationPage {

    private selectors = {
        registrationFormBtn: '.c-btn--primary.c-btn--header',
        modalTitle: '.c-modal__headline',
        inputParent: 'div.c-form-item__container',
        dateOfBirthParent: 'div.o-box-h--large',
        boxParent: 'div.o-box--large',
        emailInput: 'input[name="email"]',
        nicknameInput: 'input[name="nickname"]',
        passwordInput: 'input[name="password"]',
        daySelectInput: 'select[name="day"]',
        monthSelectInput: 'select[name="month"]',
        yearSelectInput: 'select[name="year"]',
        captchaIframe: 'iframe[title="reCAPTCHA"]',
        termsCheckbox: '#termsAccept',
        inputTooltip: 'div.c-form-item__tooltip',
        inputError: '.c-form-errors',
        registerBtn: 'form .c-btn--primary'
    };

    private values = {
        modalTitle: 'Registration',
        emailError: 'E-mail address required',
        nicknameError: 'Nickname required',
        passwordError: 'Password required',
        dayError: 'Please select day',
        monthError: 'Please select month',
        yearError: 'Please select year',
        captchaError: 'The security check is a required field. Please enter the code.',
        termsError: 'You must agree to our General Terms & Conditions to continue.',
        passwordLengthError: 'Your password must be at least 10 characters long.',
        passwordSpecialCharsError: 'At least one number or a special character required.',
    };

    constructor(private page: Page) { }

    // Open registration page from home page
    async navigateToRegistrationForm() {
        await this.page.locator(this.selectors.registrationFormBtn).click();
        await expect(this.page.locator(this.selectors.modalTitle)).toContainText(this.values.modalTitle);
    }

    // Enter email into email input
    async enterEmail(email: string) {
        await this.page.locator(this.selectors.emailInput).fill(email);
    }
    
    // Enter nickname into nickname input
    async enterNickname(nickname: string) {
        await this.page.locator(this.selectors.nicknameInput).fill(nickname);
    }

    // Enter password into passweord input
    async enterPassword(password: string) {
        await this.page.locator(this.selectors.passwordInput).fill(password);
    }

    // Click on Terms and Conditions
    async clickTerms() {
        await this.page.locator(this.selectors.termsCheckbox).click();
    }

    // Click registration button on the form
    async clickRegistrationButton() {
        await this.page.locator(this.selectors.registerBtn).click();
    }

    // If form is empty, validate that all error messages are shown
    async validateAllErrorMessages() {
        expect(await this.page.locator(this.selectors.inputError).count()).toBe(6);

        // Validate error messages for each input
        await this.inputErrors(this.selectors.emailInput, this.selectors.inputParent, this.values.emailError);
        await this.inputErrors(this.selectors.nicknameInput, this.selectors.inputParent, this.values.nicknameError);
        await this.validateErrorMessageForPassword();
        await this.inputErrors(this.selectors.daySelectInput, this.selectors.dateOfBirthParent, 
            [this.values.dayError, this.values.monthError, this.values.yearError]
        );
        await this.validateErrorMessageForCaptcha();
        await this.inputErrors(this.selectors.termsCheckbox, this.selectors.boxParent, this.values.termsError);
    }

    async validateErrorMessageForPassword(error: string = this.values.passwordError) {
        await this.page.waitForTimeout(1000);
        await this.inputErrors(this.selectors.passwordInput, this.selectors.inputParent, error);
    }

    async validateErrorMessageForCaptcha() {
        await this.inputErrors(this.selectors.captchaIframe, this.selectors.boxParent, this.values.captchaError);
    }

    async inputErrors(inputSelector: string, parentSelector: string, inputErrors: string | string[]) {
        const parentElt = await this.getParentElement(inputSelector, parentSelector);

        if (typeof inputErrors === 'string') {
            inputErrors = [inputErrors];
        }

        await this.page.waitForTimeout(500);

        inputErrors.forEach(async errorMsg => {
            await expect(parentElt.locator('ul')).toContainText(errorMsg);
        });

        const errors = parentElt.locator('ul');
    }

    async clickOnPasswordInput() {
        await this.page.locator(this.selectors.passwordInput).click();
    }

    async validatePasswordInputTooltip() {
        // Validate tooltip
        const parentElt = await this.getParentElement(this.selectors.passwordInput, this.selectors.inputParent);

        await expect(parentElt.locator(this.selectors.inputTooltip).filter({ visible: true })).toContainText(this.values.passwordLengthError);
        await expect(parentElt.locator(this.selectors.inputTooltip).filter({ visible: true })).toContainText(this.values.passwordSpecialCharsError);
    }

    async getParentElement(elementSelector: string, parentSelector: string) {
        return this.page.locator(parentSelector)
        .filter({
            has: this.page.locator(elementSelector)
        });
    }

    async onlyCaptchaErrorIsShown() {
        await this.page.waitForTimeout(500);
        expect(await this.page.locator(this.selectors.inputError).count()).toBe(1);

        await this.validateErrorMessageForCaptcha();
    }

    async setValidDateOfBirth(day: number = 20, month: number = 10, year: number = 2001) {
        await this.page.locator('select[name="day"]').selectOption(day.toString());
        await this.page.locator('select[name="month"]').selectOption(month.toString());
        await this.page.locator('select[name="year"]').selectOption(year.toString());
    }
}