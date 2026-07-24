import { test, expect } from '@playwright/test';

const BASE = '/yuleCommunity';

test.describe('yuleCommunity Core Paths', () => {

  test('homepage loads and React mounts', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.waitForLoadState('load');
    const rendered = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.children.length > 0 : false;
    });
    expect(rendered).toBeTruthy();
  });

  test('homepage shows navbar', async ({ page }) => {
    await page.goto(BASE + '/');
    await page.waitForTimeout(2000);
    await expect(page.getByRole('navigation')).toBeVisible({ timeout: 10000 });
  });

  test('autosar page loads', async ({ page }) => {
    await page.goto(BASE + '/autosar');
    await page.waitForTimeout(5000);
    const body = await page.evaluate(() => document.body.innerText.substring(0, 100));
    // Should render React content, not server hint
    expect(body).not.toContain('server is configured');
  });

  test('blog page loads', async ({ page }) => {
    await page.goto(BASE + '/blog');
    await page.waitForTimeout(5000);
    const body = await page.evaluate(() => document.body.innerText.substring(0, 100));
    expect(body).not.toContain('server is configured');
  });

  test('module compare page loads', async ({ page }) => {
    await page.goto(BASE + '/compare?modules=MCU,SPI');
    await page.waitForTimeout(3000);
    const body = await page.evaluate(() => document.body.innerText.substring(0, 200));
    console.log('/compare body:', body.replace(/\n/g, ' | '));
    expect(body.length).toBeGreaterThan(50);
  });

  test('PWA manifest exists', async ({ page }) => {
    await page.goto(BASE + '/');
    const manifest = page.locator('link[rel="manifest"]');
    await expect(manifest).toHaveAttribute('href', /manifest/);
  });

  test('service worker available', async ({ page }) => {
    await page.goto(BASE + '/');
    const hasSW = await page.evaluate(() => 'serviceWorker' in navigator);
    expect(hasSW).toBeTruthy();
  });

});
