import { test, expect } from '@playwright/test';

test.describe('EduSync Exploration - Post Login', () => {
  test('explore the application after login', async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173/');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Take a screenshot of the current state
    await page.screenshot({ path: 'exploration-post-login.png', fullPage: true });
    
    // Log the page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Log the current URL
    console.log('Current URL:', page.url());
    
    // Check if there are any navigation elements
    const navElements = await page.locator('nav').count();
    console.log('Navigation elements found:', navElements);
    
    // Look for any buttons or links to explore
    const buttons = await page.locator('button').count();
    const links = await page.locator('a').count();
    console.log('Buttons found:', buttons);
    console.log('Links found:', links);
    
    // Try to identify main content areas
    const mainContent = await page.locator('main').count();
    const headerContent = await page.locator('header').count();
    const footerContent = await page.locator('footer').count();
    
    console.log('Main content areas:', mainContent);
    console.log('Header areas:', headerContent);
    console.log('Footer areas:', footerContent);
    
    // Look for any form elements
    const forms = await page.locator('form').count();
    const inputs = await page.locator('input').count();
    console.log('Forms found:', forms);
    console.log('Input fields found:', inputs);
    
    // Try to find any cards or task-related elements
    const cards = await page.locator('[class*="card"]').count();
    const tasks = await page.locator('[class*="task"]').count();
    console.log('Card-like elements:', cards);
    console.log('Task-like elements:', tasks);
    
    // Log any visible text content (first few elements)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('Headings found:', headings.slice(0, 10)); // First 10 headings
    
    // Check for any error messages or alerts
    const alerts = await page.locator('[role="alert"]').count();
    const errors = await page.locator('[class*="error"]').count();
    console.log('Alerts found:', alerts);
    console.log('Error elements found:', errors);
  });
});
