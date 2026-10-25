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

    document.querySelectorAll('.section-label, .section-heading, .about-grid > div, .skill-card, .project-card, .repo-card, .contact-grid').forEach(element => {
      element.classList.add('reveal');
      revealObserver.observe(element);
    });
  }
}

// Update only on scroll or resize, with at most one write per animation frame.
const sections = [...document.querySelectorAll("main section[id]")];
const siteHeader = document.querySelector('.site-header');
const progressBar = document.querySelector('.reading-progress');
let activeSection = "";
let progressFrame = 0;
// Section positions are measured once (and when the layout changes), not on every scroll frame.
let sectionTops = [];
let pageHeight = 0;
function measureSections() {
  sectionTops = sections.map(section => ({ id: section.id, top: section.offsetTop }));
  pageHeight = document.documentElement.scrollHeight;
}
function updateReadingProgress() {
  if (progressFrame) return;
  progressFrame = requestAnimationFrame(() => {
    const available = pageHeight - window.innerHeight;
    const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
    progressBar.style.transform = `scaleX(${progress})`;
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    const position = window.scrollY + window.innerHeight * 0.28;
    const current = sectionTops.filter(section => section.top <= position).at(-1)?.id || 'home';
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
function remeasure() { measureSections(); updateReadingProgress(); }
window.addEventListener('resize', remeasure);
window.addEventListener('load', remeasure);
window.addEventListener('langchange', remeasure);
if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
remeasure();

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
    visibleProjects = count;
    updateProjectCount();
  });
});
let visibleProjects = projectCards.length;
function updateProjectCount() {
  const { t } = window.siteI18n;
  document.querySelector('.filter-count').textContent = visibleProjects === 1 ? t('count.one') : t('count.many', { n: visibleProjects });
}
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
document.querySelectorAll('.marquee-track').forEach(track => {
  for (const item of [...track.children]) {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    track.append(copy);
  }
});

// Background terminal: an endless, softly blurred stream of analysis output.
const terminalTrack = document.querySelector('.bg-terminal-track');
const terminalSessions = [
  ['asphdex scan ./samples/invoice_2024.exe', [
    ['dim', '[*] PE32+ executable, 6 sections, 214 imports'],
    ['dim', '[*] entropy  .text=6.41  .rdata=5.02  .rsrc=7.92'],
    ['warn', '[!] packed section detected: .rsrc (UPX 3.96)'],
    ['', '[+] yara: Suspicious_Imports_Injection matched'],
    ['dim', '[+] imports: VirtualAllocEx, WriteProcessMemory, CreateRemoteThread'],
    ['', '[✓] report written to ./reports/invoice_2024.json'],
  ]],
  ['repora audit ~/projects/api --secrets --history', [
    ['dim', '[*] walking 1,284 files, 612 commits'],
    ['warn', '[!] .env.production committed in 3f2a91c'],
    ['warn', '[!] hardcoded token pattern in config/db.ts:14'],
    ['dim', '[*] dependency review: 3 outdated, 0 known-vulnerable'],
    ['', '[✓] 2 findings, 0 critical'],
  ]],
  ['fhnix inspect ./mail/urgent_payment.eml', [
    ['dim', '[*] SPF=fail  DKIM=none  DMARC=reject'],
    ['warn', '[!] reply-to domain differs from sender'],
    ['warn', '[!] link text ≠ href: paypa1-secure.example'],
    ['', '[✓] verdict: phishing (score 0.94)'],
  ]],
  ['trackher footprint --self --passive', [
    ['dim', '[*] querying 42 public sources'],
    ['', '[+] 7 accounts linked to handle'],
    ['warn', '[!] email exposed in 2 public breach notices'],
    ['', '[✓] privacy report generated'],
  ]],
  ['banshee triage ./logs/auth.log --offline', [
    ['dim', '[*] parsed 18,331 lines'],
    ['warn', '[!] 214 failed ssh logins from 3 addresses'],
    ['', '[✓] evidence bundle sealed: sha256 9c1e…a07b'],
  ]],
  ['ravenscanner triage ./downloads/', [
    ['dim', '[*] 37 files · 4 ELF · 2 scripts · 1 archive'],
    ['warn', '[!] setup.sh: curl | sh pattern, base64 blob'],
    ['', '[✓] 1 file flagged for manual review'],
  ]],
  ['stracespy summarize ./traces/app.strace', [
    ['dim', '[*] 9,412 syscalls · 3 processes'],
    ['warn', '[!] reads /etc/shadow (EACCES)'],
    ['', '[+] outbound connect → 10.0.4.12:4444'],
    ['', '[✓] behavior summary saved'],
  ]],
  ['sentinel timeline /mnt/evidence/disk.img', [
    ['dim', '[*] MACB timeline: 48,201 entries'],
    ['warn', '[!] mtime < crtime on /usr/bin/sshd'],
    ['', '[✓] timeline.csv exported'],
  ]],
  ['flowscope analyze ./captures/lab.pcapng', [
    ['dim', '[*] 12,880 packets · 214 flows'],
    ['', '[+] TLS JA3 fingerprints: 9 unique'],
    ['warn', '[!] beacon-like interval 60s ±2s → 203.0.113.7'],
    ['', '[✓] risk score: 41 / 100'],
  ]],
  ['yara -r ./rules/asphdex ./samples', [
    ['', 'Packer_UPX_Generic     ./samples/invoice_2024.exe'],
    ['', 'Susp_PowerShell_Enc    ./samples/update.ps1'],
  ]],
  ['npiac build --out context.md', [
    ['dim', '[*] 312 files indexed · 41k tokens'],
    ['', '[✓] deterministic context written'],
  ]],
  ['sudo ufw status verbose', [
    ['dim', 'Status: active'],
    ['dim', 'Default: deny (incoming), allow (outgoing)'],
  ]],
];
function terminalLine(kind, text) {
  const line = document.createElement('div');
  if (kind) line.className = kind;
  line.textContent = text;
  return line;
}
function buildTerminal() {
  const fragment = document.createDocumentFragment();
  let lines = 0;
  for (const [command, output] of terminalSessions) {
    const prompt = terminalLine('cmd', ` ${command}`);
    const user = document.createElement('b');
    user.textContent = 'root@drafaled:~/lab$';
    prompt.prepend(user);
    fragment.append(prompt);
    output.forEach(([kind, text]) => fragment.append(terminalLine(kind, text)));
    fragment.append(terminalLine('', ' '));
    lines += output.length + 2;
  }
  // Two identical copies let the CSS animation loop without a visible seam.
  terminalTrack.append(fragment.cloneNode(true), fragment);
  terminalTrack.style.setProperty('--term-duration', `${lines * 1.5}s`);
  terminalTrack.style.setProperty('--term-steps', String(lines));
}
buildTerminal();

