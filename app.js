const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

function setHeaderState(){
  if(!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}
setHeaderState();
window.addEventListener('scroll', setHeaderState, {passive:true});

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  toggle.classList.toggle('is-open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll progress bar
const progressBar = document.querySelector('[data-scroll-progress]');
function setScrollProgress(){
  if(!progressBar) return;
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressBar.style.width = pct + '%';
}
setScrollProgress();
window.addEventListener('scroll', setScrollProgress, {passive:true});
window.addEventListener('resize', setScrollProgress);

// Reveal-on-scroll (supports .reveal, .reveal-fade, .reveal-side)
const revealTargets = document.querySelectorAll('.reveal, .reveal-fade, .reveal-side');
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// Hero media: scroll-scrubbed focus reveal. Image desaturated/soft at rest,
// resolves to full clarity as the hero scrolls through view (mirrors a skin/clarity metaphor).
const heroMedia = document.querySelector('[data-hero-media]');
const heroImg = heroMedia?.querySelector('img');
function setHeroFocus(){
  if(!heroMedia || !heroImg) return;
  const rect = heroMedia.getBoundingClientRect();
  const vh = window.innerHeight;
  const raw = 1 - (rect.top / vh);
  const progress = Math.min(1, Math.max(0, raw));
  const saturate = 0.35 + progress * 0.65;
  const contrast = 0.92 + progress * 0.08;
  const brightness = 1.04 - progress * 0.04;
  heroImg.style.filter = `saturate(${saturate}) contrast(${contrast}) brightness(${brightness})`;
}
if(heroMedia){
  setHeroFocus();
  window.addEventListener('scroll', setHeroFocus, {passive:true});
  window.addEventListener('resize', setHeroFocus);
}

// Sticky difference list: highlight active item as it crosses a focus line
const diffItems = document.querySelectorAll('[data-diff-item]');
function setActiveDiffItem(){
  if(!diffItems.length) return;
  const focusLine = window.innerHeight * 0.42;
  let active = null;
  diffItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if(rect.top <= focusLine && rect.bottom >= focusLine){
      active = item;
    }
  });
  if(!active){
    let minDist = Infinity;
    diffItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      const dist = Math.abs(rect.top - focusLine);
      if(dist < minDist){ minDist = dist; active = item; }
    });
  }
  diffItems.forEach(item => item.classList.toggle('is-active', item === active));
}
if(diffItems.length){
  setActiveDiffItem();
  window.addEventListener('scroll', setActiveDiffItem, {passive:true});
  window.addEventListener('resize', setActiveDiffItem);
}

// Horizontal service rail progress indicator
const rail = document.querySelector('[data-rail]');
const railProgressFill = document.querySelector('[data-rail-progress-fill]');
function setRailProgress(){
  if(!rail || !railProgressFill) return;
  const max = rail.scrollWidth - rail.clientWidth;
  const pct = max > 0 ? (rail.scrollLeft / max) * 100 : 0;
  railProgressFill.style.width = pct + '%';
}
if(rail){
  setRailProgress();
  rail.addEventListener('scroll', setRailProgress, {passive:true});
  window.addEventListener('resize', setRailProgress);
}

// Newsletter popup demo
// Change POPUP_DELAY_MS to adjust timing. Remove localStorage/sessionStorage checks if you want it to show every visit.
const POPUP_DELAY_MS = 2400;
const modal = document.querySelector('[data-newsletter]');
const form = document.querySelector('[data-newsletter-form]');
const success = document.querySelector('[data-newsletter-success]');

function openNewsletter(){
  if(!modal || localStorage.getItem('evansNewsletterClosed') === 'true' || sessionStorage.getItem('evansNewsletterShown') === 'true') return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  sessionStorage.setItem('evansNewsletterShown','true');
}
function closeNewsletter(){
  if(!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  localStorage.setItem('evansNewsletterClosed','true');
}
setTimeout(openNewsletter, POPUP_DELAY_MS);
document.querySelectorAll('[data-newsletter-close]').forEach(btn => btn.addEventListener('click', closeNewsletter));
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeNewsletter(); });

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  console.log('Newsletter demo submission:', data);
  form.hidden = true;
  success.hidden = false;
  localStorage.setItem('evansNewsletterClosed','true');
});
