import { test, expect } from '@playwright/test';

test.describe('EduSync Detailed Exploration', () => {
  test('explore application features in detail', async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    
    console.log('=== INITIAL PAGE ANALYSIS ===');
    console.log('Page title:', await page.title());
    console.log('Current URL:', page.url());
    
    // Take initial screenshot
    await page.screenshot({ path: 'exploration-initial-detailed.png', fullPage: true });
    
    // Get all visible text content to understand the page structure
    const bodyText = await page.locator('body').textContent();
    console.log('Page contains text:', bodyText?.substring(0, 500) + '...');
    
    // Check for navigation or menu items
    const navItems = await page.locator('nav, [role="navigation"]').allTextContents();
    console.log('Navigation content:', navItems);
    
    // Look for buttons and their text
    const buttons = await page.locator('button').all();
    console.log('=== BUTTONS FOUND ===');
    for (let i = 0; i < buttons.length; i++) {
      const buttonText = await buttons[i].textContent();
      const isVisible = await buttons[i].isVisible();
      const isEnabled = await buttons[i].isEnabled();
      console.log(`Button ${i + 1}: "${buttonText}" - Visible: ${isVisible}, Enabled: ${isEnabled}`);
    }
    
    // Look for links and their destinations
    const links = await page.locator('a').all();
    console.log('=== LINKS FOUND ===');
    for (let i = 0; i < links.length; i++) {
      const linkText = await links[i].textContent();
      const href = await links[i].getAttribute('href');
      const isVisible = await links[i].isVisible();
      console.log(`Link ${i + 1}: "${linkText}" - href: ${href}, Visible: ${isVisible}`);
    }
    
    // Check for input fields and forms
    const inputs = await page.locator('input').all();
    console.log('=== INPUT FIELDS ===');
    for (let i = 0; i < inputs.length; i++) {
      const type = await inputs[i].getAttribute('type');
      const placeholder = await inputs[i].getAttribute('placeholder');
      const name = await inputs[i].getAttribute('name');
      const isVisible = await inputs[i].isVisible();
      console.log(`Input ${i + 1}: type="${type}", placeholder="${placeholder}", name="${name}", Visible: ${isVisible}`);
    }
    
    // Look for any clickable elements that might be interactive
    console.log('=== INTERACTIVE ELEMENTS ===');
    const clickableElements = await page.locator('button, a, [role="button"], [onclick]').all();
    for (let i = 0; i < Math.min(clickableElements.length, 10); i++) {
      const element = clickableElements[i];
      const tagName = await element.evaluate(el => el.tagName);
      const text = await element.textContent();
      const role = await element.getAttribute('role');
      const isVisible = await element.isVisible();
      console.log(`Interactive ${i + 1}: <${tagName}> "${text}" role="${role}" Visible: ${isVisible}`);
    }
    
    // Try to identify the main content areas
    console.log('=== CONTENT STRUCTURE ===');
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('All headings:', headings);
    
    // Look for any specific EduSync features
    const taskElements = await page.locator('[class*="task"], [data-testid*="task"]').count();
    const cardElements = await page.locator('[class*="card"], [data-testid*="card"]').count();
    const modalElements = await page.locator('[class*="modal"], [role="dialog"]').count();
    
    console.log('Task-related elements:', taskElements);
    console.log('Card elements:', cardElements);
    console.log('Modal/Dialog elements:', modalElements);
    
    // Try to interact with the first visible button if any
    const firstVisibleButton = await page.locator('button:visible').first();
    if (await firstVisibleButton.count() > 0) {
      const buttonText = await firstVisibleButton.textContent();
      console.log(`=== TRYING TO CLICK FIRST BUTTON: "${buttonText}" ===`);
      
      // Click the button and observe changes
      await firstVisibleButton.click();
      await page.waitForTimeout(2000); // Wait for any animations or transitions
      
      // Take screenshot after interaction
      await page.screenshot({ path: 'exploration-after-click.png', fullPage: true });
      
      // Check if URL changed
      console.log('URL after click:', page.url());
      
      // Check for any new content
      const newBodyText = await page.locator('body').textContent();
      console.log('Page changed:', bodyText !== newBodyText);
    }
    
    console.log('=== EXPLORATION COMPLETE ===');
  });
});
