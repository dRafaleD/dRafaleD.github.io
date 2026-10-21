'use strict';

document.getElementById('year').textContent = new Date().getFullYear();
const menuLinks = [...document.querySelectorAll('.header-inner nav a, .section-directory a')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window) {

  if (!motionPreference.matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.04 });

    document.querySelectorAll('.section-label, .section-heading, .about-grid > div, .skill-card, .project-card, .contact-grid').forEach(element => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
}

// Update only on scroll or resize, with at most one write per animation frame.
const sections = [...document.querySelectorAll("main section[id]")];
let activeSection = "";
let progressFrame = 0;
function updateReadingProgress() {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    document.documentElement.style.setProperty('--progress', String(progress));
    const position = window.scrollY + window.innerHeight * 0.28;
    const current = sections.filter(section => section.offsetTop <= position).at(-1)?.id || 'home';
    if (current !== activeSection) {
      activeSection = current;
      for (const link of menuLinks) {
        if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
    progressFrame = 0;
  });
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
window.addEventListener('load', updateReadingProgress);
updateReadingProgress();

// Filters work locally; every project remains available without JavaScript.
const projectCards = [...document.querySelectorAll('.project-card')];
const projectGrid = document.querySelector('.project-grid');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let count = 0;
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    projectGrid.classList.toggle('is-filtered', filter !== 'all');
    projectCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      card.classList.remove('filter-enter');
      if (visible) {
        count++;
        card.classList.add('is-visible');
      }
    });
    requestAnimationFrame(() => {
      projectCards.filter(card => !card.hidden).forEach(card => card.classList.add('filter-enter'));
      updateReadingProgress();
    });
    document.querySelector('.filter-count').textContent = `${count} proje`;
  });
});
document.querySelector('.project-toolbar').hidden = false;

// Respect the OS preference and offer an explicit pause for both original GIFs.
const motionToggle = document.querySelector('.motion-toggle');
const animatedImages = [...document.querySelectorAll('img[data-animated]')];
let manuallyPaused = false;
function applyMotionPreference() {
  const paused = manuallyPaused || motionPreference.matches;
  document.body.classList.toggle('motion-paused', paused);
  animatedImages.forEach(image => {
    const nextSource = paused ? image.dataset.still : image.dataset.animated;
    if (image.getAttribute('src') !== nextSource) image.src = nextSource;
  });
  motionToggle.hidden = motionPreference.matches;
  motionToggle.setAttribute('aria-pressed', String(paused));
  motionToggle.innerHTML = paused
    ? '<span aria-hidden="true">▷</span> Animasyonu oynat'
    : '<span aria-hidden="true">Ⅱ</span> Animasyonu durdur';
}
motionToggle.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  applyMotionPreference();
});
motionPreference.addEventListener('change', applyMotionPreference);
applyMotionPreference();
