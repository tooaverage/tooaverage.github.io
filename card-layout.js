// Size grid rows to each card so shorter cards don't leave a full row empty.
const cardList = document.querySelector('.product-list, .project-list');
if (cardList) {
  const cards = [...cardList.children];
  const breakpoint = document.body.classList.contains('cards') ? 640 : 850;
  let frame;
  function packCards() {
    const wide = window.innerWidth > breakpoint;
    cardList.classList.toggle('packed-cards', wide);
    cards.forEach(card => {
      if (!wide) {
        card.style.removeProperty('grid-row-end');
        return;
      }
      const gap = document.body.classList.contains('playroom') ? 32 : 24;
      card.style.gridRowEnd = `span ${Math.ceil(card.offsetHeight + gap)}`;
    });
  }
  function scheduleLayout() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(packCards);
  }
  const observer = new ResizeObserver(scheduleLayout);
  cards.forEach(card => observer.observe(card));
  window.addEventListener('resize', scheduleLayout);
  document.fonts.ready.then(scheduleLayout);
  packCards();
}

// Let people select/copy card text without an invisible link intercepting it.
document.querySelectorAll('.playroom .linked-card').forEach(card => {
  const destination = card.querySelector('a.card-destination');
  if (!destination) return;
  let pending;
  const isControl = target => target.closest('a, button, video, input, textarea, select');
  card.addEventListener('click', event => {
    clearTimeout(pending);
    if (isControl(event.target) || event.detail > 1 || window.getSelection()?.toString()) return;
    const newTab = event.metaKey || event.ctrlKey || event.shiftKey;
    if (newTab) {
      window.dispatchEvent(new CustomEvent('portfolio:product-open', { detail: { destination } }));
      window.open(destination.href, '_blank', 'noopener,noreferrer');
      return;
    }
    // Allow double-click word selection as well as drag selection.
    pending = setTimeout(() => {
      if (!window.getSelection()?.toString()) {
        window.dispatchEvent(new CustomEvent('portfolio:product-open', { detail: { destination } }));
        window.location.assign(destination.href);
      }
    }, 300);
  });
  card.addEventListener('dblclick', () => clearTimeout(pending));
  card.addEventListener('auxclick', event => {
    if (event.button !== 1 || isControl(event.target)) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('portfolio:product-open', { detail: { destination } }));
    window.open(destination.href, '_blank', 'noopener,noreferrer');
  });
});
