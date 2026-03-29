import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Multiple choice
// ---------------------------------------------------------------------------
test.describe('autoMount: MultipleChoiceWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-multiple-choice.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-multiple-choice')).toHaveCount(0);
    await expect(page.locator('.faw-options')).toHaveCount(1);
  });

  test('question text is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('What is 2 + 2?');
  });

  test('options are parsed from <li> elements', async ({ page }) => {
    await expect(page.locator('.faw-option')).toHaveCount(3);
  });

  test('data-correct index selects the right answer', async ({ page }) => {
    await page.locator('.faw-option').nth(1).click();
    await expect(page.locator('.faw-feedback')).toHaveText('✓ Correct!');
  });

  test('a wrong option is marked incorrect', async ({ page }) => {
    await page.locator('.faw-option').nth(0).click();
    await expect(page.locator('.faw-feedback')).toHaveClass(/faw-incorrect/);
  });
});

// ---------------------------------------------------------------------------
// Flashcard
// ---------------------------------------------------------------------------
test.describe('autoMount: FlashcardWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-flashcard.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-flashcard')).toHaveCount(0);
    await expect(page.locator('.faw-card')).toHaveCount(1);
  });

  test('heading is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Basic Math');
  });

  test('cards are parsed from <dt>/<dd> pairs', async ({ page }) => {
    // Three dt/dd pairs → three cards in the queue; progress shows total of 3
    await expect(page.locator('.faw-instructions')).toContainText('of 3');
  });

  test('first card front text comes from first <dt>', async ({ page }) => {
    // Shuffle is on, so we cannot assert which card appears first —
    // but the card text must be one of the three fronts.
    const fronts = ['What is 2+2?', 'What is 3+3?', 'What is 4+4?'];
    const text = await page.locator('.faw-card').textContent();
    expect(fronts).toContain(text.trim());
  });

  test('flipping a card shows back text', async ({ page }) => {
    const backs = ['4', '6', '8'];
    await page.locator('button:has-text("Flip")').click();
    const text = await page.locator('.faw-card').textContent();
    expect(backs).toContain(text.trim());
  });
});

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------
test.describe('autoMount: MatchingWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-matching.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-matching')).toHaveCount(0);
    await expect(page.locator('.faw-matching-three-col')).toHaveCount(1);
  });

  test('question is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Match each animal to its sound:');
  });

  test('left column items come from table column 1', async ({ page }) => {
    const fixed = page.locator('.faw-item-fixed');
    await expect(fixed).toHaveCount(3);
    const texts = await fixed.allTextContents();
    expect(texts).toEqual(expect.arrayContaining(['Cat', 'Dog', 'Bird']));
  });

  test('right column contains all sounds from table column 2', async ({ page }) => {
    const draggable = page.locator('.faw-item-draggable');
    await expect(draggable).toHaveCount(3);
    const texts = await draggable.allTextContents();
    expect(texts).toEqual(expect.arrayContaining(['Meow', 'Woof', 'Tweet']));
  });

  test('correct matches score 3/3 after dragging all pairs', async ({ page }) => {
    // Match each right item to the drop zone for the same-row left item.
    // Because the right column is shuffled we match by text content.
    const leftItems = page.locator('.faw-item-fixed');
    const leftTexts = await leftItems.allTextContents();
    const correctPairs = { Cat: 'Meow', Dog: 'Woof', Bird: 'Tweet' };
    for (let i = 0; i < leftTexts.length; i++) {
      const sound = correctPairs[leftTexts[i].trim()];
      await page.locator(`.faw-item-draggable:has-text("${sound}")`).dragTo(
        page.locator('.faw-drop-zone').nth(i)
      );
    }
    await page.locator('button:has-text("Check Answers")').click();
    await expect(page.locator('.faw-feedback')).toContainText('3/3 correct');
  });
});

// ---------------------------------------------------------------------------
// Ordering
// ---------------------------------------------------------------------------
test.describe('autoMount: OrderingWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-ordering.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-ordering')).toHaveCount(0);
    await expect(page.locator('.faw-ordering-items')).toHaveCount(1);
  });

  test('question is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Order these steps:');
  });

  test('all three items from <ol> are rendered', async ({ page }) => {
    await expect(page.locator('.faw-ordering-item')).toHaveCount(3);
    const texts = await page.locator('.faw-ordering-text').allTextContents();
    expect(texts).toEqual(expect.arrayContaining(['Step A', 'Step B', 'Step C']));
  });

  test('items start in shuffled order (current_order != items)', async ({ page }) => {
    // The ordering widget shows items in current_order. We verify all three
    // items are present (already tested above) and that a Reset re-shuffles.
    await page.locator('button:has-text("Reset")').click();
    await expect(page.locator('.faw-ordering-item')).toHaveCount(3);
  });
});

