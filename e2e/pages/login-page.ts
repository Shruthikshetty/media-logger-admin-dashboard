/**
 * This @file contains the login page object
 * with utility methods
 */

import type { Page, Locator } from '@playwright/test';
import { Secrets } from '../test-data/secrets';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // define all locators
    this.emailInput = page.getByLabel('email');
    this.passwordInput = page.getByLabel('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  //create a method to go to login page
  async gotoLoginPage() {
    await this.page.goto('/login');
  }

  // create a method to login
  async login(email: string, password: string) {
    // fill email
    await this.emailInput.click(); // added because its not directly filling in webkit
    await this.emailInput.fill(email);
    // fill password
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    // click login
    await this.loginButton.click();
  }

  //login as admin user
  async loginAsAdminUser() {
    await this.login(Secrets.adminUser.email, Secrets.adminUser.password);
  }
}
