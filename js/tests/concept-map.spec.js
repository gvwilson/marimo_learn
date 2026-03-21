import { test, expect } from '@playwright/test';

const URL = '/js/tests/fixtures/concept-map.html';

// Helper: add an edge by selecting a term then clicking two nodes
async function addEdge(page, term, fromNode, toNode) {
  await page.locator(`.faw-cm-term:has-text("${term}")`).click();
  await page.locator(`.faw-cm-node:has-text("${fromNode}")`).click();
  await page.locator(`.faw-cm-node:has-text("${toNode}")`).click();
}

test.describe('ConceptMapWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('renders the question text', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Connect the water states:');
  });

  test('renders all concept nodes', async ({ page }) => {
    const nodes = page.locator('.faw-cm-node');
    await expect(nodes).toHaveCount(3);
    await expect(nodes.nth(0)).toContainText('Water');
    await expect(nodes.nth(1)).toContainText('Ice');
    await expect(nodes.nth(2)).toContainText('Steam');
  });

  test('renders all relationship term buttons', async ({ page }) => {
    const terms = page.locator('.faw-cm-term');
    await expect(terms).toHaveCount(3);
    await expect(terms.nth(0)).toHaveText('freezes to');
    await expect(terms.nth(1)).toHaveText('melts to');
    await expect(terms.nth(2)).toHaveText('boils to');
  });

  test('Check Map button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Check Map")')).toBeVisible();
  });

  test('Clear All button is present', async ({ page }) => {
    await expect(page.locator('button:has-text("Clear All")')).toBeVisible();
  });

  test('clicking a term gives it the selected CSS class', async ({ page }) => {
    await page.locator('.faw-cm-term').nth(0).click();
    await expect(page.locator('.faw-cm-term').nth(0)).toHaveClass(/faw-cm-term-selected/);
  });

  test('clicking a selected term deselects it', async ({ page }) => {
    await page.locator('.faw-cm-term').nth(0).click();
    await page.locator('.faw-cm-term').nth(0).click();
    await expect(page.locator('.faw-cm-term').nth(0)).not.toHaveClass(/faw-cm-term-selected/);
  });

  test('connecting two nodes adds an edge to the edge list', async ({ page }) => {
    await addEdge(page, 'freezes to', 'Water', 'Ice');
    await expect(page.locator('.faw-cm-edge-row')).toHaveCount(1);
    await expect(page.locator('.faw-cm-edge-row').nth(0)).toContainText('Water');
    await expect(page.locator('.faw-cm-edge-row').nth(0)).toContainText('Ice');
    await expect(page.locator('.faw-cm-edge-row').nth(0)).toContainText('freezes to');
  });

  test('a correct edge is marked faw-correct after checking', async ({ page }) => {
    await addEdge(page, 'freezes to', 'Water', 'Ice');
    await page.locator('button:has-text("Check Map")').click();
    await expect(page.locator('.faw-cm-edge-row').nth(0).locator('.faw-correct')).toBeVisible();
  });

  test('Clear All removes all edges from the list', async ({ page }) => {
    await addEdge(page, 'freezes to', 'Water', 'Ice');
    await addEdge(page, 'melts to', 'Ice', 'Water');
    await expect(page.locator('.faw-cm-edge-row')).toHaveCount(2);
    await page.locator('button:has-text("Clear All")').click();
    await expect(page.locator('.faw-cm-edge-row')).toHaveCount(0);
  });
});
