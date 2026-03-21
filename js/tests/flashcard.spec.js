import { test, expect } from '@playwright/test';

const URL = '/js/tests/fixtures/flashcard.html';

// Helper: flip the current card and rate it
async function flipAndRate(page, rating) {
  await page.locator('.faw-btn-secondary').first().click(); // Flip
  await page.locator(`button:has-text("${rating}")`).click();
}

test.describe('FlashcardWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('renders the question heading', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Basic Math');
  });

  test('shows the front of the first card on load', async ({ page }) => {
    await expect(page.locator('.faw-card')).toHaveText('What is 2+2?');
  });

  test('Flip button is visible on load', async ({ page }) => {
    await expect(page.locator('button:has-text("Flip")')).toBeVisible();
  });

  test('rating buttons are hidden before flipping', async ({ page }) => {
    await expect(page.locator('.faw-rating-btns')).toBeHidden();
  });

  test('clicking Flip reveals the card back', async ({ page }) => {
    await page.locator('button:has-text("Flip")').click();
    await expect(page.locator('.faw-card')).toHaveText('4');
  });

  test('rating buttons are visible after flipping', async ({ page }) => {
    await page.locator('button:has-text("Flip")').click();
    await expect(page.locator('.faw-rating-btns')).toBeVisible();
  });

  test('Flip button is hidden after flipping', async ({ page }) => {
    await page.locator('button:has-text("Flip")').click();
    await expect(page.locator('button:has-text("Flip")')).toBeHidden();
  });

  test('clicking Got it advances to the next card', async ({ page }) => {
    await page.locator('button:has-text("Flip")').click();
    await page.locator('button:has-text("Got it")').click();
    await expect(page.locator('.faw-card')).toHaveText('What is 3+3?');
  });

  test('progress counter shows correct card position', async ({ page }) => {
    await expect(page.locator('.faw-instructions')).toContainText('Card 1 of 3');
    await page.locator('button:has-text("Flip")').click();
    await page.locator('button:has-text("Got it")').click();
    await expect(page.locator('.faw-instructions')).toContainText('Card 2 of 3');
  });

  test('completing all cards shows the completion message', async ({ page }) => {
    await flipAndRate(page, '✓ Got it');
    await flipAndRate(page, '✓ Got it');
    await flipAndRate(page, '✓ Got it');
    await expect(page.locator('.faw-card')).toContainText('All cards reviewed');
  });
});
