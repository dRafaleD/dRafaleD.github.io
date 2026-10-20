'use strict';

document.getElementById('year').textContent = new Date().getFullYear();
const menuLinks = [...document.querySelectorAll('nav a')];
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
