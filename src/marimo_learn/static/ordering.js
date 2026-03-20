// src/styles.css
var styles_default = `.faw {
  position: relative;
  padding: 4px 0;
  /* Semantic color tokens \u2014 override in dark mode below */
  --faw-correct-bg: #d4edda;
  --faw-correct-color: #28a745;
  --faw-incorrect-bg: #f8d7da;
  --faw-draggable-bg: #fff3e0;
  --faw-draggable-border: #ff9800;
  --faw-drop-bg: #fff9c4;
  --faw-drop-border: #fbc02d;
  --faw-neutral-color: #94a3b8;
}

/* Dark mode overrides \u2014 matches marimo's theme toggle selectors */
.dark .faw, .dark-theme .faw, [data-theme="dark"] .faw {
  --faw-correct-bg: #14532d;
  --faw-correct-color: #4ade80;
  --faw-incorrect-bg: #450a0a;
  --faw-draggable-bg: #431407;
  --faw-draggable-border: #ea580c;
  --faw-drop-bg: #422006;
  --faw-drop-border: #ca8a04;
  --faw-neutral-color: #64748b;
}

.faw-question { font-size: 1.1em; font-weight: 600; margin-bottom: 12px; }
.faw-instructions { font-size: 0.9em; color: var(--muted-foreground); margin-bottom: 12px; }

.faw-btn {
  padding: 10px 20px; border: none; border-radius: var(--radius);
  font: inherit; font-weight: 600; cursor: pointer;
}
.faw-btn-primary { background: var(--primary); color: var(--primary-foreground); }
.faw-btn-primary:hover:not(:disabled) { opacity: 0.9; }
.faw-btn-secondary { background: var(--secondary); color: var(--secondary-foreground); border: 1px solid var(--border); }
.faw-btn-secondary:hover:not(:disabled) { opacity: 0.85; }
.faw-btn-danger { background: var(--destructive); color: var(--primary-foreground); }
.faw-btn-danger:hover:not(:disabled) { opacity: 0.9; }
.faw-btn:disabled { opacity: 0.45; cursor: not-allowed; }

.faw-feedback { font-weight: 600; margin-top: 12px; }
.faw-correct { color: var(--faw-correct-color); }
.faw-incorrect { color: var(--destructive); }

.faw-options { margin-bottom: 12px; }
.faw-option {
  padding: 10px; margin: 6px 0;
  border: 2px solid var(--border); border-radius: var(--radius);
  cursor: pointer; transition: background .2s, border-color .2s;
}
.faw-option:hover:not(.faw-answered) { background: var(--accent); border-color: var(--primary); }
.faw-option.faw-answered { cursor: not-allowed; }
.faw-option.faw-correct { background: var(--faw-correct-bg); border-color: var(--faw-correct-color); }
.faw-option.faw-incorrect { background: var(--faw-incorrect-bg); border-color: var(--destructive); }
.faw-option.faw-faded { opacity: .5; }
.faw-explanation {
  padding: 10px; margin-top: 10px;
  background: var(--muted); border-left: 4px solid var(--primary); border-radius: var(--radius);
}

.faw-matching-three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.faw-column { display: flex; flex-direction: column; gap: 10px; }
.faw-item-fixed {
  padding: 10px; background: var(--accent); border: 2px solid var(--primary);
  border-radius: var(--radius); font-weight: 500;
}
.faw-item-fixed.faw-correct { background: var(--faw-correct-bg); border-color: var(--faw-correct-color); }
.faw-item-fixed.faw-incorrect { background: var(--faw-incorrect-bg); border-color: var(--destructive); }
.faw-drop-zone {
  padding: 10px; min-height: 40px; background: var(--muted);
  border: 2px dashed var(--border); border-radius: var(--radius);
  text-align: center; color: var(--muted-foreground); font-style: italic;
  cursor: pointer; transition: all .2s;
}
.faw-drop-zone.faw-filled { background: var(--secondary); border-style: solid; color: inherit; font-style: normal; font-weight: 500; }
.faw-drop-zone.faw-drop-target, .faw-label-drop-zone.faw-drop-target { background: var(--faw-drop-bg); border-color: var(--faw-drop-border); }
.faw-drop-zone.faw-correct { background: var(--faw-correct-bg); border-color: var(--faw-correct-color); }
.faw-drop-zone.faw-incorrect { background: var(--faw-incorrect-bg); border-color: var(--destructive); }
.faw-item-draggable {
  padding: 10px; background: var(--faw-draggable-bg); border: 2px solid var(--faw-draggable-border);
  border-radius: var(--radius); font-weight: 500;
}

.faw-ordering-items { margin-bottom: 16px; }
.faw-ordering-item {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 6px; padding: 10px;
  border: 2px solid var(--border); border-radius: var(--radius);
}
.faw-ordering-item.faw-drop-target { background: var(--faw-drop-bg); border-style: dashed; }
.faw-ordering-item.faw-correct { background: var(--faw-correct-bg); border-color: var(--faw-correct-color); }
.faw-ordering-item.faw-incorrect { background: var(--faw-incorrect-bg); border-color: var(--destructive); }
.faw-ordering-text { flex: 1; }

.faw-ordering-item, .faw-item-draggable, .faw-label-num, .faw-label-badge { cursor: grab; }
.faw-ordering-item:active, .faw-item-draggable:active, .faw-label-num:active, .faw-label-badge:active { cursor: grabbing; }
.faw-ordering-item.faw-dragging, .faw-item-draggable.faw-dragging, .faw-label-num.faw-dragging, .faw-label-badge.faw-dragging { opacity: .5; }

.faw-position, .faw-label-num {
  min-width: 30px; height: 30px; background: var(--primary); color: var(--primary-foreground);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-weight: 600; flex-shrink: 0;
}
.faw-label-badge {
  min-width: 24px; height: 24px; background: var(--primary); color: var(--primary-foreground);
  border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 0.8em; font-weight: 600; flex-shrink: 0;
}
.faw-label-badge.faw-correct { background: var(--faw-correct-color); color: white; }
.faw-label-badge.faw-incorrect { background: var(--destructive); color: white; }

.faw-labeling-area { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-bottom: 16px; }
.faw-labeling-labels, .faw-labeling-text { display: flex; flex-direction: column; gap: 10px; }
.faw-labeling-title { font-weight: 600; color: var(--muted-foreground); margin-bottom: 6px; }
.faw-label-item { display: flex; align-items: center; gap: 8px; padding: 6px; border-radius: var(--radius); }
.faw-text-lines { display: flex; flex-direction: column; gap: 8px; }
.faw-text-line { display: flex; align-items: flex-start; gap: 8px; }
.faw-label-drop-zone {
  min-width: 60px; min-height: 30px; padding: 4px;
  background: var(--muted); border: 2px dashed var(--border); border-radius: var(--radius);
  display: flex; flex-wrap: wrap; gap: 4px; align-content: flex-start; flex-shrink: 0;
}
.faw-text-content { flex: 1; padding: 4px 0; line-height: 1.5; }

.faw-card {
  min-height: 140px; padding: 32px 20px; border-radius: var(--radius);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2em; text-align: center; margin-bottom: 12px; transition: all .3s;
}
.faw-card-front { background: var(--accent); border: 2px solid var(--primary); }
.faw-card-back  { background: var(--muted); border: 2px solid var(--border); }
.faw-rating-btns { display: flex; gap: 8px; margin-bottom: 12px; }
.faw-progress { height: 6px; background: var(--muted); border-radius: 4px; margin-bottom: 10px; }
.faw-progress-fill { height: 100%; background: var(--primary); border-radius: 4px; transition: width .3s; }

.faw-cm-workspace {
  position: relative; height: 360px;
  border: 1px solid var(--border); border-radius: var(--radius);
  margin-bottom: 12px; overflow: hidden; background: var(--muted);
}
.faw-cm-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; }
.faw-cm-node {
  position: absolute; transform: translate(-50%, -50%);
  padding: 8px 14px; background: var(--card); border: 2px solid var(--primary);
  border-radius: var(--radius); cursor: move; user-select: none;
  font-weight: 500; z-index: 1; white-space: nowrap;
}
.faw-cm-node.faw-cm-pending { box-shadow: 0 0 0 3px var(--primary); background: var(--accent); }
.faw-cm-terms { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
.faw-cm-term {
  padding: 5px 14px; border: 2px solid var(--border); border-radius: 20px;
  background: var(--muted); cursor: pointer; font: inherit; font-size: 0.9em; transition: all .15s;
}
.faw-cm-term:hover:not(:disabled) { border-color: var(--primary); background: var(--accent); }
.faw-cm-term.faw-cm-term-selected { background: var(--primary); color: var(--primary-foreground); border-color: var(--primary); }
.faw-cm-term:disabled { opacity: 0.45; cursor: not-allowed; }
.faw-cm-edge-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
.faw-cm-edge-row {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 8px; background: var(--muted); border-radius: var(--radius); font-size: 0.9em;
}
.faw-cm-edge-label { padding: 2px 8px; background: var(--accent); border-radius: 10px; font-size: 0.85em; font-weight: 500; }
.faw-cm-edge-remove { margin-left: auto; background: none; border: none; cursor: pointer; color: var(--muted-foreground); padding: 2px 4px; border-radius: 4px; }
.faw-cm-edge-remove:hover { color: var(--destructive); background: var(--faw-incorrect-bg); }

.faw-help-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--muted);
  color: var(--muted-foreground);
  font: 600 0.8em/1 inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 10;
}
.faw-help-btn:hover { background: var(--accent); border-color: var(--primary); color: var(--foreground); }

.faw-help-popup {
  position: absolute;
  top: calc(22px + 12px);
  right: 0;
  min-width: 200px;
  max-width: 320px;
  padding: 10px 14px;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.9em;
  line-height: 1.5;
  z-index: 20;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
`;

