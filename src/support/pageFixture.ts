/*import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export class PageFixture {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    async launchBrowser() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async closeBrowser() {
        await this.page?.close();
        await this.browser?.close();
    }
}

export const pageFixture = new PageFixture();
*/
// src/support/pageFixture.ts
import { Page } from '@playwright/test';

export class PageFixture {
    page!: Page;
}

export const pageFixture = new PageFixture();
