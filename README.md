# marimo-learn

Formative assessment widgets for [marimo](https://marimo.io) notebooks.
[![Open in molab](https://molab.marimo.io/molab-shield.svg)](https://molab.marimo.io/notebooks/nb_t8ncyuR7r3buyKxZfABp2Y)

## Installation

```
pip install marimo-learn
```

## Usage in marimo

```python
from marimo_learn import FlashcardWidget, MultipleChoiceWidget, OrderingWidget
from marimo_learn import MatchingWidget, LabelingWidget, ConceptMapWidget
```

Each widget is an `anywidget` component. Pass the configuration as constructor
arguments; the widget syncs state back to Python via the `value` traitlet.

## Standalone JavaScript bundle

The widgets are also published as an npm package:

```
npm install marimo-learn
```

Or load the bundle directly in HTML:

```html
<script type="module" src="marimo-learn.js"></script>
```

The bundle auto-mounts any `.marimo-*` divs it finds in the page (see
[HTML configuration](#html-configuration) below). You can also call the render
functions manually:

```js
import { renderFlashcard, renderMultipleChoice, renderOrdering,
         renderMatching, renderLabeling, renderConceptMap } from 'marimo-learn';

renderMultipleChoice(document.getElementById('target'), {
  question: 'What is 2 + 2?',
  options: ['3', '4', '5'],
  correct_answer: 1,
  lang: 'en',
});
```

## HTML configuration

When the bundle is loaded, `autoMount()` scans the page for divs with the
class `marimo-<widget>`, parses the HTML markup inside each div, and replaces
it with a live widget. This lets you author exercises in plain HTML or
Markdown.

### Multiple choice

```html
<div class="marimo-multiple-choice" data-correct="2">
  <p>Question text</p>
  <ol>
    <li>Option A</li>
    <li>Option B</li>
    <li>Option C (correct — zero-based index matches data-correct)</li>
    <li>Option D</li>
  </ol>
</div>
```

- `data-correct` — zero-based index of the correct option (required)
- `data-lang` — language code, default `en`

### Flashcard

```html
<div class="marimo-flashcard">
  <p>Deck title (optional)</p>
  <dl>
    <dt>Front of card 1</dt>
    <dd>Back of card 1</dd>
    <dt>Front of card 2</dt>
    <dd>Back of card 2</dd>
  </dl>
</div>
```

Cards are shuffled automatically. `data-lang` sets the language (default `en`).

### Ordering

```html
<div class="marimo-ordering">
  <p>Question text</p>
  <ol>
    <li>First step (correct position)</li>
    <li>Second step</li>
    <li>Third step</li>
  </ol>
</div>
```

The `<ol>` lists items in the **correct** order. The widget shuffles them
before presenting them to the student. `data-lang` sets the language (default
`en`).

### Matching

```html
<div class="marimo-matching">
  <p>Question text</p>
  <table>
    <tr><td>Left item 1</td><td>Right item 1</td></tr>
    <tr><td>Left item 2</td><td>Right item 2</td></tr>
    <tr><td>Left item 3</td><td>Right item 3</td></tr>
  </table>
</div>
```

Each row defines a matched pair. The right column is shuffled automatically.
`data-lang` sets the language (default `en`).

### Labeling

```html
<div class="marimo-labeling">
  <p>Question text</p>
  <table>
    <tr><td>Text line 1</td><td>Label name</td></tr>
    <tr><td>Text line 2</td><td>Label name</td></tr>
    <tr><td>Text line 3</td><td>Label A, Label B</td></tr>
  </table>
</div>
```

Column 1 is the text to label; column 2 is the correct label name. Multiple
correct labels for one line are written as a comma-separated list. The
available label set is derived automatically from the unique names in column 2.
`data-lang` sets the language (default `en`).

### Concept map

```html
<div class="marimo-concept-map">
  <p>Question text</p>
  <table>
    <tr><td>Source node</td><td>relationship</td><td>Target node</td></tr>
    <tr><td>Node A</td>    <td>leads to</td>    <td>Node B</td></tr>
    <tr><td>Node B</td>    <td>leads to</td>    <td>Node C</td></tr>
  </table>
</div>
```

Each row defines one correct directed edge: source → label → target. The node
list and term list are inferred automatically from the table in
first-appearance order. `data-lang` sets the language (default `en`).
