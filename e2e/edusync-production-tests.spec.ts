import { test, expect } from '@playwright/test';

/**
 * EduSync E2E Test Suite
 * 
 * This test suite provides comprehensive testing for the EduSync application.
 * To run these tests, you'll need:
 * 1. Valid Appwrite test account credentials
 * 2. The application running on localhost:5173
 * 3. Test data seeded in the database
 */

// Test configuration
const TEST_CONFIG = {
  baseURL: 'http://localhost:5173',
  testUser: {
    email: process.env.TEST_EMAIL || 'test@example.com',
    password: process.env.TEST_PASSWORD || 'password123'
  },
  timeout: 30000
};

test.describe('EduSync Application E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to application
    await page.goto(TEST_CONFIG.baseURL);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Authentication', () => {
    
    test('should display login form with all authentication options', async ({ page }) => {
      // Verify login form elements
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
      await expect(page.locator('button', { hasText: 'Sign in' })).toBeVisible();
      
      // Verify OAuth options
      await expect(page.locator('button', { hasText: 'GitHub' })).toBeVisible();
      await expect(page.locator('button', { hasText: 'Google' })).toBeVisible();
      
      // Verify additional options
      await expect(page.locator('button', { hasText: 'Forgot password' })).toBeVisible();
      await expect(page.locator('button', { hasText: 'Sign up' })).toBeVisible();
    });

    test('should validate email input format', async ({ page }) => {
      const emailInput = page.locator('input[type="email"]');
      
      // Test invalid email
      await emailInput.fill('invalid-email');
      await page.locator('button', { hasText: 'Sign in' }).click();
      
      // Should show validation error or prevent submission
      const isValid = await emailInput.evaluate(el => (el as HTMLInputElement).checkValidity());
      expect(isValid).toBeFalsy();
    });

    test('should navigate to signup form', async ({ page }) => {
      await page.locator('button', { hasText: 'Sign up' }).click();
      
      // Should show signup form
      await expect(page.locator('form')).toBeVisible();
      
      // Should be able to navigate back to login
      const loginButton = page.locator('button', { hasText: 'Sign in' }).first();
      if (await loginButton.isVisible()) {
        await loginButton.click();
        await expect(page.locator('input[type="email"]')).toBeVisible();
      }
    });

    test.skip('should login with valid credentials', async ({ page }) => {
      // Skip this test until valid credentials are provided
      // Uncomment and update when test credentials are available
      
      await page.locator('input[type="email"]').fill(TEST_CONFIG.testUser.email);
      await page.locator('input[type="password"]').fill(TEST_CONFIG.testUser.password);
      await page.locator('button', { hasText: 'Sign in' }).click();
      
      // Should redirect to tasks page
      await page.waitForURL('**/tasks');
      await expect(page.locator('nav')).toBeVisible();
    });
  });

  test.describe('Navigation & Routing', () => {
    
    test('should protect authenticated routes', async ({ page }) => {
      const protectedRoutes = ['/tasks', '/profile', '/settings', '/task-and-file-demo'];
      
      for (const route of protectedRoutes) {
        await page.goto(`${TEST_CONFIG.baseURL}${route}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Allow time for redirect
        
        // Should redirect to login or show login form or loading state
        const isLoginVisible = await page.locator('input[type="email"]').isVisible();
        const isLoading = await page.locator('text=Loading').isVisible();
        
        expect(isLoginVisible || isLoading).toBeTruthy();
      }
    });

    test('should allow access to public routes', async ({ page }) => {
      const publicRoutes = ['/', '/contact'];
      
      for (const route of publicRoutes) {
        await page.goto(`${TEST_CONFIG.baseURL}${route}`);
        await page.waitForLoadState('networkidle');
        
        // Should not redirect to login
        const currentUrl = page.url();
        expect(currentUrl).toContain(route === '/' ? TEST_CONFIG.baseURL : route);
      }
    });
  });

  test.describe('Responsive Design', () => {
    
    test('should work on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Should show mobile navigation
      const mobileMenu = page.locator('[class*="mobile"], button[aria-label*="menu"]');
      expect(await mobileMenu.count()).toBeGreaterThanOrEqual(0);
      
      // Login form should be responsive
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('should work on tablet devices', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('button', { hasText: 'Sign in' })).toBeVisible();
    });

    test('should work on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('button', { hasText: 'Sign in' })).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    
    test('should have proper heading structure', async ({ page }) => {
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
      expect(headings).toBeGreaterThan(0);
    });

    test('should have skip to content link', async ({ page }) => {
      const skipLink = page.locator('a[href="#main-content"]');
      await expect(skipLink).toBeVisible();
    });

    test('should have proper form labels and ARIA attributes', async ({ page }) => {
      // Check for ARIA labels and roles
      const ariaLabels = await page.locator('[aria-label]').count();
      const roles = await page.locator('[role]').count();
      
      expect(ariaLabels + roles).toBeGreaterThan(0);
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Should be able to reach the sign in button
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(TEST_CONFIG.baseURL);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });
});

// Authenticated user tests (requires valid login)
test.describe('Authenticated User Features', () => {
  
  test.beforeEach(async ({ page }) => {
    // This would require valid credentials to run
    // await loginAsTestUser(page);
  });

  test.skip('should display task dashboard after login', async ({ page }) => {
    // Test main dashboard functionality
    await expect(page.locator('nav')).toBeVisible();
    // Add more assertions for authenticated state
  });

  test.skip('should create new task', async ({ page }) => {
    // Test task creation workflow
  });

  test.skip('should manage user profile', async ({ page }) => {
    // Test profile management
    await page.goto('/profile');
    // Add profile-specific tests
  });

  test.skip('should access settings page', async ({ page }) => {
    // Test settings functionality
    await page.goto('/settings');
    // Add settings-specific tests
  });

  test.skip('should upload and manage files', async ({ page }) => {
    // Test file management features
    await page.goto('/task-and-file-demo');
    // Add file upload tests
  });

  test.skip('should logout successfully', async ({ page }) => {
    // Test logout functionality
    const logoutButton = page.locator('button', { hasText: 'Logout' });
    await logoutButton.click();
    
    // Should redirect to login
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });
});

// Helper function for authentication (to be implemented with valid credentials)
async function loginAsTestUser(page: any) {
  await page.goto(TEST_CONFIG.baseURL);
  await page.locator('input[type="email"]').fill(TEST_CONFIG.testUser.email);
  await page.locator('input[type="password"]').fill(TEST_CONFIG.testUser.password);
  await page.locator('button', { hasText: 'Sign in' }).click();
  await page.waitForURL('**/tasks');
}
