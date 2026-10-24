'use strict';

// Turkish is the source language and stays in the HTML; only English lives here.
const EN = {
  'skip': 'Skip to content',
  'brand.aria': 'dRafaleD, home',
  'nav.aria': 'Main menu',
  'nav.about': 'About',
  'nav.skills': 'Interests',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'hero.eyebrow': 'BACKEND DEVELOPMENT / CYBERSECURITY',
  'hero.role': 'Backend development. <span>Cybersecurity.</span>',
  'hero.desc': 'I work on cybersecurity, Linux systems and secure software development. I build open-source tools for OSINT, file analysis and email security.',
  'hero.cta1': 'Explore my projects <span aria-hidden="true">↗</span>',
  'hero.cta2': 'About me <span aria-hidden="true">↓</span>',
  'hero.scroll': 'Scroll down',
  'stat.repos': 'Open-source repos',
  'stat.labs': 'Learning labs',
  'stat.focus': 'Focus',
  'img.terminal': 'My GitHub README terminal: Eren Erdoğan, dRafaleD. Cybersecurity, Linux and secure software development; a profile built around learning, building and research.',
  'dir.aria': 'Quick links to sections',
  'dir.about.t': 'About me',
  'dir.about.s': 'Profile & tech',
  'dir.skills.t': 'Areas of work',
  'dir.skills.s': 'Security & development',
  'dir.projects.t': 'Selected projects',
  'dir.projects.s': '5 featured tools',
  'dir.repos.t': 'All repositories',
  'dir.repos.s': 'Tools & labs',
  'dir.contact.t': 'Contact',
  'dir.contact.s': 'GitHub & LinkedIn',
  'lab.about': 'ABOUT',
  'lab.skills': 'INTERESTS',
  'lab.projects': 'SELECTED PROJECTS',
  'lab.repos': 'ALL REPOSITORIES',
  'lab.contact': 'CONTACT',
  'about.h2': 'Cybersecurity &amp;<br><span>backend development.</span>',
  'st.langs': 'Languages',
  'st.langs.v': 'Python, JavaScript, TypeScript, C, C++, C#, Go and Rust',
  'st.web.v': 'Node.js, React, ASP.NET Core, Django, Flask and FastAPI',
  'st.db': 'Databases',
  'st.db.v': 'PostgreSQL, MongoDB, MySQL and MariaDB',
  'st.sys': 'Systems',
  'st.sys.v': 'Linux, Kali Linux, Debian and Arch Linux',
  'about.p1': 'I\'m <strong>Eren Erdoğan</strong>. I share my projects on GitHub as <strong>dRafaleD</strong>. I\'m a backend development student; my work centers on cybersecurity, Linux systems and secure software development. Alongside server-side application logic, I also look at the security of those applications and the systems they run on.',
  'about.p2': 'I\'m building my skills in web application security, penetration testing, vulnerability assessment and secure code review. OSINT and digital footprint research, malware analysis, reverse engineering and binary analysis are also among the areas I work in. I study network security, Linux hardening and the fundamentals of cryptography.',
  'about.p3': 'I put these topics into practice by building my own tools. With <strong>AsphDex</strong> I focus on static analysis of suspicious files, with <strong>Trackher</strong> on digital footprint and privacy, and with <strong>FhniX</strong> on examining phishing emails. <strong>REPORA</strong> is for reviewing security risks in code repositories, and <strong>Banshee</strong> for reporting on local file and content analysis.',
  'about.p4': 'On the development side I work on projects mostly in Python, Rust and JavaScript while growing my full-stack skills. The technology areas on my GitHub profile cover web interfaces, backend frameworks, and relational and document databases. Git and Linux are the common tools behind both my development and analysis work.',
  'about.p5': 'Lately I\'m focusing on advanced web application security, malware analysis and reverse engineering, Linux and network security, and secure API and backend architecture. I carry out my security research and testing only in environments I\'m authorized to work in.',
  'skills.h2': 'Areas of work<span class="green">.</span>',
  'skills.p': 'The focus points of my security research and software projects.',
  'sk1.t': 'Cybersecurity',
  'sk1.p': 'Understanding systems, researching vulnerabilities and building safer solutions.',
  'sk2.t': 'Software development',
  'sk2.p': 'Building backend applications, command-line tools, desktop interfaces and automation.',
  'sk3.t': 'Research &amp; analysis',
  'sk3.p': 'Following digital traces, examining files and uncovering the structure behind what\'s visible.',
  'stack.label': 'TECHNOLOGIES',
  'stack.sub': 'languages &amp; tech',
  'projects.h2': 'My open-source projects<span class="green">.</span>',
  'projects.p': 'Tools I\'ve built for file analysis, digital privacy, email and code security.',
  'link.allrepos': 'All repos <span aria-hidden="true">↗</span>',
  'link.github': 'View on GitHub <span aria-hidden="true">↗</span>',
  'f.projects.aria': 'Filter projects by area',
  'f.repos.aria': 'Filter repositories by type',
  'f.all': 'All',
  'f.analysis': 'Analysis',
  'f.privacy': 'Privacy',
  'f.code': 'Code security',
  'f.tools': 'Security tools',
  'f.labs': 'Learning labs',
  'f.dev': 'Developer tools',
  'f.other': 'Other',
  'badge.featured': 'FEATURED',
  'img.asphdex': 'AsphDex project emblem and README banner',
  'img.repora': 'REPORA README terminal preview',
  'img.trackher': 'Trackher project emblem and README banner',
  'img.fhnix': 'FhniX phoenix emblem',
  'img.banshee': 'Banshee project emblem and animated README banner',
  'p1.d': 'A static malware analysis tool built to examine suspicious files without running them.',
  'p2.d': 'A CLI that reviews repositories for sensitive files, exposed secrets and risky configuration.',
  'p3.d': 'An open-source toolkit for researching your own digital footprint and assessing your privacy.',
  'p4.d': 'A tool that inspects suspicious emails locally, making phishing analysis easier with a desktop interface, explainable findings and reports.',
  'p5.d': 'A security toolkit that examines files, logs and suspicious content offline and turns findings into explainable reports and verifiable evidence bundles.',
  'tag.static': 'STATIC ANALYSIS',
  'tag.code': 'CODE SECURITY',
  'tag.osint': 'OSINT &amp; PRIVACY',
  'tag.email': 'EMAIL SECURITY',
  'tag.offline': 'OFFLINE ANALYSIS',
  'repos.h2': 'My other work on GitHub<span class="green">.</span>',
  'repos.p': 'From defense-focused security tools to step-by-step learning labs, the other open-source repositories on my profile.',
  'r1.d': 'A defense-focused static file triage CLI for Linux, written in Rust.',
  'r2.d': 'A lightweight Linux CLI that turns strace logs into security-focused behavior summaries.',
  'r3.d': 'A Linux scanner that builds forensic timelines from MACB timestamps on live filesystems and TSK disk images.',
  'r4.d': 'An offline PCAP/PCAPNG analyzer using DNS, HTTP and TLS fingerprints and scan/beacon heuristics.',
  'r5.d': 'A learning companion for Ghidra that explains what you\'re looking at, why it matters and what to check next.',
  'r6.d': 'Original, categorized YARA rules backed by inert test files and dual-engine validation.',
  'r7.d': 'A token-efficient collection of defensive cybersecurity Agent Skills.',
  'r8.d': 'A reverse engineering journey that starts from the basics: C, assembly, memory, binary formats and debugging.',
  'r9.d': 'A bilingual malware analysis learning path that stores no live samples and teaches concepts before tools.',
  'r10.d': 'A learning journal for YARA, from the fundamentals onward, through small and safe lab exercises.',
  'r11.d': 'Hands-on web security labs that cover the basics, such as HTTP, sessions and authentication, before getting to vulnerabilities.',
  'r12.d': 'Network security labs focused on understanding how networks work by observing traffic instead of memorizing commands.',
  'r13.d': 'Hands-on digital forensics labs on preserving, verifying, examining and documenting digital evidence.',
  'r14.d': 'AI security labs that examine how LLM applications are structured, their trust boundaries and risks like prompt injection.',
  'r15.d': 'Generates clean, deterministic, AI-ready repository context for coding agents, with optional local Ollama support.',
  'r16.d': 'A lightweight CLI that turns your public GitHub activity into aesthetic SVG cards for READMEs.',
  'r17.d': 'Turns images, text, GIFs and videos into polished terminal art.',
  'r18.d': 'A Project Zomboid mod that counts zombie and hostile survivor kills separately, with its own rank system.',
  'rt.triage': 'FILE TRIAGE',
  'rt.behavior': 'BEHAVIOR ANALYSIS',
  'rt.forensics': 'FORENSICS',
  'rt.network': 'NETWORK ANALYSIS',
  'rt.re': 'REVERSE ENGINEERING',
  'rt.rules': 'DETECTION RULES',
  'rt.ai': 'AI &amp; SECURITY',
  'rt.lab': 'LEARNING LAB',
  'rt.devtool': 'DEVELOPER TOOL',
  'rt.termart': 'TERMINAL ART',
  'rt.mod': 'GAME MOD',
  'contact.h2': 'Let\'s stay<br><span>in touch.</span>',
  'contact.p': 'My source code and project documentation are on my GitHub profile; my other work and contact details are on my LinkedIn profile.',
  'contact.gh': 'CODE &amp; PROJECTS',
  'contact.li': 'LET\'S CONNECT',
  'mascot.aria': 'The dRafaleD mascot looking curiously at the screen',
  'mascot.note': 'Still scrolling… curious, aren\'t you?',
  'footer.top': 'Back to top <span aria-hidden="true">↑</span>',
  'motion.pause': '<span aria-hidden="true">Ⅱ</span> Pause animation',
  'motion.play': '<span aria-hidden="true">▷</span> Play animation',
  'count.one': '1 project',
  'count.many': '{n} projects',
};
const META = {
  tr: { description: 'Eren Erdoğan — dRafaleD. Siber güvenlik, yazılım geliştirme ve açık kaynak projeleri üzerine kişisel alanım.', og: 'Eren Erdoğan — backend geliştirme öğrencisi. Siber güvenlik, Linux, OSINT, zararlı yazılım analizi ve açık kaynak projeleri.' },
  en: { description: 'Eren Erdoğan — dRafaleD. My personal space on cybersecurity, software development and open-source projects.', og: 'Eren Erdoğan — backend development student. Cybersecurity, Linux, OSINT, malware analysis and open-source projects.' },
};
const TR_ONLY = {
  'motion.pause': '<span aria-hidden="true">Ⅱ</span> Animasyonu durdur',
  'motion.play': '<span aria-hidden="true">▷</span> Animasyonu oynat',
  'count.one': '1 proje',
  'count.many': '{n} proje',
};