// src/help.js
function addHelpButton(container, lang, helpText) {
  const text = helpText[lang] || helpText["en"];
  const popup = document.createElement("div");
  popup.className = "faw-help-popup";
  popup.textContent = text;
  popup.hidden = true;
  const btn = document.createElement("button");
  btn.className = "faw-help-btn";
  btn.textContent = "?";
  btn.setAttribute("aria-label", "Help");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.hidden = !popup.hidden;
  });
  document.addEventListener("click", () => {
    popup.hidden = true;
  });
  container.append(popup, btn);
}

// src/ordering.js
var HELP_TEXT = {
  en: "Drag the items up or down to arrange them in the correct order. Click Check Order to submit your answer, or Reset to shuffle and start over.",
  fr: "Faites glisser les \xE9l\xE9ments vers le haut ou le bas pour les mettre dans le bon ordre. Cliquez sur V\xE9rifier l'ordre pour soumettre, ou R\xE9initialiser pour recommencer.",
  es: "Arrastre los elementos hacia arriba o abajo para ordenarlos correctamente. Haga clic en Verificar orden para enviar su respuesta, o Restablecer para comenzar de nuevo."
};
function mk(tag, cls, txt) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== void 0) el.textContent = txt;
  return el;
}
function render({ model, el }) {
  const s = mk("style");
  s.textContent = styles_default;
  el.appendChild(s);
  const container = mk("div", "faw");
  container.appendChild(mk("div", "faw-question", model.get("question")));
  container.appendChild(mk("div", "faw-instructions", "Drag items to arrange them in the correct order:"));
  const correct = model.get("items");
  let current = model.get("current_order") || [...correct];
  let submitted = false;
  const itemsEl = mk("div", "faw-ordering-items");
  const feedbackEl = mk("div");
  feedbackEl.style.display = "none";
  function renderItems() {
    itemsEl.innerHTML = "";
    current.forEach((text, i) => {
      const item = mk("div", "faw-ordering-item");
      item.draggable = !submitted;
      item.append(mk("div", "faw-position", i + 1), mk("div", "faw-ordering-text", text));
      if (!submitted) {
        item.addEventListener("dragstart", (e) => {
          item.classList.add("faw-dragging");
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", i);
        });
        item.addEventListener("dragend", () => item.classList.remove("faw-dragging"));
        item.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          if (itemsEl.querySelector(".faw-dragging") !== item) item.classList.add("faw-drop-target");
        });
        item.addEventListener("dragleave", () => item.classList.remove("faw-drop-target"));
        item.addEventListener("drop", (e) => {
          e.preventDefault();
          item.classList.remove("faw-drop-target");
          const from = parseInt(e.dataTransfer.getData("text/plain"));
          if (from !== i) {
            current.splice(i, 0, current.splice(from, 1)[0]);
            renderItems();
            sync();
          }
        });
      }
      itemsEl.appendChild(item);
    });
  }
  renderItems();
  const btnRow = mk("div");
  btnRow.style.marginBottom = "16px";
  const checkBtn = mk("button", "faw-btn faw-btn-primary", "Check Order");
  checkBtn.style.marginRight = "12px";
  const resetBtn = mk("button", "faw-btn faw-btn-secondary", "Reset");
  checkBtn.addEventListener("click", () => {
    if (submitted) return;
    submitted = true;
    checkBtn.disabled = true;
    resetBtn.style.display = "none";
    const ok = current.every((v, i) => v === correct[i]);
    [...itemsEl.querySelectorAll(".faw-ordering-item")].forEach((el2, i) => {
      el2.draggable = false;
      el2.style.cursor = "default";
      el2.classList.add(current[i] === correct[i] ? "faw-correct" : "faw-incorrect");
    });
    feedbackEl.textContent = ok ? "\u2713 Correct order!" : "\u2717 Incorrect order";
    feedbackEl.className = `faw-feedback ${ok ? "faw-correct" : "faw-incorrect"}`;
    feedbackEl.style.display = "block";
    model.set("value", { order: current, correct: ok });
    model.save_changes();
  });
  resetBtn.addEventListener("click", () => {
    if (submitted) return;
    current = [...correct];
    if (model.get("shuffle")) for (let i = current.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [current[i], current[j]] = [current[j], current[i]];
    }
    renderItems();
    feedbackEl.style.display = "none";
    sync();
  });
  btnRow.append(checkBtn, resetBtn);
  container.append(itemsEl, btnRow, feedbackEl);
  addHelpButton(container, model.get("lang"), HELP_TEXT);
  el.appendChild(container);
  function sync() {
    if (!submitted) {
      model.set("value", { order: current, correct: false });
      model.save_changes();
    }
  }
}
var ordering_default = { render };
export {
  ordering_default as default
};
//# sourceMappingURL=ordering.js.map
