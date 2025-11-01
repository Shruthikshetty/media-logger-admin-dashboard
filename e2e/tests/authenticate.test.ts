/**
+ * This @file contains tests related to the login page
 *  user authentication to access the app
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('should login successfully', async ({ page }) => {
  // create a instance of login page object
  const loginPage = new LoginPage(page);
  // go to login page
  await loginPage.gotoLoginPage();
  // expect title
  await expect(page).toHaveTitle('Media Logger Admin Dashboard');
  // login as admin user
  await loginPage.loginAsAdminUser();
  //expect login success message toast 
  await expect(page.getByText('Login successful')).toBeVisible();
});
