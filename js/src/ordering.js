import styles from './styles.css';
import { addHelpButton } from './help.js';
import { mk, shuffle } from './utils.js';

const HELP_TEXT = {
  en: 'Drag the items up or down to arrange them in the correct order. Click Check Order to submit your answer, or Reset to shuffle and start over.',
  fr: 'Faites glisser les éléments vers le haut ou le bas pour les mettre dans le bon ordre. Cliquez sur Vérifier l\'ordre pour soumettre, ou Réinitialiser pour recommencer.',
  es: 'Arrastre los elementos hacia arriba o abajo para ordenarlos correctamente. Haga clic en Verificar orden para enviar su respuesta, o Restablecer para comenzar de nuevo.',
};

function render({ model, el }) {
  const s = mk('style'); s.textContent = styles; el.appendChild(s);
  const container = mk('div', 'faw');
  container.appendChild(mk('div', 'faw-question', model.get('question')));
  container.appendChild(mk('div', 'faw-instructions', 'Drag items to arrange them in the correct order:'));

  const correct = model.get('items');
  let current = model.get('current_order') || [...correct];
  let submitted = false;

  const itemsEl = mk('div', 'faw-ordering-items');
  const feedbackEl = mk('div'); feedbackEl.style.display = 'none';

  function renderItems() {
    itemsEl.innerHTML = '';
    current.forEach((text, i) => {
      const item = mk('div', 'faw-ordering-item');
      item.draggable = !submitted;
      item.append(mk('div', 'faw-position', i + 1), mk('div', 'faw-ordering-text', text));
      if (!submitted) {
        item.addEventListener('dragstart', e => { item.classList.add('faw-dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', i); });
        item.addEventListener('dragend', () => item.classList.remove('faw-dragging'));
        item.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; if (itemsEl.querySelector('.faw-dragging') !== item) item.classList.add('faw-drop-target'); });
        item.addEventListener('dragleave', () => item.classList.remove('faw-drop-target'));
        item.addEventListener('drop', e => {
          e.preventDefault(); item.classList.remove('faw-drop-target');
          const from = parseInt(e.dataTransfer.getData('text/plain'));
          if (from !== i) { current.splice(i, 0, current.splice(from, 1)[0]); renderItems(); sync(); }
        });
      }
      itemsEl.appendChild(item);
    });
  }

  renderItems();

  const btnRow = mk('div'); btnRow.style.marginBottom = '16px';
  const checkBtn = mk('button', 'faw-btn faw-btn-primary', 'Check Order'); checkBtn.style.marginRight = '12px';
  const resetBtn = mk('button', 'faw-btn faw-btn-secondary', 'Reset');

  checkBtn.addEventListener('click', () => {
    if (submitted) return;
    submitted = true; checkBtn.disabled = true; resetBtn.style.display = 'none';
    const ok = current.every((v, i) => v === correct[i]);
    [...itemsEl.querySelectorAll('.faw-ordering-item')].forEach((el, i) => {
      el.draggable = false; el.style.cursor = 'default';
      el.classList.add(current[i] === correct[i] ? 'faw-correct' : 'faw-incorrect');
    });
    feedbackEl.textContent = ok ? '✓ Correct order!' : '✗ Incorrect order';
    feedbackEl.className = `faw-feedback ${ok ? 'faw-correct' : 'faw-incorrect'}`;
    feedbackEl.style.display = 'block';
    model.set('value', { order: current, correct: ok }); model.save_changes();
  });

  resetBtn.addEventListener('click', () => {
    if (submitted) return;
    current = [...correct];
    if (model.get('shuffle')) shuffle(current);
    renderItems(); feedbackEl.style.display = 'none'; sync();
  });

  btnRow.append(checkBtn, resetBtn);
  container.append(itemsEl, btnRow, feedbackEl);
  addHelpButton(container, model.get('lang'), HELP_TEXT);
  el.appendChild(container);

  function sync() { if (!submitted) { model.set('value', { order: current, correct: false }); model.save_changes(); } }
}

export default { render };
