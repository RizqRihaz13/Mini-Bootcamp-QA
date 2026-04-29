const fs = require('fs');
const path = require('path');

class SharingAction {
    constructor(driver) {
        this.driver = driver;
        this.screenshotDir = path.join(__dirname, '../../screenshot');

        // pastikan folder ada
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }

    async fullPageScreenshot(fileName) {
        const fullScreen = await this.driver.takeScreenshot();

        const filePath = path.join(
            this.screenshotDir,
            `${fileName}-${Date.now()}.png`
        );

        fs.writeFileSync(filePath, fullScreen, 'base64');
    }

    async partialScreenshot(element, fileName) {
        const el = await this.driver.findElement(element);
        const partial = await el.takeScreenshot();

        const filePath = path.join(
            this.screenshotDir,
            `${fileName}-${Date.now()}.png`
        );

        fs.writeFileSync(filePath, partial, 'base64');
    }
}

module.exports = SharingAction;