import styles from './styles.css';
import { addHelpButton } from './help.js';
import { mk } from './utils.js';

const HELP_TEXT = {
  en: 'Drag the numbered labels from the left panel and drop them onto the correct text lines on the right. You can remove a placed label by dragging it outside the text area. Click Check Labels when done.',
  fr: 'Faites glisser les étiquettes numérotées du panneau gauche et déposez-les sur les lignes de texte correctes à droite. Supprimez une étiquette en la faisant glisser hors de la zone de texte. Cliquez sur Vérifier les étiquettes quand vous avez terminé.',
  es: 'Arrastre las etiquetas numeradas del panel izquierdo y suéltelas en las líneas de texto correctas de la derecha. Elimine una etiqueta arrastrándola fuera del área de texto. Haga clic en Verificar etiquetas cuando termine.',
};

function render({ model, el }) {
  const s = mk('style'); s.textContent = styles; el.appendChild(s);
  const container = mk('div', 'faw');
  container.appendChild(mk('div', 'faw-question', model.get('question')));
  container.appendChild(mk('div', 'faw-instructions', 'Drag label numbers to text lines. Drag outside to remove.'));

  const labels = model.get('labels'), textLines = model.get('text_lines'), correctLabels = model.get('correct_labels');
  const placed = {};
  let submitted = false;

  const area = mk('div', 'faw-labeling-area');
  const labelsCol = mk('div', 'faw-labeling-labels'), textCol = mk('div', 'faw-labeling-text');
  labelsCol.appendChild(mk('div', 'faw-labeling-title', 'Available Labels:'));
  textCol.appendChild(mk('div', 'faw-labeling-title', 'Text:'));

  labels.forEach((text, i) => {
    const item = mk('div', 'faw-label-item');
    const num = mk('span', 'faw-label-num', i + 1); num.draggable = true;
    num.addEventListener('dragstart', e => { if (submitted) return; e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', i); num.classList.add('faw-dragging'); });
    num.addEventListener('dragend', () => num.classList.remove('faw-dragging'));
    item.append(num, mk('span', 'faw-label-text', text));
    labelsCol.appendChild(item);
  });

  const linesEl = mk('div', 'faw-text-lines');

  function renderBadges(zone, lineIdx) {
    zone.innerHTML = '';
    (placed[lineIdx] || []).forEach(li => {
      const b = mk('span', 'faw-label-badge', li + 1); b.draggable = !submitted; b.dataset.labelIndex = li;
      if (!submitted) {
        b.addEventListener('dragstart', e => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', JSON.stringify({ li, from: lineIdx })); b.classList.add('faw-dragging'); });
        b.addEventListener('dragend', e => {
          b.classList.remove('faw-dragging');
          if (e.clientX < textCol.getBoundingClientRect().left) {
            placed[lineIdx] = placed[lineIdx].filter(x => x !== li);
            if (!placed[lineIdx].length) delete placed[lineIdx];
            renderBadges(zone, lineIdx); sync();
          }
        });
      }
      zone.appendChild(b);
    });
  }

  textLines.forEach((text, lineIdx) => {
    const line = mk('div', 'faw-text-line');
    const zone = mk('div', 'faw-label-drop-zone');
    zone.addEventListener('dragover', e => { if (submitted) return; e.preventDefault(); zone.classList.add('faw-drop-target'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('faw-drop-target'));
    zone.addEventListener('drop', e => {
      if (submitted) return;
      e.preventDefault(); zone.classList.remove('faw-drop-target');
      let li, from = null;
      const raw = e.dataTransfer.getData('text/plain');
      try { const d = JSON.parse(raw); if (typeof d === 'object' && d !== null) { li = d.li; from = d.from; } else { li = d; } } catch { li = parseInt(raw); }
      if (from !== null && from !== lineIdx) {
        placed[from] = placed[from].filter(x => x !== li);
        if (!placed[from].length) delete placed[from];
        renderBadges(linesEl.children[from].querySelector('.faw-label-drop-zone'), from);
      }
      if (!placed[lineIdx]) placed[lineIdx] = [];
      if (!placed[lineIdx].includes(li)) placed[lineIdx].push(li);
      renderBadges(zone, lineIdx); sync();
    });
    line.append(zone, mk('div', 'faw-text-content', text));
    linesEl.appendChild(line);
  });

  textCol.appendChild(linesEl);
  area.append(labelsCol, textCol);
  container.appendChild(area);

  const submitBtn = mk('button', 'faw-btn faw-btn-primary', 'Check Labels'); submitBtn.style.marginTop = '16px';
  submitBtn.addEventListener('click', () => {
    if (submitted) return;
    submitted = true; submitBtn.disabled = true;
    labelsCol.querySelectorAll('.faw-label-num').forEach(n => { n.draggable = false; n.style.cursor = 'default'; });
    const total = Object.values(correctLabels).reduce((s, a) => s + a.length, 0);
    let score = 0;
    linesEl.querySelectorAll('.faw-text-line').forEach((line, lineIdx) => {
      line.querySelectorAll('.faw-label-badge').forEach(b => {
        const ok = (correctLabels[lineIdx] || []).includes(parseInt(b.dataset.labelIndex));
        if (ok) score++;
        b.classList.add(ok ? 'faw-correct' : 'faw-incorrect');
      });
    });
    const pct = total ? Math.round(score / total * 100) : 0;
    container.appendChild(mk('div', `faw-feedback ${score === total ? 'faw-correct' : 'faw-incorrect'}`, `Score: ${score}/${total} correct (${pct}%)`));
    model.set('value', { placed_labels: placed, score, total, correct: score === total });
    model.save_changes();
  });

  container.appendChild(submitBtn);
  addHelpButton(container, model.get('lang'), HELP_TEXT);
  el.appendChild(container);

  function sync() { if (!submitted) { model.set('value', { placed_labels: placed, score: 0, total: 0, correct: false }); model.save_changes(); } }
}

// Parse a <div class="marimo-labeling"> block.
// Question from the first <p>; a two-column table where column 1 is the text line
// and column 2 is comma-separated label name(s) for that line.
// The labels list is derived as unique names in first-appearance order.
export function parseHTML(div) {
  const question = div.querySelector('p')?.textContent.trim() ?? '';
  const rows     = [...div.querySelectorAll('tr')];
  const labelNames = [];
  rows.forEach(r => {
    r.cells[1].textContent.split(',').map(s => s.trim()).forEach(name => {
      if (name && !labelNames.includes(name)) labelNames.push(name);
    });
  });
  const text_lines     = rows.map(r => r.cells[0].textContent.trim());
  const correct_labels = Object.fromEntries(rows.map((r, i) => [
    i,
    r.cells[1].textContent.split(',').map(s => labelNames.indexOf(s.trim())),
  ]));
  return { question, labels: labelNames, text_lines, correct_labels, lang: div.dataset.lang ?? 'en' };
}

export default { render };
