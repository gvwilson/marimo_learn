import styles from './styles.css';
import { addHelpButton } from './help.js';

const HELP_TEXT = {
  en: 'Read the front of each card, then click Flip to see the answer. Rate how well you knew it: Got it (you knew it), Almost (close but not quite), or No (didn\'t know it). Cards rated Almost or No will reappear until you get them right.',
  fr: 'Lisez le recto de la carte, puis cliquez sur Retourner pour voir la réponse. Évaluez : Compris (vous le saviez), Presque (proche) ou Non (vous ne le saviez pas). Les cartes notées Presque ou Non réapparaîtront.',
  es: 'Lea el frente de la tarjeta y haga clic en Voltear para ver la respuesta. Califique: Entendido (lo sabía), Casi (cerca) o No (no lo sabía). Las tarjetas con Casi o No reaparecerán hasta que las domine.',
};

function mk(tag, cls, txt) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== undefined) el.textContent = txt;
  return el;
}

function render({ model, el }) {
  const s = mk('style'); s.textContent = styles; el.appendChild(s);
  const container = mk('div', 'faw');

  const q = model.get('question');
  if (q) container.appendChild(mk('div', 'faw-question', q));

  const cards = model.get('cards');
  const total = cards.length;
  const done = new Set();
  const results = {};

  // Build initial queue (0..n-1), shuffle if requested
  let queue = cards.map((_, i) => i);
  if (model.get('shuffle')) {
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }

  // Progress bar
  const progressWrap = mk('div', 'faw-progress');
  const progressFill = mk('div', 'faw-progress-fill'); progressFill.style.width = '0%';
  progressWrap.appendChild(progressFill);
  container.appendChild(progressWrap);

  const counterEl = mk('div', 'faw-instructions');
  container.appendChild(counterEl);

  // Card face
  const cardEl = mk('div', 'faw-card faw-card-front');
  container.appendChild(cardEl);

  // Flip button
  const flipBtn = mk('button', 'faw-btn faw-btn-secondary', 'Flip');
  flipBtn.style.marginBottom = '12px';
  container.appendChild(flipBtn);

  // Rating buttons (hidden until flipped)
  const ratingRow = mk('div', 'faw-rating-btns'); ratingRow.style.display = 'none';
  const gotItBtn  = mk('button', 'faw-btn faw-btn-primary', '✓ Got it');
  const almostBtn = mk('button', 'faw-btn faw-btn-secondary', '~ Almost');
  const noBtn     = mk('button', 'faw-btn faw-btn-danger', '✗ No');
  ratingRow.append(gotItBtn, almostBtn, noBtn);
  container.appendChild(ratingRow);

  function updateCounter() {
    if (queue.length === 0) return;
    counterEl.textContent = `Card ${done.size + 1} of ${total} — ${queue.length} remaining in queue`;
  }

  function showCard() {
    if (queue.length === 0) return;
    const idx = queue[0];
    cardEl.textContent = cards[idx].front;
    cardEl.className = 'faw-card faw-card-front';
    flipBtn.style.display = '';
    ratingRow.style.display = 'none';
    updateCounter();
  }

  function showComplete() {
    cardEl.textContent = '🎉 All cards reviewed!';
    cardEl.className = 'faw-card faw-card-back';
    counterEl.textContent = `Completed ${total} card${total !== 1 ? 's' : ''}.`;
    flipBtn.style.display = 'none';
    ratingRow.style.display = 'none';
    progressFill.style.width = '100%';
    const restartBtn = mk('button', 'faw-btn faw-btn-secondary', 'Restart');
    restartBtn.addEventListener('click', () => {
      done.clear();
      queue = cards.map((_, i) => i);
      if (model.get('shuffle')) {
        for (let i = queue.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [queue[i], queue[j]] = [queue[j], queue[i]];
        }
      }
      restartBtn.remove();
      showCard();
    });
    container.appendChild(restartBtn);
  }

  flipBtn.addEventListener('click', () => {
    const idx = queue[0];
    cardEl.textContent = cards[idx].back;
    cardEl.className = 'faw-card faw-card-back';
    flipBtn.style.display = 'none';
    ratingRow.style.display = 'flex';
  });

  function rate(rating) {
    const idx = queue.shift();
    if (!results[idx]) results[idx] = { attempts: 0 };
    results[idx].rating = rating;
    results[idx].attempts++;
    if (rating === 'got_it') {
      done.add(idx);
    } else if (rating === 'almost') {
      queue.splice(Math.min(2, queue.length), 0, idx);
    } else {
      queue.splice(Math.min(1, queue.length), 0, idx);
    }
    progressFill.style.width = `${Math.round(done.size / total * 100)}%`;
    model.set('value', { results, complete: done.size === total });
    model.save_changes();
    if (done.size === total) showComplete(); else showCard();
  }

  gotItBtn.addEventListener('click', () => rate('got_it'));
  almostBtn.addEventListener('click', () => rate('almost'));
  noBtn.addEventListener('click', () => rate('no'));

  showCard();
  addHelpButton(container, model.get('lang'), HELP_TEXT);
  el.appendChild(container);
}

export default { render };
