# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: core.spec.ts >> yuleCommunity Core Paths >> 404 page shows fallback
- Location: e2e/core.spec.ts:33:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=404')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=404')

```

```yaml
- text: The server is configured with a public base URL of /yuleCommunity/ - did you mean to visit
- link "/yuleCommunity/nonexistent-page":
  - /url: /yuleCommunity/nonexistent-page
- text: instead?
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('yuleCommunity Core Paths', () => {
  4  | 
  5  |   test('homepage loads with correct title and key elements', async ({ page }) => {
  6  |     await page.goto('/');
  7  |     await expect(page).toHaveTitle(/YuleTech/);
  8  |     await expect(page.getByRole('navigation')).toBeVisible();
  9  |     await expect(page.getByText('AutoSAR', { exact: false })).toBeVisible();
  10 |   });
  11 | 
  12 |   test('navigation links work', async ({ page }) => {
  13 |     await page.goto('/');
  14 |     await page.getByText('开发者中心', { exact: false }).click();
  15 |     await expect(page).toHaveURL(/\/opensource/);
  16 |   });
  17 | 
  18 |   test('opensource page displays modules', async ({ page }) => {
  19 |     await page.goto('/opensource');
  20 |     await expect(page.getByText('MCAL', { exact: false })).toBeVisible();
  21 |   });
  22 | 
  23 |   test('blog page loads and shows articles', async ({ page }) => {
  24 |     await page.goto('/blog');
  25 |     await expect(page.getByText('AutoSAR', { exact: false })).toBeVisible();
  26 |   });
  27 | 
  28 |   test('module compare page with query params', async ({ page }) => {
  29 |     await page.goto('/compare?modules=MCU,SPI');
  30 |     await expect(page.getByText('对比', { exact: false })).toBeVisible();
  31 |   });
  32 | 
  33 |   test('404 page shows fallback', async ({ page }) => {
  34 |     await page.goto('/nonexistent-page');
> 35 |     await expect(page.locator('text=404')).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  36 |     await expect(page.getByText('返回首页')).toBeVisible();
  37 |   });
  38 | 
  39 |   test('PWA manifest exists', async ({ page }) => {
  40 |     await page.goto('/');
  41 |     const manifest = page.locator('link[rel="manifest"]');
  42 |     await expect(manifest).toHaveAttribute('href', /manifest/);
  43 |   });
  44 | 
  45 | });
  46 | 
```