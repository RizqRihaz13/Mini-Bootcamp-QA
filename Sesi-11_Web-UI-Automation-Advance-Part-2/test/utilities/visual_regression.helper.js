const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

async function compareScreenshot(driver, imageName, maxDiffPercent = 1) {
    const baselineDir = path.join('visual_regression', 'baseline');
    const currentDir = path.join('visual_regression', 'current');
    const diffDir = path.join('visual_regression', 'diff');

    // buat folder 
    [currentDir, baselineDir, diffDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    const baselinePath = path.join(baselineDir, imageName + '.png');
    const currentPath = path.join(currentDir, imageName + '.png');
    const diffPath = path.join(diffDir, imageName + '.png');

    // ambil screenshot
    const screenshot = await driver.takeScreenshot();
    const imgBuffer = Buffer.from(screenshot, 'base64');
    fs.writeFileSync(currentPath, imgBuffer);

    // buat baseline
    if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(currentPath, baselinePath);
        console.log(`Baseline created: ${imageName}`);
        return;
    }

    // baca image
    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(fs.readFileSync(currentPath));

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    // bandingkan pixel
    const mismatchPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
    );

    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPixels = width * height;
    const diffPercent = (mismatchPixels / totalPixels) * 100;

    console.log(`Diff: ${diffPercent.toFixed(2)}%`);

    // validasi
    if (diffPercent > maxDiffPercent) {
        throw new Error(`Visual regression failed: ${imageName}`);
    }
}

module.exports = { compareScreenshot };