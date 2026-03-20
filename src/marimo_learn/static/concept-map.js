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

// src/concept-map.js
var HELP_TEXT = {
  en: "Select a relationship term, then click two concept nodes to draw a directed connection between them. Drag concept nodes to rearrange the layout. Click \xD7 on a connection to remove it. Click Check Map when done.",
  fr: "S\xE9lectionnez un terme de relation, puis cliquez sur deux n\u0153uds pour tracer une connexion dirig\xE9e. Faites glisser les n\u0153uds pour r\xE9organiser. Cliquez sur \xD7 pour supprimer une connexion. Cliquez sur V\xE9rifier la carte quand vous avez termin\xE9.",
  es: "Seleccione un t\xE9rmino de relaci\xF3n, luego haga clic en dos nodos para trazar una conexi\xF3n dirigida. Arrastre los nodos para reorganizarlos. Haga clic en \xD7 para eliminar una conexi\xF3n. Haga clic en Verificar mapa cuando termine."
};
function mk(tag, cls, txt) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== void 0) el.textContent = txt;
  return el;
}
var NS = "http://www.w3.org/2000/svg";
function mks(tag, attrs) {
  const el = document.createElementNS(NS, tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}
var uid = 0;
function render({ model, el }) {
  const id = ++uid;
  const s = mk("style");
  s.textContent = styles_default;
  el.appendChild(s);
  const container = mk("div", "faw");
  container.appendChild(mk("div", "faw-question", model.get("question")));
  container.appendChild(mk("div", "faw-instructions", "Select a relationship term, then click two concepts to connect them. Drag concepts to rearrange."));
  const concepts = model.get("concepts");
  const terms = model.get("terms");
  const positions = {};
  const edges = [];
  let selectedTerm = null, pendingFrom = null, submitted = false;
  const WW = 560, WH = 360;
  const workspace = mk("div", "faw-cm-workspace");
  const svg = mks("svg");
  svg.classList.add("faw-cm-svg");
  const defs = mks("defs");
  const mkMarker = (mid, color) => {
    const m = mks("marker", { id: mid, viewBox: "0 0 10 10", refX: "9", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto" });
    const p = mks("path", { d: "M0,0 L10,5 L0,10 z" });
    p.style.fill = color;
    m.appendChild(p);
    return m;
  };
  defs.appendChild(mkMarker(`cm-n-${id}`, "var(--faw-neutral-color)"));
  defs.appendChild(mkMarker(`cm-ok-${id}`, "var(--faw-correct-color)"));
  defs.appendChild(mkMarker(`cm-err-${id}`, "var(--destructive)"));
  svg.appendChild(defs);
  workspace.appendChild(svg);
  concepts.forEach((name, i) => {
    const a = i / concepts.length * 2 * Math.PI - Math.PI / 2;
    positions[name] = { x: WW / 2 + WW * 0.36 * Math.cos(a), y: WH / 2 + WH * 0.38 * Math.sin(a) };
  });
  const nodeEls = {};
  concepts.forEach((name) => {
    const node = mk("div", "faw-cm-node", name);
    nodeEls[name] = node;
    node.style.left = positions[name].x + "px";
    node.style.top = positions[name].y + "px";
    workspace.appendChild(node);
    let dragging = false, moved = false, ox = 0, oy = 0, wr;
    node.addEventListener("mousedown", (e) => {
      if (submitted) return;
      dragging = true;
      moved = false;
      wr = workspace.getBoundingClientRect();
      ox = e.clientX - wr.left - positions[name].x;
      oy = e.clientY - wr.top - positions[name].y;
      node.style.zIndex = 10;
      e.preventDefault();
      e.stopPropagation();
    });
    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const nx = e.clientX - wr.left - ox, ny = e.clientY - wr.top - oy;
      if (Math.abs(nx - positions[name].x) > 3 || Math.abs(ny - positions[name].y) > 3) moved = true;
      positions[name].x = Math.max(0, Math.min(WW, nx));
      positions[name].y = Math.max(0, Math.min(WH, ny));
      node.style.left = positions[name].x + "px";
      node.style.top = positions[name].y + "px";
      renderEdges();
    });
    document.addEventListener("mouseup", () => {
      if (dragging) {
        dragging = false;
        node.style.zIndex = "";
      }
    });
    node.addEventListener("click", (e) => {
      e.stopPropagation();
      if (submitted || moved || !selectedTerm) return;
      if (!pendingFrom) {
        pendingFrom = name;
        node.classList.add("faw-cm-pending");
      } else if (pendingFrom === name) {
        nodeEls[pendingFrom].classList.remove("faw-cm-pending");
        pendingFrom = null;
      } else {
        const dup = edges.some((e2) => e2.from === pendingFrom && e2.to === name && e2.label === selectedTerm);
        if (!dup) {
          edges.push({ from: pendingFrom, to: name, label: selectedTerm });
          renderEdges();
          renderEdgeList();
          sync();
        }
        nodeEls[pendingFrom].classList.remove("faw-cm-pending");
        pendingFrom = null;
      }
    });
  });
  workspace.addEventListener("click", () => {
    if (pendingFrom && !submitted) {
      nodeEls[pendingFrom].classList.remove("faw-cm-pending");
      pendingFrom = null;
    }
  });
  container.appendChild(workspace);
  const termsRow = mk("div", "faw-cm-terms");
  const termBtns = {};
  terms.forEach((term) => {
    const btn = mk("button", "faw-cm-term", term);
    btn.addEventListener("click", () => {
      if (submitted) return;
      if (selectedTerm === term) {
        selectedTerm = null;
        btn.classList.remove("faw-cm-term-selected");
      } else {
        Object.values(termBtns).forEach((b) => b.classList.remove("faw-cm-term-selected"));
        selectedTerm = term;
        btn.classList.add("faw-cm-term-selected");
      }
      if (pendingFrom) {
        nodeEls[pendingFrom].classList.remove("faw-cm-pending");
        pendingFrom = null;
      }
    });
    termBtns[term] = btn;
    termsRow.appendChild(btn);
  });
  container.appendChild(termsRow);
  const edgeList = mk("div", "faw-cm-edge-list");
  container.appendChild(edgeList);
  function renderEdgeList() {
    edgeList.innerHTML = "";
    edges.forEach((edge, i) => {
      const row = mk("div", "faw-cm-edge-row");
      row.appendChild(mk("span", null, edge.from + " "));
      row.appendChild(mk("span", "faw-cm-edge-label", edge.label));
      row.appendChild(mk("span", null, " " + edge.to));
      if (!submitted) {
        const x = mk("button", "faw-cm-edge-remove", "\u2715");
        x.addEventListener("click", () => {
          edges.splice(i, 1);
          renderEdges();
          renderEdgeList();
          sync();
        });
        row.appendChild(x);
      } else {
        row.appendChild(mk("span", edge.correct ? "faw-correct" : "faw-incorrect", edge.correct ? " \u2713" : " \u2717"));
      }
      edgeList.appendChild(row);
    });
  }
  const btnRow = mk("div");
  btnRow.style.marginTop = "12px";
  const checkBtn = mk("button", "faw-btn faw-btn-primary", "Check Map");
  checkBtn.style.marginRight = "12px";
  const clearBtn = mk("button", "faw-btn faw-btn-secondary", "Clear All");
  checkBtn.addEventListener("click", () => {
    if (submitted || !edges.length) return;
    submitted = true;
    checkBtn.disabled = true;
    clearBtn.style.display = "none";
    Object.values(termBtns).forEach((b) => {
      b.disabled = true;
    });
    const ce = model.get("correct_edges") || [];
    let score = 0;
    edges.forEach((e) => {
      e.correct = ce.some((c) => c.from === e.from && c.to === e.to && c.label === e.label);
      if (e.correct) score++;
    });
    renderEdges();
    renderEdgeList();
    const allRight = score === ce.length && edges.length === ce.length;
    container.appendChild(mk("div", `faw-feedback ${allRight ? "faw-correct" : "faw-incorrect"}`, `${score}/${ce.length} correct connections`));
    model.set("value", { edges, score, total: ce.length, correct: allRight });
    model.save_changes();
  });
  clearBtn.addEventListener("click", () => {
    edges.length = 0;
    renderEdges();
    renderEdgeList();
    sync();
  });
  btnRow.append(checkBtn, clearBtn);
  container.appendChild(btnRow);
  function renderEdges() {
    while (svg.childNodes.length > 1) svg.removeChild(svg.lastChild);
    edges.forEach((edge) => {
      const fp = positions[edge.from], tp = positions[edge.to];
      if (!fp || !tp) return;
      const dx = tp.x - fp.x, dy = tp.y - fp.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / dist, uy = dy / dist;
      const rFrom = Math.max(nodeEls[edge.from].offsetWidth, nodeEls[edge.from].offsetHeight) / 2 + 4;
      const rTo = Math.max(nodeEls[edge.to].offsetWidth, nodeEls[edge.to].offsetHeight) / 2 + 12;
      const x1 = fp.x + ux * rFrom, y1 = fp.y + uy * rFrom;
      const x2 = tp.x - ux * rTo, y2 = tp.y - uy * rTo;
      const color = edge.correct === true ? "var(--faw-correct-color)" : edge.correct === false ? "var(--destructive)" : "var(--faw-neutral-color)";
      const mId = edge.correct === true ? `cm-ok-${id}` : edge.correct === false ? `cm-err-${id}` : `cm-n-${id}`;
      const line = mks("line", { x1, y1, x2, y2, "stroke-width": 2 });
      line.style.stroke = color;
      line.setAttribute("marker-end", `url(#${mId})`);
      const mx = (fp.x + tp.x) / 2, my = (fp.y + tp.y) / 2;
      const txt = mks("text", { x: mx, y: my - 8, "text-anchor": "middle", "font-size": 12 });
      txt.style.fill = color;
      txt.style.fontFamily = "inherit";
      txt.style.stroke = "var(--background)";
      txt.style.strokeWidth = "4";
      txt.style.paintOrder = "stroke fill";
      txt.textContent = edge.label;
      svg.append(line, txt);
    });
  }
  function sync() {
    model.set("value", { edges, score: 0, total: (model.get("correct_edges") || []).length, correct: false });
    model.save_changes();
  }
  renderEdges();
  addHelpButton(container, model.get("lang"), HELP_TEXT);
  el.appendChild(container);
}
var concept_map_default = { render };
export {
  concept_map_default as default
};
//# sourceMappingURL=concept-map.js.map
