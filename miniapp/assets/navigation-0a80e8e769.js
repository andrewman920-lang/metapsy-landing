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
// Real buttons have no URL for the native VK client to intercept.
for (const link of document.querySelectorAll('a[href]')) {
  if (link.hasAttribute('download')) continue;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) continue;
  const target = document.getElementById(url.hash.slice(1));
  if (!target && !url.hash.startsWith('#/book')) continue;
  const button = document.createElement('button');
  for (const attr of link.attributes) {
    if (!['href', 'target', 'rel'].includes(attr.name)) button.setAttribute(attr.name, attr.value);
  }
  button.type = 'button';
  button.classList.add('internal-navigation');
  button.innerHTML = link.innerHTML;
  button.addEventListener('click', () => {
    if (button.dataset.inlineVideo === 'true') document.querySelector('.video-poster')?.click();
    if (target) {
      // Section navigation must not change the document URL or invoke VK routing.
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    } else navigate(url.hash, null);
  });
  link.replaceWith(button);
}
const sections = [...document.querySelectorAll('main section[id]')];
function updateNavigation() {
  let current = 'start';
  for (const section of sections) if (section.getBoundingClientRect().top <= 160) current = section.id;
  for (const button of document.querySelectorAll('.mobile-nav button[data-section]')) {
    if (button.dataset.section === current) button.setAttribute('aria-current', 'location');
    else button.removeAttribute('aria-current');
  }
}
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();
window.addEventListener('popstate', () => {
  const target = document.getElementById(location.hash.slice(1));
  target?.scrollIntoView({ behavior: 'auto', block: 'start' });
});
