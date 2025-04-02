import { Given, When, Then , setDefaultTimeout} from '@cucumber/cucumber';
import { pageFixture } from '../../support/pageFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login/loginPage';

setDefaultTimeout(60 * 1000);

let loginPage: LoginPage;

Given('I navigate to the login page', async function () {
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.navigateToLoginPage();
    
});

When('I enter valid credentials', async function () {
    await loginPage.enterCredentials();
});

When('I enter invalid credentials', async function () {
    await pageFixture.page.fill('#txt-username', 'invalidUser');
    await pageFixture.page.fill('#txt-password', 'wrongPass');
});

When('I click the login button', async function () {
    await loginPage.clickLoginButton();
});

Then('I should see the appointment page', async function () {
    expect(await loginPage.isAppointmentPageDisplayed()).toBeTruthy();
});

Then('I should see an error message', async function () {
    expect(await loginPage.getErrorMessage()).toBeNull();
});
