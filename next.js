const preview = document.querySelector('.image-dialog');
const previewImage = preview.querySelector('img');
document.querySelectorAll('.image-open').forEach(button => {
  button.addEventListener('click', () => {
    previewImage.src = button.dataset.image;
    previewImage.alt = button.dataset.caption;
    preview.querySelector('p').textContent = button.dataset.caption;
    preview.showModal();
  });
});
preview.querySelector('.close-preview').addEventListener('click', () => preview.close());
preview.addEventListener('click', event => {
  if (event.target !== preview) return;
  const bounds = preview.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) preview.close();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.querySelectorAll('video').forEach(video => video.pause());
});