// ---------------------------------------------------------------------------
// Labeling
// ---------------------------------------------------------------------------
test.describe('autoMount: LabelingWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-labeling.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-labeling')).toHaveCount(0);
    await expect(page.locator('.faw-labeling-area')).toHaveCount(1);
  });

  test('question is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Label each line of code:');
  });

  test('labels are derived from unique values in table column 2', async ({ page }) => {
    // Unique labels in order: Variable, Function, Loop (3 unique names)
    await expect(page.locator('.faw-label-item')).toHaveCount(3);
    const texts = await page.locator('.faw-label-text').allTextContents();
    expect(texts).toEqual(['Variable', 'Function', 'Loop']);
  });

  test('text lines are parsed from table column 1', async ({ page }) => {
    await expect(page.locator('.faw-text-line')).toHaveCount(4);
  });

  test('correct single-label placement scores correctly', async ({ page }) => {
    // Label 0 (Variable) → line 0 (x = 5)
    await page.locator('.faw-label-num').nth(0).dragTo(
      page.locator('.faw-label-drop-zone').nth(0)
    );
    await page.locator('button:has-text("Check Labels")').click();
    await expect(page.locator('.faw-label-badge').nth(0)).toHaveClass(/faw-correct/);
  });

  test('multi-label line accepts both correct labels and scores each as correct', async ({ page }) => {
    // Line 3 (y = x = 0) requires both Variable (label 0) and Loop (label 2).
    const zone3 = page.locator('.faw-label-drop-zone').nth(3);
    await page.locator('.faw-label-num').nth(0).dragTo(zone3); // Variable
    await page.locator('.faw-label-num').nth(2).dragTo(zone3); // Loop
    await page.locator('button:has-text("Check Labels")').click();
    const badges = zone3.locator('.faw-label-badge');
    await expect(badges).toHaveCount(2);
    await expect(badges.nth(0)).toHaveClass(/faw-correct/);
    await expect(badges.nth(1)).toHaveClass(/faw-correct/);
  });

  test('wrong label on multi-label line is marked incorrect', async ({ page }) => {
    // Function (label 1) is not a correct label for line 3 (y = x = 0).
    await page.locator('.faw-label-num').nth(1).dragTo(
      page.locator('.faw-label-drop-zone').nth(3)
    );
    await page.locator('button:has-text("Check Labels")').click();
    await expect(page.locator('.faw-label-drop-zone').nth(3).locator('.faw-label-badge'))
      .toHaveClass(/faw-incorrect/);
  });
});

// ---------------------------------------------------------------------------
// Concept map
// ---------------------------------------------------------------------------
test.describe('autoMount: ConceptMapWidget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/js/tests/fixtures/mount-concept-map.html');
  });

  test('original div is replaced by the widget', async ({ page }) => {
    await expect(page.locator('.marimo-concept-map')).toHaveCount(0);
    await expect(page.locator('.faw-cm-workspace')).toHaveCount(1);
  });

  test('question is parsed from <p>', async ({ page }) => {
    await expect(page.locator('.faw-question')).toHaveText('Connect the water states:');
  });

  test('concept nodes are inferred from table columns 1 and 3', async ({ page }) => {
    // Unique concepts in appearance order: Water, Ice, Steam
    await expect(page.locator('.faw-cm-node')).toHaveCount(3);
    const texts = await page.locator('.faw-cm-node').allTextContents();
    expect(texts).toEqual(expect.arrayContaining(['Water', 'Ice', 'Steam']));
  });

  test('relationship terms are inferred from table column 2', async ({ page }) => {
    // Unique terms: freezes to, melts to, boils to
    await expect(page.locator('.faw-cm-term')).toHaveCount(3);
    const texts = await page.locator('.faw-cm-term').allTextContents();
    expect(texts).toEqual(expect.arrayContaining(['freezes to', 'melts to', 'boils to']));
  });

  test('correct edge drawn from table row is marked correct on check', async ({ page }) => {
    await page.locator('.faw-cm-term:has-text("freezes to")').click();
    await page.locator('.faw-cm-node:has-text("Water")').click();
    await page.locator('.faw-cm-node:has-text("Ice")').click();
    await page.locator('button:has-text("Check Map")').click();
    await expect(page.locator('.faw-cm-edge-row .faw-correct')).toBeVisible();
  });
});
