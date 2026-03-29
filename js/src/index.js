import { createModel } from './utils.js';
import conceptMap,     { parseHTML as parseConceptMap }     from './concept-map.js';
import flashcard,      { parseHTML as parseFlashcard }      from './flashcard.js';
import labeling,       { parseHTML as parseLabeling }       from './labeling.js';
import matching,       { parseHTML as parseMatching }       from './matching.js';
import multipleChoice, { parseHTML as parseMultipleChoice } from './multiple-choice.js';
import ordering,       { parseHTML as parseOrdering }       from './ordering.js';

export { createModel };

export function renderConceptMap(el, config) {
  conceptMap.render({ model: createModel(config), el });
}

export function renderFlashcard(el, config) {
  flashcard.render({ model: createModel(config), el });
}

export function renderLabeling(el, config) {
  labeling.render({ model: createModel(config), el });
}

export function renderMatching(el, config) {
  matching.render({ model: createModel(config), el });
}

export function renderMultipleChoice(el, config) {
  multipleChoice.render({ model: createModel(config), el });
}

export function renderOrdering(el, config) {
  ordering.render({ model: createModel(config), el });
}

// Map each identifying CSS class to its [render, parseHTML] pair.
const WIDGETS = {
  'marimo-concept-map':     [conceptMap.render,     parseConceptMap],
  'marimo-flashcard':       [flashcard.render,      parseFlashcard],
  'marimo-labeling':        [labeling.render,       parseLabeling],
  'marimo-matching':        [matching.render,       parseMatching],
  'marimo-multiple-choice': [multipleChoice.render, parseMultipleChoice],
  'marimo-ordering':        [ordering.render,       parseOrdering],
};

// Find all widget divs under `root`, parse their HTML configuration, replace each
// div with the live rendered widget.  Defaults to scanning the whole document.
export function autoMount(root = document) {
  for (const [cls, [render, parse]] of Object.entries(WIDGETS)) {
    root.querySelectorAll(`.${cls}`).forEach(div => {
      const container = document.createElement('div');
      div.replaceWith(container);
      render({ model: createModel(parse(div)), el: container });
    });
  }
}

// When loaded as a plain <script type="module"> tag, mount automatically.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => autoMount());
  } else {
    autoMount();
  }
}
