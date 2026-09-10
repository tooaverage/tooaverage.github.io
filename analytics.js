// Collect visits only on the public site, not in local design previews.
if (['jayceeday.com', 'www.jayceeday.com'].includes(window.location.hostname)) {
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
}
