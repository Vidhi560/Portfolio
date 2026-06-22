/* ============================================
   PREMIUM PORTFOLIO — VIDHI PRAJAPATI
   JavaScript Functionality
   ============================================ */

const GITHUB_USERNAME = 'Vidhi560';
const GITHUB_USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;
const OG_IMAGE_BASE = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/`;

/** Technology-themed placeholder gradients */
const PLACEHOLDER_THEMES = {
    netflix: { class: 'placeholder-netflix', label: 'Netflix Analytics' },
    powerbi: { class: 'placeholder-powerbi', label: 'Power BI Dashboard' },
    analytics: { class: 'placeholder-analytics', label: 'Data Analytics' },
    ml: { class: 'placeholder-ml', label: 'Machine Learning' },
    default: { class: 'placeholder-default', label: 'Project' }
};

const FALLBACK_KEYWORDS = {
    netflix: 'netflix',
    powerbi: 'powerbi',
    analytics: 'segmentation',
    ml: 'flower'
};

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initThemeToggle();
    initMobileMenu();
    initScrollProgress();
    initCursorGlow();
    initScrollAnimations();
    initParticleBackground();
    initTypingEffect();
    initCircularSkills();
    initGitHubDashboard();
    initGitHubProjects();
    initProjectImageFallbacks();
    initBackToTop();
    initContactForm();
    initSmoothScroll();
    initNavActiveState();
    initHeaderScroll();
    initCounterAnimation();
    updateYear();
});

// ============================================
// LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hide = () => setTimeout(() => loader.classList.add('hidden'), 900);

    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
}

// ============================================
// THEME TOGGLE (dark default)
// ============================================
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'dark';

    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved);

    toggle?.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.innerHTML = theme === 'dark'
            ? '<i class="fas fa-sun" aria-hidden="true"></i>'
            : '<i class="fas fa-moon" aria-hidden="true"></i>';
    }
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('navbar');
    if (!btn || !nav) return;

    const close = () => {
        nav.classList.remove('open');
        btn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        btn.setAttribute('aria-expanded', 'false');
    };

    btn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        btn.innerHTML = open
            ? '<i class="fas fa-times" aria-hidden="true"></i>'
            : '<i class="fas fa-bars" aria-hidden="true"></i>';
        btn.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => {
        if (!nav.contains(e.target) && !btn.contains(e.target)) close();
    });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    }, { passive: true });
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

    document.addEventListener('mousemove', e => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    }, { passive: true });
}

// ============================================
// SCROLL REVEAL
// ============================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

// ============================================
// PARTICLE BACKGROUND
// ============================================
function initParticleBackground() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() > 0.5 ? 240 : 190;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const init = () => {
        particles = [];
        const count = Math.min(90, Math.floor(canvas.width * canvas.height / 16000));
        for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const connect = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 110) * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connect();
        animId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', () => { resize(); init(); });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const el = document.querySelector('.typing-text');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (el) el.textContent = 'Data Analyst';
        return;
    }

    const texts = ['Data Analyst', 'Power BI Developer', 'Data Science Enthusiast'];
    let ti = 0, ci = 0, del = false;

    const type = () => {
        const cur = texts[ti];
        let speed = 100;

        if (del) {
            el.textContent = cur.substring(0, ci - 1);
            ci--;
            speed = 45;
        } else {
            el.textContent = cur.substring(0, ci + 1);
            ci++;
        }

        if (!del && ci === cur.length) { del = true; speed = 2000; }
        else if (del && ci === 0) { del = false; ti = (ti + 1) % texts.length; speed = 400; }

        setTimeout(type, speed);
    };
    type();
}

// ============================================
// CIRCULAR SKILL PROGRESS
// ============================================
function initCircularSkills() {
    const circumference = 2 * Math.PI * 52;
    const circles = document.querySelectorAll('.circle-progress');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const circle = entry.target;
            const percent = parseInt(circle.dataset.percent, 10) || 0;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            observer.unobserve(circle);
        });
    }, { threshold: 0.4 });

    circles.forEach(c => {
        c.style.strokeDasharray = circumference;
        c.style.strokeDashoffset = circumference;
        observer.observe(c);
    });
}

// ============================================
// GITHUB DASHBOARD
// ============================================
async function initGitHubDashboard() {
    const recentList = document.getElementById('github-recent-list');
    const contribGrid = document.getElementById('contrib-grid');

    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(GITHUB_USER_URL),
            fetch(GITHUB_REPOS_URL)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('API error');

        const user = await userRes.json();
        const repos = await reposRes.json();
        const publicRepos = repos.filter(r => !r.fork);
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

        setText('gh-repos', user.public_repos ?? publicRepos.length);
        setText('gh-followers', user.followers ?? 0);
        setText('gh-following', user.following ?? 0);
        setText('gh-stars', totalStars);

        if (contribGrid) {
            renderContributionGrid(contribGrid, buildActivityMap(repos));
        }

        if (recentList) {
            const recent = [...publicRepos]
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 5);

            recentList.innerHTML = recent.length
                ? recent.map(r => `
                    <a href="${r.html_url}" class="github-recent-item" target="_blank" rel="noopener noreferrer">
                        <strong><i class="fas fa-book" aria-hidden="true"></i> ${escapeHtml(r.name)}</strong>
                        <span>${formatDate(r.updated_at)}</span>
                    </a>
                `).join('')
                : '<p class="loading-text">No public repositories found.</p>';
        }
    } catch {
        ['gh-repos', 'gh-followers', 'gh-following', 'gh-stars'].forEach(id => setText(id, '—'));
        if (recentList) recentList.innerHTML = '<p class="loading-text">Unable to load GitHub data.</p>';
        if (contribGrid) contribGrid.innerHTML = '';
    }
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function buildActivityMap(repos) {
    const map = {};
    const today = new Date();
    const weeks = 52;

    for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < 7; d++) {
            const date = new Date(today);
            date.setDate(date.getDate() - (weeks - w) * 7 - (6 - d));
            map[date.toISOString().split('T')[0]] = 0;
        }
    }

    repos.forEach(repo => {
        const key = new Date(repo.pushed_at || repo.updated_at).toISOString().split('T')[0];
        if (map[key] !== undefined) map[key]++;
    });

    return map;
}

function renderContributionGrid(container, activityMap) {
    const dates = Object.keys(activityMap).sort();
    const max = Math.max(...Object.values(activityMap), 1);

    container.innerHTML = dates.map(date => {
        const count = activityMap[date];
        const level = count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4));
        const label = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `<span class="contrib-cell level-${level}" title="${count} update(s) on ${label}"></span>`;
    }).join('');
}

// ============================================
// GITHUB PROJECTS
// ============================================
async function initGitHubProjects() {
    const container = document.getElementById('github-projects');
    if (!container) return;

    try {
        const res = await fetch(GITHUB_REPOS_URL);
        if (!res.ok) throw new Error('Failed');

        const repos = (await res.json()).filter(r => !r.fork);
        container.innerHTML = repos.length
            ? repos.map(r => createProjectCard(r)).join('')
            : '<p class="no-projects">No projects found.</p>';

        buildFilterButtons(repos);
        initProjectFilter();
        initProjectSearch();
        initProjectImageFallbacks();
        initScrollAnimations();
    } catch {
        container.innerHTML = '<div class="error-message"><p>Unable to load GitHub repositories.</p></div>';
    }
}

function createProjectCard(repo) {
    const lang = repo.language || 'Other';
    const ogUrl = `${OG_IMAGE_BASE}${repo.name}`;
    const topics = (repo.topics || []).slice(0, 4);

    return `
        <article class="project-card-premium reveal" data-language="${lang.toLowerCase()}" data-name="${repo.name.toLowerCase()}">
            <div class="project-banner-wrap">
                <img class="project-banner" src="${ogUrl}" alt="${escapeHtml(repo.name)}" loading="lazy"
                     data-repo="${escapeHtml(repo.name)}" data-fallback="default">
                <div class="project-banner-overlay"></div>
            </div>
            <div class="project-body">
                <h3>${escapeHtml(repo.name)}</h3>
                <p>${escapeHtml(repo.description || 'No description available.')}</p>
                <div class="project-tech">
                    ${lang !== 'Other' ? `<span class="tech-badge">${escapeHtml(lang)}</span>` : ''}
                    ${topics.map(t => `<span class="tech-badge">${escapeHtml(t)}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${repo.html_url}" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" class="btn btn-sm btn-glass" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
                <div class="project-meta">
                    <span class="project-date">Updated ${formatDate(repo.updated_at)}</span>
                    ${repo.stargazers_count > 0 ? `<span class="project-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>` : ''}
                </div>
            </div>
        </article>
    `;
}

function buildFilterButtons(repos) {
    const container = document.getElementById('projects-filter');
    if (!container) return;

    const langs = [...new Set(repos.map(r => r.language).filter(Boolean))].sort();
    container.innerHTML = `
        <button class="filter-btn active" type="button" data-filter="all">All</button>
        ${langs.map(l => `<button class="filter-btn" type="button" data-filter="${l.toLowerCase()}">${escapeHtml(l)}</button>`).join('')}
    `;
}

function initProjectFilter() {
    const container = document.getElementById('projects-filter');
    container?.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('project-search').value = '';
        applyFilters(btn.dataset.filter, '');
    });
}

function initProjectSearch() {
    document.getElementById('project-search')?.addEventListener('input', e => {
        const active = document.querySelector('.filter-btn.active');
        applyFilters(active?.dataset.filter || 'all', e.target.value.toLowerCase());
    });
}

function applyFilters(langFilter, search) {
    document.querySelectorAll('#github-projects .project-card-premium').forEach(card => {
        const lang = (card.dataset.language || '').toLowerCase();
        const name = card.dataset.name || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
        const matchLang = langFilter === 'all' || lang === langFilter;
        const matchSearch = !search || name.includes(search) || desc.includes(search);
        card.style.display = matchLang && matchSearch ? '' : 'none';
    });
}

// ============================================
// PROJECT IMAGE FALLBACKS
// ============================================
function initProjectImageFallbacks() {
    document.querySelectorAll('.project-banner').forEach(img => {
        if (img.dataset.fallbackBound) return;
        img.dataset.fallbackBound = 'true';

        img.addEventListener('error', () => {
            const key = img.dataset.fallback || 'default';
            const theme = PLACEHOLDER_THEMES[key] || PLACEHOLDER_THEMES.default;
            const wrap = img.closest('.project-banner-wrap');
            if (!wrap) return;

            img.style.display = 'none';
            wrap.classList.add(theme.class);
            wrap.setAttribute('data-label', theme.label);
        }, { once: true });
    });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const success = document.getElementById('form-success');
        if (!validateForm(fields)) { if (success) success.hidden = true; return; }

        const data = Object.fromEntries(Object.entries(fields).map(([k, f]) => [k, f.value.trim()]));
        window.location.href = `mailto:vidhi3684@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;

        if (success) {
            success.hidden = false;
            success.textContent = 'Thank you! Your email client will open shortly.';
        }
        form.reset();
        Object.values(fields).forEach(f => f.classList.remove('invalid'));
    });

    Object.entries(fields).forEach(([key, field]) => {
        field?.addEventListener('blur', () => validateField(key, field));
        field?.addEventListener('input', () => {
            if (field.classList.contains('invalid')) validateField(key, field);
        });
    });
}

function validateForm(fields) {
    return Object.entries(fields).every(([k, f]) => f && validateField(k, f));
}

function validateField(name, field) {
    const err = document.getElementById(`${name}-error`);
    const val = field.value.trim();
    let msg = '';

    if (!val) msg = 'This field is required.';
    else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email.';
    else if (name === 'name' && val.length < 2) msg = 'Name must be at least 2 characters.';
    else if (name === 'message' && val.length < 10) msg = 'Message must be at least 10 characters.';

    field.classList.toggle('invalid', Boolean(msg));
    if (err) err.textContent = msg;
    return !msg;
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

// ============================================
// NAV ACTIVE + HEADER
// ============================================
function initNavActiveState() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('#navbar a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.pageYOffset >= s.offsetTop - 180) current = s.id;
        });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }, { passive: true });
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// ============================================
// COUNTERS
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            let current = 0;
            const step = Math.max(1, target / 45);

            const tick = () => {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target + suffix;
                }
            };
            tick();
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ============================================
// UTILITIES
// ============================================
function updateYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}
