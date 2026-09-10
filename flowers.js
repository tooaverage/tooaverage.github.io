const flowerToggle = document.querySelector('.flower-toggle');
flowerToggle.addEventListener('click', () => {
  const paused = document.body.classList.toggle('flowers-off');
  flowerToggle.setAttribute('aria-pressed', String(!paused));
  flowerToggle.textContent = paused ? 'Flowers off' : 'Flowers on';
});
