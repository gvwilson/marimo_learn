import { test, expect } from '@playwright/test';

const WRONG_URL  = '/js/tests/fixtures/ordering.html';
const SORTED_URL = '/js/tests/fixtures/ordering-sorted.html';

test.describe('OrderingWidget', () => {
  test('renders the question text', async ({ page }) => {
    await page.goto(WRONG_URL);
    await expect(page.locator('.faw-question')).toHaveText('Order these steps:');
  });

  test('renders all items', async ({ page }) => {
    await page.goto(WRONG_URL);
    const items = page.locator('.faw-ordering-item');
    await expect(items).toHaveCount(3);
  });

  test('items show sequential position numbers', async ({ page }) => {
    await page.goto(WRONG_URL);
    const positions = page.locator('.faw-position');
    await expect(positions.nth(0)).toHaveText('1');
    await expect(positions.nth(1)).toHaveText('2');
    await expect(positions.nth(2)).toHaveText('3');
  });

  test('Check Order button is present', async ({ page }) => {
    await page.goto(WRONG_URL);
    await expect(page.locator('button:has-text("Check Order")')).toBeVisible();
  });

  test('Reset button is present', async ({ page }) => {
    await page.goto(WRONG_URL);
    await expect(page.locator('button:has-text("Reset")')).toBeVisible();
  });

  test('submitting the correct order shows ✓ Correct order! feedback', async ({ page }) => {
    await page.goto(SORTED_URL);
    await page.locator('button:has-text("Check Order")').click();
    await expect(page.locator('.faw-feedback')).toContainText('✓ Correct order!');
  });

  test('submitting an incorrect order shows ✗ Incorrect order feedback', async ({ page }) => {
    await page.goto(WRONG_URL);
    await page.locator('button:has-text("Check Order")').click();
    await expect(page.locator('.faw-feedback')).toContainText('✗ Incorrect order');
  });

  test('Check Order button is disabled after submission', async ({ page }) => {
    await page.goto(WRONG_URL);
    await page.locator('button:has-text("Check Order")').click();
    await expect(page.locator('button:has-text("Check Order")')).toBeDisabled();
  });

  test('Reset button is hidden after submission', async ({ page }) => {
    await page.goto(WRONG_URL);
    await page.locator('button:has-text("Check Order")').click();
    await expect(page.locator('button:has-text("Reset")')).toBeHidden();
  });

  test('items are not draggable after submission', async ({ page }) => {
    await page.goto(WRONG_URL);
    await page.locator('button:has-text("Check Order")').click();
    const draggable = await page.locator('.faw-ordering-item').nth(0).getAttribute('draggable');
    expect(draggable).toBe('false');
  });
});
