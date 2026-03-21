import styles from './styles.css';
import { addHelpButton } from './help.js';
import { mk } from './utils.js';

const HELP_TEXT = {
  en: 'Drag items from the right column and drop them into the matching slots in the middle column. Click a placed item to remove it and try again. All items must be matched before you can check your answers.',
  fr: 'Faites glisser les éléments de la colonne droite et déposez-les dans les emplacements correspondants de la colonne centrale. Cliquez sur un élément placé pour le retirer. Tous les éléments doivent être appariés avant de vérifier.',
  es: 'Arrastre los elementos de la columna derecha y suéltelos en las ranuras correspondientes de la columna central. Haga clic en un elemento colocado para eliminarlo. Todos los elementos deben estar emparejados antes de verificar.',
};

function render({ model, el }) {
  const s = mk('style'); s.textContent = styles; el.appendChild(s);
  const container = mk('div', 'faw');
  container.appendChild(mk('div', 'faw-question', model.get('question')));
  container.appendChild(mk('div', 'faw-instructions', 'Drag labels from the right column to match with items on the left:'));

  const left = model.get('left'), right = model.get('right');
  const correctMap = Object.fromEntries(Object.entries(model.get('correct_matches')).map(([k, v]) => [+k, +v]));
  const matches = {};
  let submitted = false;

  const grid = mk('div', 'faw-matching-three-col');
  const leftCol = mk('div', 'faw-column'), midCol = mk('div', 'faw-column'), rightCol = mk('div', 'faw-column');

  const leftItems = left.map(text => { const d = mk('div', 'faw-item-fixed', text); leftCol.appendChild(d); return d; });

  const zones = left.map((_, li) => {
    const z = mk('div', 'faw-drop-zone', '(drop here)');
    z.addEventListener('dragover', e => { if (submitted) return; e.preventDefault(); z.classList.add('faw-drop-target'); });
    z.addEventListener('dragleave', () => z.classList.remove('faw-drop-target'));
    z.addEventListener('drop', e => {
      if (submitted) return;
      e.preventDefault(); z.classList.remove('faw-drop-target');
      const ri = parseInt(e.dataTransfer.getData('text/plain'));
      z.textContent = right[ri]; z.className = 'faw-drop-zone faw-filled';
      matches[li] = ri; sync();
      z.addEventListener('click', () => {
        if (submitted) return;
        z.textContent = '(drop here)'; z.className = 'faw-drop-zone';
        delete matches[li]; sync();
      });
    });
    midCol.appendChild(z);
    return z;
  });

  right.forEach((text, i) => {
    const d = mk('div', 'faw-item-draggable', text); d.draggable = true;
    d.addEventListener('dragstart', e => { if (submitted) return; d.classList.add('faw-dragging'); e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', i); });
    d.addEventListener('dragend', () => d.classList.remove('faw-dragging'));
    rightCol.appendChild(d);
  });

  grid.append(leftCol, midCol, rightCol);
  container.appendChild(grid);

  const submitBtn = mk('button', 'faw-btn faw-btn-primary', 'Check Answers'); submitBtn.style.marginBottom = '16px';
  submitBtn.addEventListener('click', () => {
    if (submitted) return;
    if (Object.keys(matches).length !== left.length) { alert('Please match all items before checking answers.'); return; }
    submitted = true; submitBtn.disabled = true;
    rightCol.querySelectorAll('.faw-item-draggable').forEach(d => { d.draggable = false; d.style.cssText = 'cursor:default;opacity:.5'; });
    let score = 0;
    zones.forEach((z, li) => {
      const ok = matches[li] === correctMap[li];
      if (ok) score++;
      leftItems[li].classList.add(ok ? 'faw-correct' : 'faw-incorrect');
      z.classList.add(ok ? 'faw-correct' : 'faw-incorrect');
      z.appendChild(mk('span', ok ? 'faw-correct' : 'faw-incorrect', ok ? ' ✓' : ' ✗'));
    });
    container.appendChild(mk('div', `faw-feedback ${score === left.length ? 'faw-correct' : 'faw-incorrect'}`, `Score: ${score}/${left.length} correct`));
    model.set('value', { matches, correct: score === left.length, score, total: left.length });
    model.save_changes();
  });

  container.appendChild(submitBtn);
  addHelpButton(container, model.get('lang'), HELP_TEXT);
  el.appendChild(container);

  function sync() { model.set('value', { matches, correct: false, score: 0, total: left.length }); model.save_changes(); }
}

export default { render };
