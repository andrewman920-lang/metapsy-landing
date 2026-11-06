// Keep local routes inside the current document: no WebView URL navigation.
function navigate(hash, target) {
  const oldURL = location.href;
  if (location.hash !== hash) {
    history.pushState(null, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL: location.href }));
  }
  if (target) {
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    target.focus({ preventScroll: true });
  }
}
const videoLink = document.querySelector('.video-copy .text-link');
if (videoLink && document.querySelector('.video-poster')?.getAttribute('aria-label')?.endsWith('здесь')) {
  videoLink.href = '#video';
  videoLink.removeAttribute('target');
  videoLink.textContent = 'Смотреть здесь';
  videoLink.dataset.inlineVideo = 'true';
}
document.addEventListener('click', (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link || link.hasAttribute('download')) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
  const target = document.getElementById(url.hash.slice(1));
  if (!target && !url.hash.startsWith('#/book')) return;
  event.preventDefault();
  if (link.dataset.inlineVideo === 'true') document.querySelector('.video-poster')?.click();
  navigate(url.hash, target);
});
window.addEventListener('popstate', () => {
  const target = document.getElementById(location.hash.slice(1));
  target?.scrollIntoView({ behavior: 'auto', block: 'start' });
});