const textNodes = [...document.querySelectorAll('[data-i18n]')];
const attrNodes = [...document.querySelectorAll('[data-i18n-attr]')];
// Capture the Turkish source once, straight from the markup.
for (const node of textNodes) node.dataset.tr = node.innerHTML;
const attrSources = attrNodes.map(node => node.dataset.i18nAttr.split(';').map(pair => {
  const [attr, key] = pair.split(':');
  return { node, attr, key, tr: node.getAttribute(attr) };
})).flat();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const switcher = document.querySelector('.lang-switch');
const langButtons = [...switcher.querySelectorAll('[data-lang]')];
let current = 'tr';
let switching = false;

function t(key, vars = {}) {
  const table = current === 'en' ? EN : TR_ONLY;
  return (table[key] ?? TR_ONLY[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function render(lang) {
  current = lang;
  document.documentElement.lang = lang;
  for (const node of textNodes) {
    node.innerHTML = lang === 'en' ? (EN[node.dataset.i18n] ?? node.dataset.tr) : node.dataset.tr;
  }
  for (const { node, attr, key, tr } of attrSources) {
    node.setAttribute(attr, lang === 'en' ? (EN[key] ?? tr) : tr);
  }
  document.querySelector('meta[name="description"]').content = META[lang].description;
  document.querySelector('meta[property="og:description"]').content = META[lang].og;
  langButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  switcher.dataset.active = lang;
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function remember(lang) {
  try { localStorage.setItem('lang', lang); } catch { /* storage may be unavailable */ }
}

// Fade the visible text out in a top-to-bottom wave, swap it, then fade it back in.
function setLanguage(lang) {
  if (lang === current || switching) return;
  remember(lang);
  if (reduceMotion.matches) { render(lang); return; }
  switching = true;
  const root = document.body;
  const viewport = window.innerHeight;
  for (const node of textNodes) {
    const top = node.getBoundingClientRect().top;
    const visible = top > -40 && top < viewport + 40;
    node.style.setProperty('--d', visible ? `${Math.round(Math.max(top, 0) / viewport * 240)}ms` : '0ms');
  }
  root.classList.add('lang-anim', 'lang-out', 'is-glitching');
  window.dispatchEvent(new CustomEvent('langwipe', { detail: { lang } }));
  setTimeout(() => {
    render(lang);
    root.classList.replace('lang-out', 'lang-in');
    setTimeout(() => {
      root.classList.remove('lang-anim', 'lang-in', 'is-glitching');
      for (const node of textNodes) node.style.removeProperty('--d');
      switching = false;
    }, 900);
  }, 520);
}

langButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));

function initialLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'tr' || saved === 'en') return saved;
  } catch { /* ignore */ }
  return (navigator.language || 'tr').toLowerCase().startsWith('tr') ? 'tr' : 'en';
}
switcher.dataset.active = 'tr';
const start = initialLanguage();
if (start === 'en') render('en');

window.siteI18n = { t, get lang() { return current; } };
