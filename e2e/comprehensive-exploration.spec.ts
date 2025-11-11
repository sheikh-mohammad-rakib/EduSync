import { test, expect } from '@playwright/test';

test.describe('EduSync Application Full Exploration', () => {
  test('complete application exploration after login', async ({ page }) => {
    console.log('=== STARTING EDUSYNC EXPLORATION ===');
    
    // Navigate to the application
    await page.goto('http://localhost:5173/');
    await page.waitForLoadState('networkidle');
    
    // Take initial screenshot
    await page.screenshot({ path: 'exploration-step-1-initial.png', fullPage: true });
    
    console.log('=== STEP 1: INITIAL PAGE ANALYSIS ===');
    console.log('Page title:', await page.title());
    console.log('Current URL:', page.url());
    
    // Check if we're on login page or already authenticated
    const isLoginPage = await page.locator('input[type="email"]').isVisible();
    console.log('Is login page visible:', isLoginPage);
    
    if (isLoginPage) {
      console.log('=== STEP 2: ATTEMPTING LOGIN ===');
      
      // Check for demo credentials or test account information in the page
      const pageText = await page.locator('body').textContent();
      console.log('Page contains demo info:', pageText?.includes('demo') || pageText?.includes('test'));
      
      // Look for any pre-filled values or hints
      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');
      
      // Try common test credentials
      await emailInput.fill('test@example.com');
      await passwordInput.fill('password123');
      
      // Click sign in button
      const signInButton = page.locator('button', { hasText: 'Sign in' });
      await signInButton.click();
      
      // Wait for either success or error
      await page.waitForTimeout(3000);
      
      // Check if login was successful
      const currentUrl = page.url();
      const isStillOnLogin = await page.locator('input[type="email"]').isVisible();
      
      console.log('After login attempt - URL:', currentUrl);
      console.log('Still on login page:', isStillOnLogin);
      
      if (isStillOnLogin) {
        console.log('Login failed, but continuing exploration of login page features...');
        
        // Explore login page features
        const githubButton = page.locator('button', { hasText: 'GitHub' });
        const googleButton = page.locator('button', { hasText: 'Google' });
        const signupButton = page.locator('button', { hasText: 'Sign up' });
        const forgotPasswordButton = page.locator('button', { hasText: 'Forgot password' });
        
        console.log('GitHub login available:', await githubButton.isVisible());
        console.log('Google login available:', await googleButton.isVisible());
        console.log('Sign up option available:', await signupButton.isVisible());
        console.log('Forgot password available:', await forgotPasswordButton.isVisible());
        
        // Try clicking signup to see the signup form
        if (await signupButton.isVisible()) {
          await signupButton.click();
          await page.waitForTimeout(2000);
          await page.screenshot({ path: 'exploration-step-2-signup.png', fullPage: true });
          
          const signupForm = await page.locator('form').count();
          console.log('Signup form elements:', signupForm);
          
          // Go back to login
          const loginButton = page.locator('button', { hasText: 'Sign in' }).first();
          if (await loginButton.isVisible()) {
            await loginButton.click();
            await page.waitForTimeout(2000);
          }
        }
        
        return; // Exit here since we can't proceed without valid credentials
      }
    }
    
    console.log('=== STEP 3: EXPLORING AUTHENTICATED APPLICATION ===');
    
    // Now we should be in the authenticated app - take screenshot
    await page.screenshot({ path: 'exploration-step-3-authenticated.png', fullPage: true });
    
    // Check navigation structure
    const navbar = await page.locator('nav').count();
    const navButtons = await page.locator('nav button, nav a').allTextContents();
    console.log('Navigation available:', navbar > 0);
    console.log('Navigation items:', navButtons);
    
    // Explore main content
    const mainContent = await page.locator('main, [role="main"], #main-content').count();
    console.log('Main content areas:', mainContent);
    
    // Check for tasks-related content
    const tasksElements = await page.locator('[class*="task"], [data-testid*="task"]').count();
    const cardElements = await page.locator('[class*="card"]').count();
    console.log('Task elements found:', tasksElements);
    console.log('Card elements found:', cardElements);
    
    // Look for any action buttons
    const actionButtons = await page.locator('button').allTextContents();
    console.log('Available action buttons:', actionButtons.slice(0, 10));
    
    console.log('=== STEP 4: NAVIGATING TO DIFFERENT ROUTES ===');
    
    // Try to navigate to different pages
    const routes = ['/tasks', '/profile', '/settings', '/contact', '/task-and-file-demo'];
    
    for (const route of routes) {
      try {
        console.log(`--- Exploring route: ${route} ---`);
        await page.goto(`http://localhost:5173${route}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000);
        
        // Take screenshot of each route
        const routeName = route.substring(1) || 'home';
        await page.screenshot({ path: `exploration-route-${routeName}.png`, fullPage: true });
        
        const pageTitle = await page.title();
        const pageHeadings = await page.locator('h1, h2, h3').allTextContents();
        const pageButtons = await page.locator('button').count();
        const pageInputs = await page.locator('input, textarea, select').count();
        
        console.log(`${route} - Title: ${pageTitle}`);
        console.log(`${route} - Headings:`, pageHeadings.slice(0, 5));
        console.log(`${route} - Interactive elements: ${pageButtons} buttons, ${pageInputs} inputs`);
        
        // Check for any error states
        const errors = await page.locator('[class*="error"], [role="alert"]').count();
        if (errors > 0) {
          const errorTexts = await page.locator('[class*="error"], [role="alert"]').allTextContents();
          console.log(`${route} - Errors found:`, errorTexts);
        }
        
        // If this is the tasks page, explore task functionality
        if (route === '/tasks') {
          console.log('--- Exploring Tasks Page Features ---');
          
          // Look for task creation/management features
          const addTaskButton = page.locator('button', { hasText: /add|create|new.*task/i });
          const filterElements = page.locator('select, input[type="search"], [class*="filter"]');
          const taskCards = page.locator('[class*="task"], [class*="card"]');
          
          console.log('Add task button available:', await addTaskButton.count());
          console.log('Filter elements available:', await filterElements.count());
          console.log('Task cards visible:', await taskCards.count());
          
          // Try interacting with filters if available
          const selectElements = await page.locator('select').count();
          if (selectElements > 0) {
            console.log('Found filter dropdowns, exploring options...');
            const selects = await page.locator('select').all();
            for (let i = 0; i < Math.min(selects.length, 3); i++) {
              const options = await selects[i].locator('option').allTextContents();
              console.log(`Select ${i + 1} options:`, options);
            }
          }
          
          // Try clicking on a task card if available
          if (await taskCards.count() > 0) {
            console.log('Attempting to interact with first task card...');
            await taskCards.first().click();
            await page.waitForTimeout(1000);
            await page.screenshot({ path: 'exploration-task-interaction.png', fullPage: true });
          }
        }
        
        // If this is the profile page, explore profile features
        if (route === '/profile') {
          console.log('--- Exploring Profile Page Features ---');
          
          const profileForms = await page.locator('form').count();
          const profileInputs = await page.locator('input').count();
          const saveButtons = page.locator('button', { hasText: /save|update/i });
          
          console.log('Profile forms:', profileForms);
          console.log('Profile inputs:', profileInputs);
          console.log('Save buttons available:', await saveButtons.count());
        }
        
      } catch (error) {
        console.log(`Error exploring route ${route}:`, error.message);
      }
    }
    
    console.log('=== STEP 5: TESTING RESPONSIVE DESIGN ===');
    
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('http://localhost:5173/tasks');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `exploration-responsive-${viewport.name}.png`, fullPage: true });
      console.log(`Tested ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
    }
    
    console.log('=== EXPLORATION COMPLETE ===');
    console.log('Screenshots saved for each major section and route');
    console.log('Check the generated PNG files for visual documentation');
  });
});
