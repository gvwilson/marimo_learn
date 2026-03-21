import { test, expect } from '@playwright/test';

const URL = '/js/tests/fixtures/matching.html';

// Helper: drag all right-column items to their corresponding drop zones
async function matchAll(page) {
  const items = page.locator('.faw-item-draggable');
  const zones = page.locator('.faw-drop-zone');
  await items.nth(0).dragTo(zones.nth(0));
  await items.nth(1).dragTo(zones.nth(1));
  await items.nth(2).dragTo(zones.nth(2));
}

test.describe('MatchingWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('renders the question text', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Match each animal to its sound:');
  });

  test('renders all left-column items', async ({ page }) => {
    const fixed = page.locator('.faw-item-fixed');
    await expect(fixed).toHaveCount(3);
    await expect(fixed.nth(0)).toHaveText('Cat');
    await expect(fixed.nth(1)).toHaveText('Dog');
    await expect(fixed.nth(2)).toHaveText('Bird');
  });

  test('renders all right-column items as draggable', async ({ page }) => {
    const draggable = page.locator('.faw-item-draggable');
    await expect(draggable).toHaveCount(3);
    await expect(draggable.nth(0)).toHaveText('Meow');
  });

  test('renders a drop zone for each left item', async ({ page }) => {
    await expect(page.locator('.faw-drop-zone')).toHaveCount(3);
  });

  test('Check Answers button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Check Answers")')).toBeVisible();
  });

  test('dragging a right item into a drop zone fills the zone', async ({ page }) => {
    await page.locator('.faw-item-draggable').nth(0).dragTo(page.locator('.faw-drop-zone').nth(0));
    await expect(page.locator('.faw-drop-zone').nth(0)).toHaveText('Meow');
  });

  test('clicking a filled zone clears it', async ({ page }) => {
    await page.locator('.faw-item-draggable').nth(0).dragTo(page.locator('.faw-drop-zone').nth(0));
    await page.locator('.faw-drop-zone').nth(0).click();
    await expect(page.locator('.faw-drop-zone').nth(0)).toHaveText('(drop here)');
  });

  test('all correct matches show faw-correct class on zones after submission', async ({ page }) => {
    await matchAll(page);
    await page.locator('button:has-text("Check Answers")').click();
    const zones = page.locator('.faw-drop-zone');
    await expect(zones.nth(0)).toHaveClass(/faw-correct/);
    await expect(zones.nth(1)).toHaveClass(/faw-correct/);
    await expect(zones.nth(2)).toHaveClass(/faw-correct/);
  });

  test('score feedback shows on submission', async ({ page }) => {
    await matchAll(page);
    await page.locator('button:has-text("Check Answers")').click();
    await expect(page.locator('.faw-feedback')).toContainText('3/3 correct');
  });

  test('model.set is called with matches data on submission', async ({ page }) => {
    await matchAll(page);
    await page.locator('button:has-text("Check Answers")').click();
    const setCalls = await page.evaluate(() => window._setCalls);
    const finalCall = setCalls.filter(([k]) => k === 'value').at(-1);
    expect(finalCall).toBeTruthy();
    expect(finalCall[1].correct).toBe(true);
    expect(finalCall[1].score).toBe(3);
  });
});
