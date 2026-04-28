const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

describe('Login - SauceDemo', function () {
    this.timeout(30000);

    let driver;

    // 🔹 Hook: dijalankan sekali sebelum semua test
    before(function () {
        console.log('=== START TEST LOGIN SAUCEDEMO ===');
    });

    // 🔹 Hook: dijalankan sebelum setiap test
    beforeEach(async function () {
        let options = new chrome.Options();
        options.addArguments('--headless');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // 🔹 Hook: dijalankan setelah setiap test
    afterEach(async function () {
        await driver.quit();
    });

    // 🔹 Hook: dijalankan sekali setelah semua test
    after(function () {
        console.log('=== END TEST LOGIN SAUCEDEMO ===');
    });

    // TEST 1: LOGIN SUKSES
    it('Login berhasil dengan credential valid', async function () {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        await driver.wait(until.elementLocated(By.className('title')), 5000);

        const title = await driver.findElement(By.className('title')).getText();
        assert.strictEqual(title, 'Products');
    });

    // TEST 2: PASSWORD SALAH
    it('Login gagal dengan password salah', async function () {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('salah');
        await driver.findElement(By.id('login-button')).click();

        const error = await driver.findElement(By.css('[data-test="error"]')).getText();
        assert.ok(error.includes('Username and password do not match'));
    });

    // TEST 3: USERNAME KOSONG
    it('Login gagal tanpa username', async function () {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        const error = await driver.findElement(By.css('[data-test="error"]')).getText();
        assert.ok(error.includes('Username is required'));
    });

    // TEST 4: PASSWORD KOSONG
    it('Login gagal tanpa password', async function () {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('login-button')).click();

        const error = await driver.findElement(By.css('[data-test="error"]')).getText();
        assert.ok(error.includes('Password is required'));
    });

    // TEST 5: USER TERKUNCI
    it('Login gagal dengan user terkunci', async function () {
        await driver.get('https://www.saucedemo.com/');

        await driver.findElement(By.id('user-name')).sendKeys('locked_out_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        const error = await driver.findElement(By.css('[data-test="error"]')).getText();
        assert.ok(error.includes('Sorry, this user has been locked out'));
    });
});