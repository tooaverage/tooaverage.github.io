// Website analytics only: local previews and the product apps are excluded.
(() => {
  if (!['jayceeday.com', 'www.jayceeday.com'].includes(location.hostname)) return;
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split('.');2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement('script')).type='text/javascript',p.crossOrigin='anonymous',p.async=!0,p.src=s.api_host.replace('.i.posthog.com','-assets.i.posthog.com')+'/static/array.js',(r=t.getElementsByTagName('script')[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a='posthog',u.people=u.people||[],o='init capture register register_once register_for_session unregister get_property getSessionProperty identify reset set_config opt_in_capturing opt_out_capturing'.split(' '),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  window.posthog.init('phc_zBwoDXc6RmYWN6iZz57gPTsqDnX9TVXu6BDwoeoryWsP', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-05-30',
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: false,
    person_profiles: 'never',
    persistence: 'sessionStorage',
    disable_session_recording: true,
    disable_surveys: true,
  });
  let source = 'direct_or_unknown';
  try {
    const domain = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    const saved = sessionStorage.getItem('jaycee_referral_source');
    source = saved || (domain && domain !== 'jayceeday.com' ? domain : 'direct_or_unknown');
    sessionStorage.setItem('jaycee_referral_source', source);
  } catch (_) { /* Storage restrictions should never break the page. */ }
  window.posthog.register({ site: 'jayceeday.com', referral_source: source });
  window.posthog.capture('$pageview');
  function trackProduct(destination) {
    window.posthog.capture('product_clicked', {
      product_name: destination.closest('.project').querySelector('h3').textContent.replace('↗', '').trim(),
      destination_domain: new URL(destination.href).hostname,
    });
  }
  window.addEventListener('portfolio:product-open', event => trackProduct(event.detail.destination));
  document.addEventListener('click', event => {
    const destination = event.target.closest('a.card-destination');
    if (destination) trackProduct(destination);
  });
  document.addEventListener('auxclick', event => {
    const destination = event.target.closest('a.card-destination');
    if (event.button === 1 && destination) trackProduct(destination);
  });
})();
