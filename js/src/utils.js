export function mk(tag, cls, txt) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (txt !== undefined) el.textContent = txt;
  return el;
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Creates a minimal anywidget-compatible model backed by a plain JS object.
// Used by the standalone bundle so widget render functions work without Python.
export function createModel(data) {
  const state = { ...data };
  return {
    get: (k) => state[k],
    set: (k, v) => { state[k] = v; },
    save_changes: () => {},
    on: () => {},
  };
}
