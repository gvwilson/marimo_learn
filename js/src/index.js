import { createModel } from './utils.js';
import conceptMap    from './concept-map.js';
import flashcard     from './flashcard.js';
import labeling      from './labeling.js';
import matching      from './matching.js';
import multipleChoice from './multiple-choice.js';
import ordering      from './ordering.js';

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
