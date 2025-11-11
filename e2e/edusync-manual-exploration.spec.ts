import { test, expect } from '@playwright/test';

test.describe('EduSync Manual Exploration - Complete User Journey', () => {
  const baseURL = 'http://localhost:5173';

  test('should complete signup, login, and exploration flow', async ({ page }) => {
    // Navigate to the application
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    // Take initial screenshot
    await page.screenshot({ path: 'initial-page.png', fullPage: true });

    // Check if we land on the main page
    await expect(page).toHaveTitle(/EduSync|Vite/);

    // Look for signup/login options
    const signupButton = page.locator('text=Sign Up').or(page.locator('button:has-text("Sign Up")'));
    const loginButton = page.locator('text=Login').or(page.locator('text=Sign In')).or(page.locator('button:has-text("Login")'));
    
    // If there's a signup button, proceed with signup
    if (await signupButton.isVisible()) {
      console.log('Found signup button, proceeding with signup');
      await signupButton.click();
    } else if (await loginButton.isVisible()) {
      // If only login is visible, click it first to see if there's a signup option
      console.log('Found login button, checking for signup option');
      await loginButton.click();
      await page.waitForTimeout(1000);
      
      // Look for a "Create account" or "Sign up" link
      const createAccountLink = page.locator('text=Create account').or(page.locator('text=Sign up')).or(page.locator('text=Register'));
      if (await createAccountLink.isVisible()) {
        await createAccountLink.click();
      }
    }

    // Wait for signup form to appear
    await page.waitForTimeout(2000);

    // Fill out signup form
    const nameInput = page.locator('input[type="text"]').or(page.locator('input[placeholder*="name" i]')).or(page.locator('input[name="name"]'));
    const emailInput = page.locator('input[type="email"]').or(page.locator('input[placeholder*="email" i]'));
    const passwordInput = page.locator('input[type="password"]').first();
    const confirmPasswordInput = page.locator('input[type="password"]').last();

    // Check if we have signup form fields
    if (await nameInput.isVisible()) {
      console.log('Filling out signup form');
      await nameInput.fill('Test User');
      await emailInput.fill('testuser@example.com');
      await passwordInput.fill('testpassword123');
      
      if (await confirmPasswordInput.isVisible() && (await page.locator('input[type="password"]').count()) > 1) {
        await confirmPasswordInput.fill('testpassword123');
      }

      // Look for terms and conditions checkbox
      const termsCheckbox = page.locator('input[type="checkbox"]');
      if (await termsCheckbox.isVisible()) {
        await termsCheckbox.check();
      }

      // Submit signup form
      const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Sign Up")'));
      await submitButton.click();

      // Wait for signup to complete
      await page.waitForTimeout(3000);
    }

    // Now try to login
    // Look for login form or if we're already logged in
    const loginEmailInput = page.locator('input[type="email"]');
    if (await loginEmailInput.isVisible()) {
      console.log('Filling out login form');
      await loginEmailInput.fill('testuser@example.com');
      const loginPasswordInput = page.locator('input[type="password"]');
      await loginPasswordInput.fill('testpassword123');

      const loginSubmitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Login")'));
      await loginSubmitButton.click();

      // Wait for login to complete
      await page.waitForTimeout(3000);
    }

    // Take screenshot after authentication
    await page.screenshot({ path: 'after-auth.png', fullPage: true });

    // Explore the main dashboard/home page
    console.log('Exploring the main application');
    
    // Look for navigation elements
    const nav = page.locator('nav').or(page.locator('[role="navigation"]'));
    if (await nav.isVisible()) {
      console.log('Found navigation, exploring menu items');
      
      // Take screenshot of navigation
      await page.screenshot({ path: 'navigation-visible.png', fullPage: true });
      
      // Look for common navigation items
      const menuItems = ['Tasks', 'Profile', 'Settings', 'Dashboard', 'Home'];
      for (const item of menuItems) {
        const menuItem = page.locator(`text=${item}`).or(page.locator(`a:has-text("${item}")`));
        if (await menuItem.isVisible()) {
          console.log(`Found and clicking ${item}`);
          await menuItem.click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: `${item.toLowerCase()}-page.png`, fullPage: true });
          
          // Go back to main page for next exploration
          const homeLink = page.locator('text=Home').or(page.locator('text=Dashboard')).or(page.locator('[href="/"]'));
          if (await homeLink.isVisible()) {
            await homeLink.click();
            await page.waitForTimeout(1000);
          }
        }
      }
    }

    // Look for main content areas
    const mainContent = page.locator('main').or(page.locator('[role="main"]')).or(page.locator('.main-content'));
    if (await mainContent.isVisible()) {
      console.log('Found main content area');
      
      // Look for interactive elements
      const buttons = page.locator('button:visible');
      const buttonCount = await buttons.count();
      console.log(`Found ${buttonCount} buttons`);
      
      if (buttonCount > 0) {
        // Click on a few buttons to explore functionality
        for (let i = 0; i < Math.min(3, buttonCount); i++) {
          const button = buttons.nth(i);
          const buttonText = await button.textContent();
          console.log(`Clicking button: ${buttonText}`);
          
          try {
            await button.click();
            await page.waitForTimeout(1000);
            await page.screenshot({ path: `button-${i}-clicked.png`, fullPage: true });
          } catch (error) {
            console.log(`Could not click button ${i}: ${error}`);
          }
        }
      }
    }

    // Final exploration screenshot
    await page.screenshot({ path: 'final-exploration.png', fullPage: true });

    // Verify we've successfully explored the application
    await expect(page).toHaveURL(new RegExp(baseURL));
    
    console.log('Exploration completed successfully!');
  });
});
