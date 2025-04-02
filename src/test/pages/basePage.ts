import { Page , Locator} from '@playwright/test';

export class BasePage {
    protected page: Page;
    private defaultTimeout: number;

    constructor(page: Page,defaultTimeout: number = 20000) {
        this.page = page;
        this.defaultTimeout = defaultTimeout;
    }

    async navigate(url: string) {
        await this.page.goto(url, { timeout: 20000 });
    }
    async waitForElement(locator: Locator, timeout: number = this.defaultTimeout) {
        try {
            
            await locator.waitFor({ state: 'visible', timeout });
        } catch (error) {
            console.error('Error waiting for element:');
        }
    }
    async fillField(locator: Locator, text: string) {
        await this.waitForElement(locator);
        await locator.fill(text);
}
async click(locator: Locator) {
    await this.waitForElement(locator);
    await locator.click();
}
}
