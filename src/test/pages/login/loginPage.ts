import dotenv from 'dotenv';
dotenv.config({ path: './config/.env.qa' });

import { BasePage } from '../basePage';
import { loginSelectors } from './loginSelectors';

export class LoginPage extends BasePage {

    async navigateToLoginPage() {
        await this.navigate(process.env.BASE_URL + '/profile.php#login');
      
    }

    async enterCredentials() {
        const username = process.env.USER;
        const password = process.env.PASSWORD;
        //await this.page.fill(loginSelectors.usernameField,username);
        //await this.page.fill(loginSelectors.passwordField, password);
       await this.fillField(this.page.locator(loginSelectors.usernameField),username);
       await this.fillField(this.page.locator(loginSelectors.passwordField),password);
    }

    async clickLoginButton() {
        await this.click(this.page.locator(loginSelectors.loginButton));
    }

    async isAppointmentPageDisplayed(): Promise<boolean> {
        return this.page.locator(loginSelectors.appointmentHeader).isVisible();
    }

    async getErrorMessage(): Promise<string | null> {
        return await this.page.locator(loginSelectors.errorMessage).textContent();
    }
}
