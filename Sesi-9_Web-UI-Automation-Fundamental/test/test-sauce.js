const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo Automation Test', function () {
    this.timeout(30000);
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    afterEach(async function () {
        await driver.quit();
    });

    async function login() {
        await driver.get('https://www.saucedemo.com');

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.urlContains('inventory'), 5000);
    }

    // TEST 1: LOGIN
    it('Sukses Login', async function () {
        await login();

        const url = await driver.getCurrentUrl();
        assert.ok(url.includes('inventory'), 'Login gagal');
    });

    // TEST 2: SORTING A-Z
    it('Urutkan Produk dari A-Z', async function () {
        await login();

        await driver.wait(
            until.elementLocated(By.className('product_sort_container')),
            5000
        );

        const dropdown = await driver.findElement(By.className('product_sort_container'));
        await dropdown.sendKeys('Name (A to Z)');

        await driver.wait(
            until.elementsLocated(By.className('inventory_item_name')),
            5000
        );

        const items = await driver.findElements(By.className('inventory_item_name'));

        let names = [];
        for (let item of items) {
            names.push(await item.getText());
        }

        const sortedNames = [...names].sort();

        assert.deepStrictEqual(names, sortedNames, 'Sorting gagal');
    });
});