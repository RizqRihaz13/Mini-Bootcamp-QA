const assert = require('assert');
const LoginPage = require('../pageobjects/login.page');

class LoginAction {
    constructor(driver) {
        this.driver = driver;
    }

    async openLoginPage(url) {
        await this.driver.get(url);
    }

    async inputUsername(username) {
        await this.driver.findElement(LoginPage.usernameInput).sendKeys(username);
    }

    async inputPassword(password) {
        await this.driver.findElement(LoginPage.passwordInput).sendKeys(password);
    }

    async clickLogin() {
        await this.driver.findElement(LoginPage.loginButton).click();
    }

    async assertLoginSuccess() {
        const title = await this.driver.findElement(LoginPage.pageTitle).getText();
        assert.strictEqual(title, 'Products');
    }

    async assertLoginFailed(expectedMessage) {
        const error = await this.driver.findElement(LoginPage.errorMessage).getText();
        assert.ok(error.includes(expectedMessage));
    }
}

module.exports = LoginAction;