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
const siteHeader = document.querySelector('.site-header');
let activeSection = "";
let progressFrame = 0;
function updateReadingProgress() {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    document.documentElement.style.setProperty('--progress', String(progress));
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
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

// Cards light up under the pointer.
document.querySelectorAll('.glow-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

// Duplicate the technology list once so the marquee loops seamlessly.
const marqueeTrack = document.querySelector('.marquee-track');
for (const item of [...marqueeTrack.children]) {
  const copy = item.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  marqueeTrack.append(copy);
}

// Background terminal: a quiet, endless stream of analysis output.
const bgTerminal = document.querySelector('.bg-terminal');
const terminalScript = [
  ['$ asphdex scan ./samples/invoice_2024.exe', ''],
  ['[*] PE32+ executable, 6 sections', 'dim'],
  ['[*] entropy .text=6.41 .rsrc=7.92', 'dim'],
  ['[!] packed section detected: .rsrc (UPX)', 'warn'],
  ['[+] yara: Suspicious_Imports_Injection matched', ''],
  ['[+] imports: VirtualAllocEx, WriteProcessMemory', 'dim'],
  ['[✓] report written to ./reports/invoice_2024.json', ''],
  ['', ''],
  ['$ repora audit ~/projects/api --secrets', ''],
  ['[*] walking 1,284 files', 'dim'],
  ['[!] .env.production committed in 3f2a91c', 'warn'],
  ['[!] hardcoded token pattern in config/db.ts:14', 'warn'],
  ['[✓] 2 findings, 0 critical', ''],
  ['', ''],
  ['$ fhnix inspect ./mail/urgent_payment.eml', ''],
  ['[*] SPF=fail DKIM=none DMARC=reject', 'dim'],
  ['[!] reply-to domain differs from sender', 'warn'],
  ['[!] link text ≠ href: paypa1-secure.example', 'warn'],
  ['[✓] verdict: phishing (score 0.94)', ''],
  ['', ''],
  ['$ trackher footprint --self --passive', ''],
  ['[*] querying 42 public sources', 'dim'],
  ['[+] 7 accounts linked to handle', ''],
  ['[✓] privacy report generated', ''],
  ['', ''],
  ['$ banshee triage ./logs/auth.log --offline', ''],
  ['[*] parsed 18,331 lines', 'dim'],
  ['[!] 214 failed ssh logins from 3 addresses', 'warn'],
  ['[✓] evidence bundle sealed: sha256 9c1e…a07b', ''],
  ['', ''],
  ['$ sudo ufw status verbose', ''],
  ['Status: active · Default: deny (incoming)', 'dim'],
  ['', ''],
];
const maxTerminalLines = 40;
let terminalTimer = 0;
let terminalIndex = 0;
function terminalLine([text, kind]) {
  const line = document.createElement('div');
  line.textContent = text || ' ';
  if (kind) line.className = kind;
  return line;
}
function fillTerminal() {
  bgTerminal.replaceChildren(...Array.from({ length: maxTerminalLines }, (_, i) => terminalLine(terminalScript[i % terminalScript.length])));
  terminalIndex = maxTerminalLines % terminalScript.length;
}
function typeNextLine() {
  const [rawText, kind] = terminalScript[terminalIndex];
  const text = rawText || ' ';
  terminalIndex = (terminalIndex + 1) % terminalScript.length;
  const line = document.createElement('div');
  if (kind) line.className = kind;
  const output = document.createTextNode('');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  line.append(output, cursor);
  bgTerminal.querySelector('.cursor')?.remove();
  bgTerminal.append(line);
  while (bgTerminal.childElementCount > maxTerminalLines) bgTerminal.firstElementChild.remove();
  let typed = 0;
  const step = () => {
    if (typed >= text.length) {
      terminalTimer = setTimeout(typeNextLine, text.startsWith('$') ? 700 : 260);
      return;
    }
    // Commands are typed key by key, output lands in quick bursts.
    typed = Math.min(text.length, typed + (text.startsWith('$') ? 1 : 6));
    output.textContent = text.slice(0, typed);
    terminalTimer = setTimeout(step, text.startsWith('$') ? 45 : 18);
  };
  step();
}
function setTerminalRunning(running) {
  clearTimeout(terminalTimer);
  if (running) typeNextLine();
}
fillTerminal();

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
  setTerminalRunning(!paused && !document.hidden);
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
document.addEventListener('visibilitychange', applyMotionPreference);
applyMotionPreference();
