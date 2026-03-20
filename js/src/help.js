export function addHelpButton(container, lang, helpText) {
  const text = helpText[lang] || helpText['en'];

  const popup = document.createElement('div');
  popup.className = 'faw-help-popup';
  popup.textContent = text;
  popup.hidden = true;

  const btn = document.createElement('button');
  btn.className = 'faw-help-btn';
  btn.textContent = '?';
  btn.setAttribute('aria-label', 'Help');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.hidden = !popup.hidden;
  });

  // Close popup when clicking outside
  document.addEventListener('click', () => { popup.hidden = true; });

  container.append(popup, btn);
}
