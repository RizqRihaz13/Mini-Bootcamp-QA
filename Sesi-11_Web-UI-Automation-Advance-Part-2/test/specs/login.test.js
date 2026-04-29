const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');
const { compareScreenshot } = require('../utilities/visual_regression.helper');

describe('Login - SauceDemo', function () {
    this.timeout(30000);

    let driver;
    let loginAction;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async function () {
        await driver.quit();
    });

    // ✅ POSITIVE CASE
    it('Login berhasil dengan credential valid', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginSuccess();

        // Visual Regression
        await compareScreenshot(driver, 'login-success');
    });

    // NEGATIVE CASE 1: INVALID USERNAME
    it('Login gagal dengan invalid username', async function () {
        await loginAction.inputUsername('invalid_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Username and password do not match');

        // Visual Regression
        await compareScreenshot(driver, 'invalid-username');
    });

    // NEGATIVE CASE 2: WRONG PASSWORD
    it('Login gagal dengan wrong password', async function () {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('wrong_password');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Username and password do not match');

        // Visual Regression
        await compareScreenshot(driver, 'wrong-password');
    });

    // NEGATIVE CASE 3: LOCKED USER
    it('Login gagal dengan user terkunci', async function () {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLogin();
        await loginAction.assertLoginFailed('Sorry, this user has been locked out');

        // Visual Regression
        await compareScreenshot(driver, 'locked-user');
    });
});