import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from './pageFixture';
import path from 'path';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
});

Before(async function () {
    context = await browser.newContext({
        recordVideo: { dir: path.join(__dirname, '../../results/videos') } //  Enable video recording for all tests
    });
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function (this: any, scenario) {  
    const videoPath = await pageFixture.page.video()?.path(); // Get video path

    if (scenario.result?.status === Status.FAILED) {
        //  Save Screenshot for Failed Tests
        const screenshotDir = path.join(__dirname, '../../results/screenshots');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        const screenshotPath = path.join(screenshotDir, `${scenario.pickle.name}.png`);
        await pageFixture.page.screenshot({ path: screenshotPath });
        console.log(` Screenshot saved: ${screenshotPath}`);

        // Attach Screenshot to Cucumber Report
        const screenshotData = fs.readFileSync(screenshotPath);
        await this.attach(screenshotData, "image/png");

        // Move Video to Reports Folder for Failed Tests
        if (videoPath) {
            let failedVideoPath = path.join(__dirname, `../../results/videos/${scenario.pickle.name}.webm`);

            //  Attach Video BEFORE setTimeout
            await this.attach(
                `Video: <a href="file://${failedVideoPath}" target="_blank">Click here to view</a>`,
                "text/html"
            );

            setTimeout(() => {
                try {
                    fs.renameSync(videoPath, failedVideoPath);
                    console.log(`Video saved: ${failedVideoPath}`);
                } catch (error) {
                    console.error(` Error moving video for failed test: ${scenario.pickle.name}`, error);
                }
            }, 1000);
        }
    } else {
        // Delete Video for Passed Tests (After Delay)
        if (videoPath && fs.existsSync(videoPath)) {
            setTimeout(() => {
                try {
                    fs.unlinkSync(videoPath);
                    console.log(` Video deleted for passed test: ${scenario.pickle.name}`);
                } catch (error) {
                    console.error(` Error deleting video for passed test: ${scenario.pickle.name}`, error);
                }
            }, 2000);
        }
    }

    await pageFixture.page.close();
    await context.close();
});
AfterAll(async function () {
    await browser.close();
    console.log('browser closed');
});