// Short glitch bursts every few seconds; the name joins in now and then.
let glitchTimer = 0;
function scheduleGlitch() {
  clearTimeout(glitchTimer);
  glitchTimer = setTimeout(() => {
    if (!document.body.classList.contains('motion-paused') && !document.hidden) {
      const withName = Math.random() < 0.35;
      document.body.classList.add('is-glitching');
      document.body.classList.toggle('glitch-name', withName);
      setTimeout(() => document.body.classList.remove('is-glitching', 'glitch-name'), 450);
    }
    scheduleGlitch();
  }, 3500 + Math.random() * 5000);
}
scheduleGlitch();

// A soft light follows the pointer across the background.
const cursorGlow = document.querySelector('.cursor-glow');
let glowFrame = 0;
let glowX = 0;
let glowY = 0;
window.addEventListener('pointermove', event => {
  glowX = event.clientX;
  glowY = event.clientY;
  if (glowFrame) return;
  glowFrame = requestAnimationFrame(() => {
    cursorGlow.style.transform = `translate3d(${glowX}px,${glowY}px,0)`;
    glowFrame = 0;
  });
}, { passive: true });

// Pause the hero's looping animations once it has scrolled out of view.
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => document.body.classList.toggle('hero-away', !entry.isIntersecting))
    .observe(document.querySelector('.hero'));
}

// Repository filters, same behaviour as the featured project filters.
const repoCards = [...document.querySelectorAll('.repo-card')];
const repoButtons = [...document.querySelectorAll('[data-repo-filter]')];
repoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.repoFilter;
    repoButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    repoCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.group === filter;
      card.hidden = !visible;
      card.classList.remove('filter-enter');
      if (visible) card.classList.add('is-visible');
    });
    requestAnimationFrame(() => {
      repoCards.filter(card => !card.hidden).forEach(card => card.classList.add('filter-enter'));
      updateReadingProgress();
    });
  });
});
document.querySelector('.repo-toolbar').hidden = false;

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
  motionToggle.innerHTML = window.siteI18n.t(paused ? 'motion.play' : 'motion.pause');
  syncMascot();
}
motionToggle.addEventListener('click', () => {
  manuallyPaused = !manuallyPaused;
  applyMotionPreference();
});
// The mascot video plays only while it is on screen and motion is allowed.
const mascot = document.querySelector('.mascot-video');
let mascotVisible = false;
function syncMascot() {
  const shouldPlay = mascotVisible && !document.hidden && !manuallyPaused && !motionPreference.matches;
  if (shouldPlay) mascot.play().catch(() => {});
  else mascot.pause();
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    mascotVisible = entry.isIntersecting;
    syncMascot();
  }, { threshold: 0.15 }).observe(mascot);
}

motionPreference.addEventListener('change', applyMotionPreference);
document.addEventListener('visibilitychange', applyMotionPreference);
applyMotionPreference();
updateProjectCount();

// Language changes: refresh JS-written text and sweep a scan line across the page.
window.addEventListener('langchange', () => {
  updateProjectCount();
  applyMotionPreference();
});
const wipe = document.createElement('div');
wipe.className = 'lang-wipe';
wipe.setAttribute('aria-hidden', 'true');
document.body.append(wipe);
window.addEventListener('langwipe', () => {
  wipe.classList.remove('is-running');
  void wipe.offsetWidth;
  wipe.classList.add('is-running');
});
