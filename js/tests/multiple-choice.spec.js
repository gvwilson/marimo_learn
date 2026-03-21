import { test, expect } from '@playwright/test';

const URL = '/js/tests/fixtures/multiple-choice.html';

test.describe('MultipleChoiceWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('renders the question text', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('What is 2 + 2?');
  });

  test('renders all answer options', async ({ page }) => {
    const options = page.locator('.faw-option');
    await expect(options).toHaveCount(3);
    await expect(options.nth(0)).toContainText('Three');
    await expect(options.nth(1)).toContainText('Four');
    await expect(options.nth(2)).toContainText('Five');
  });

  test('clicking the correct option shows ✓ Correct! feedback', async ({ page }) => {
    await page.locator('.faw-option').nth(1).click();
    await expect(page.locator('.faw-feedback')).toHaveText('✓ Correct!');
  });

  test('correct feedback has faw-correct CSS class', async ({ page }) => {
    await page.locator('.faw-option').nth(1).click();
    await expect(page.locator('.faw-feedback')).toHaveClass(/faw-correct/);
  });

  test('clicking an incorrect option shows ✗ Incorrect feedback', async ({ page }) => {
    await page.locator('.faw-option').nth(0).click();
    await expect(page.locator('.faw-feedback')).toHaveText('✗ Incorrect');
  });

  test('incorrect feedback has faw-incorrect CSS class', async ({ page }) => {
    await page.locator('.faw-option').nth(0).click();
    await expect(page.locator('.faw-feedback')).toHaveClass(/faw-incorrect/);
  });

  test('answer is locked after first selection', async ({ page }) => {
    await page.locator('.faw-option').nth(0).click();
    const before = await page.locator('.faw-feedback').textContent();
    // Clicking a different option should have no effect
    await page.locator('.faw-option').nth(1).click();
    await expect(page.locator('.faw-feedback')).toHaveText(before);
  });

  test('explanation appears after answering', async ({ page }) => {
    await page.locator('.faw-option').nth(1).click();
    await expect(page.locator('.faw-explanation')).toBeVisible();
    await expect(page.locator('.faw-explanation')).toContainText('Two plus two equals four.');
  });

  test('model.set is called with selected index, correct flag, and answered flag', async ({ page }) => {
    await page.locator('.faw-option').nth(1).click();
    const setCalls = await page.evaluate(() => window._setCalls);
    const valueCall = setCalls.find(([k]) => k === 'value');
    expect(valueCall).toBeTruthy();
    expect(valueCall[1]).toMatchObject({ selected: 1, correct: true, answered: true });
  });

  test('unselected non-correct options get faw-faded class', async ({ page }) => {
    // Select option 0 (incorrect); option 2 should be faded since it is neither selected nor correct
    await page.locator('.faw-option').nth(0).click();
    await expect(page.locator('.faw-option').nth(2)).toHaveClass(/faw-faded/);
  });
});
