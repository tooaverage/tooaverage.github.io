const datingCard = document.querySelector('.dating-vote-card');
if (datingCard) {
  const buttons = [...datingCard.querySelectorAll('[data-vote]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motion;
  buttons.forEach(button => button.addEventListener('click', () => {
    const liked = button.dataset.vote === 'like';
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    motion?.cancel();
    if (!reducedMotion.matches) {
      const direction = liked ? 1 : -1;
      motion = datingCard.animate([
        { transform: 'rotate(-.65deg)' },
        { transform: `translateX(${direction * 20}px) rotate(${direction * 3}deg)` },
        { transform: 'rotate(-.65deg)' }
      ], { duration: 380, easing: 'ease-out' });
    }
  }));
}
