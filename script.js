/**
 * Vidhi Prajapati — Premium AI/DS Portfolio
 * Vanilla JavaScript — No frameworks
 */

(function () {
  'use strict';

  const GITHUB_USER = 'Vidhi560';
  const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`;

  const EXCLUDED_REPOS = ['portfolio'];

  const RELEVANT_KEYWORDS = [
    'python', 'data science', 'data-science', 'datascience',
    'machine learning', 'machine-learning', 'machinelearning', 'ml',
    'deep learning', 'deep-learning', 'deeplearning',
    'artificial intelligence', 'ai', 'ann', 'cnn', 'rnn', 'lstm',
    'nlp', 'natural language', 'sentiment', 'recommendation', 'recommender',
    'computer vision', 'vision', 'sql', 'data analysis', 'data-analysis',
    'analytics', 'analysis', 'eda', 'tensorflow', 'keras', 'pytorch',
    'scikit', 'sklearn', 'pandas', 'numpy', 'matplotlib', 'seaborn',
    'classification', 'regression', 'clustering', 'neural', 'model',
    'predict', 'forecast', 'jupyter', 'notebook', 'dataset', 'encoding',
    'gram', 'iris', 'movies', 'genre', 'missing', 'null'
  ];

  const RELEVANT_LANGUAGES = ['python', 'sql', 'jupyter notebook', 'r'];

  const TYPING_WORDS = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Data Analyst',
    'AI Enthusiast'
  ];

  let projectCount = 0;
  let repoCount = 0;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initTheme();
    initNavbar();
    initTyping();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initCertModal();
    initBackToTop();
    initContactForm();
    initProjectFilters();
    fetchProjects();
  }

  /* --- Loader --- */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    const hide = () => setTimeout(() => loader.classList.add('hidden'), 700);
    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
  }

  /* --- Theme --- */
  function initTheme() {
    const btn = document.getElementById('theme-btn');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    updateIcon(saved);

    btn?.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });

    function updateIcon(theme) {
      if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /* --- Navbar --- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu?.classList.remove('open');
        toggle?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
      });
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    }, { passive: true });
  }

  /* --- Typing --- */
  function initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = TYPING_WORDS[0];
      return;
    }

    let wi = 0, ci = 0, del = false;

    function type() {
      const word = TYPING_WORDS[wi];
      let delay = 80;

      if (del) {
        el.textContent = word.substring(0, ci - 1);
        ci--;
        delay = 40;
      } else {
        el.textContent = word.substring(0, ci + 1);
        ci++;
      }

      if (!del && ci === word.length) { del = true; delay = 2200; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % TYPING_WORDS.length; delay = 400; }

      setTimeout(type, delay);
    }
    type();
  }

  /* --- Scroll Reveal --- */
  function initScrollReveal() {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* --- Skill Progress Bars --- */
  function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const fill = e.target;
        fill.style.width = `${fill.dataset.width}%`;
        obs.unobserve(fill);
      });
    }, { threshold: 0.2 });
    fills.forEach(f => obs.observe(f));
  }

  /* --- Animated Counters --- */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number:not(.stat-dynamic)');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || e.target.dataset.animated) return;
        animateCounter(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(c => obs.observe(c));

    observeDynamicStats();
  }

  function observeDynamicStats() {
    ['stat-projects', 'stat-repos'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting || e.target.dataset.animated) return;
          const target = parseInt(e.target.dataset.target, 10);
          if (!isNaN(target) && target > 0) animateCounter(e.target);
          obs.unobserve(e.target);
        });
      }, { threshold: 0.4 });

      obs.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    el.dataset.animated = 'true';
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 50));

    const tick = () => {
      current += step;
      if (current < target) {
        el.textContent = current;
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    };
    tick();
  }

  function updateStatCounters() {
    const projectsEl = document.getElementById('stat-projects');
    const reposEl = document.getElementById('stat-repos');

    if (projectsEl) {
      const targetVal = parseInt(projectsEl.dataset.target, 10) || 5;
      projectsEl.dataset.target = targetVal;
      projectsEl.classList.add('stat-dynamic');
      if (isInViewport(projectsEl) && !projectsEl.dataset.animated) animateCounter(projectsEl);
    }
    if (reposEl) {
      reposEl.dataset.target = repoCount;
      reposEl.classList.add('stat-dynamic');
      if (isInViewport(reposEl) && !reposEl.dataset.animated) animateCounter(reposEl);
    }
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* --- Certificate Modal --- */
  function initCertModal() {
    const modal = document.getElementById('cert-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close');
    const cards = document.querySelectorAll('.cert-image-card');

    function openModal(card) {
      const title = card.dataset.title;
      const org = card.dataset.org;
      const link = card.dataset.link;

      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-org').textContent = org;
      document.getElementById('modal-link').href = link;

      const preview = document.getElementById('modal-preview');
      preview.innerHTML = `
        <div class="spinner" style="position: absolute;"></div>
        <img src="${link}" alt="${title} Certificate" style="width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 0.3s ease;" onload="this.style.opacity='1'; this.previousElementSibling.remove();">
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    cards.forEach(card => {
      card.addEventListener('click', () => openModal(card));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  /* --- Back to Top --- */
  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* --- GitHub Projects --- */
  async function fetchProjects() {
    const grid = document.getElementById('github-projects-grid');
    const loading = document.getElementById('github-projects-loading');
    const errorEl = document.getElementById('projects-error');
    const emptyEl = document.getElementById('projects-empty');
    if (!grid) return;

    try {
      const res = await fetch(GITHUB_API);
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const repos = await res.json();
      repoCount = repos.filter(r => !r.fork && !isExcludedRepo(r.name)).length;

      const filtered = repos
         .filter(r => !r.fork)
         .filter(r => !isExcludedRepo(r.name))
         .filter(r => isRelevantRepo(r));

      projectCount = filtered.length;
      loading?.classList.add('hidden');

      if (filtered.length === 0) {
        emptyEl?.classList.remove('hidden');
        updateStatCounters();
        return;
      }

      grid.insertAdjacentHTML('beforeend', filtered.map((r, i) => createProjectCard(r, i)).join(''));
      initScrollReveal();
      updateStatCounters();

    } catch (err) {
      console.error(err);
      loading?.classList.add('hidden');
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i><p>Unable to load projects from GitHub. Please try again later.</p>';
      }
    }
  }

  function isExcludedRepo(name) {
    return EXCLUDED_REPOS.includes(name.toLowerCase());
  }

  function isRelevantRepo(repo) {
    const text = [repo.name, repo.description || '', repo.language || '', ...(repo.topics || [])].join(' ').toLowerCase();
    if (RELEVANT_LANGUAGES.includes((repo.language || '').toLowerCase())) return true;
    return RELEVANT_KEYWORDS.some(k => text.includes(k));
  }

  // Maps a repository name to a premium custom cover asset based on keywords
  function getProjectImage(repoName) {
    const name = repoName.toLowerCase();
    
    // Movie Recommender
    if (name.includes('movie') || name.includes('recomm') || name.includes('genre')) {
      return 'assets/projects/recommender.png';
    }
    
    // NLP / Text Processing
    if (name.includes('nlp') || name.includes('word') || name.includes('sentence') || name.includes('token') || 
        name.includes('stop-word') || name.includes('stemming') || name.includes('lemmatization') || name.includes('n-gram')) {
      return 'assets/projects/nlp.png';
    }
    
    // Deep Learning / Neural Networks
    if (name.includes('cnn') || name.includes('neural') || name.includes('perceptron') || name.includes('deep') || 
        name.includes('ann') || name.includes('keras') || name.includes('tensorflow') || name.includes('pytorch')) {
      return 'assets/projects/deep_learning.png';
    }
    
    // Machine Learning / Classifications / Regressions
    if (name.includes('knn') || name.includes('classification') || name.includes('regression') || name.includes('clustering') || 
        name.includes('scikit') || name.includes('ml')) {
      return 'assets/projects/machine_learning.png';
    }
    
    // Data Analytics / Pandas / NumPy / Visualization
    if (name.includes('panda') || name.includes('numpy') || name.includes('seaborn') || name.includes('matplotlib') || 
        name.includes('null') || name.includes('missing') || name.includes('encoding') || name.includes('analytics') || 
        name.includes('analysis') || name.includes('eda')) {
      return 'assets/projects/data_analytics.png';
    }
    
    // Default fallback
    return 'assets/projects/data_analytics.png';
  }

  function createProjectCard(repo, index) {
    const name = escapeHtml(repo.name);
    const desc = escapeHtml(repo.description || 'Data science and analytics project hosted on GitHub.');
    const lang = repo.language ? escapeHtml(repo.language) : '';
    const topics = (repo.topics || []).slice(0, 3);
    const tags = [lang, ...topics.map(t => escapeHtml(t))].filter(Boolean);
    const tagsHtml = tags.map(t => `<span class="project-tag">${t}</span>`).join('') || '<span class="project-tag">Python</span>';
    const imgUrl = getProjectImage(repo.name);

    const demoBtn = repo.homepage
      ? `<a href="${repo.homepage}" class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : '';

    return `
      <article class="project-card fade-up">
        <div class="project-img-wrap">
          <img class="project-img" src="${imgUrl}" alt="${name} project preview" loading="lazy">
        </div>
        <div class="project-body">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="project-tags">${tagsHtml}</div>
          <div class="project-actions">
            <a href="${repo.html_url}" class="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github"></i> GitHub
            </a>
            ${demoBtn}
          </div>
        </div>
      </article>
    `;
  }

  /* --- Contact Form --- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');

    form.addEventListener('submit', e => {
      e.preventDefault();
      successEl?.classList.add('hidden');
      errorEl?.classList.add('hidden');

      const ok = validateName(nameInput) & validateEmail(emailInput) & validateMessage(messageInput);
      if (!ok) {
        errorEl.textContent = 'Please fix the errors above before submitting.';
        errorEl.classList.remove('hidden');
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      window.location.href = `mailto:vidhi3684@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

      successEl.textContent = 'Thank you! Your email client will open to send the message.';
      successEl.classList.remove('hidden');
      form.reset();
      clearErrors();
    });

    [nameInput, emailInput, messageInput].forEach(input => {
      input?.addEventListener('blur', () => validateField(input));
      input?.addEventListener('input', () => { if (input.classList.contains('invalid')) validateField(input); });
    });
  }

  function validateField(input) {
    if (input.id === 'contact-name') return validateName(input);
    if (input.id === 'contact-email') return validateEmail(input);
    if (input.id === 'contact-message') return validateMessage(input);
    return true;
  }

  function validateName(input) {
    const err = document.getElementById('name-error');
    const v = input.value.trim();
    if (!v) return setErr(input, err, 'Name is required.'), false;
    if (v.length < 2) return setErr(input, err, 'Name must be at least 2 characters.'), false;
    return clearErr(input, err), true;
  }

  // Standard email validation regex
  function validateEmail(input) {
    const err = document.getElementById('email-error');
    const v = input.value.trim();
    if (!v) return setErr(input, err, 'Email is required.'), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setErr(input, err, 'Please enter a valid email.'), false;
    return clearErr(input, err), true;
  }

  function validateMessage(input) {
    const err = document.getElementById('message-error');
    const v = input.value.trim();
    if (!v) return setErr(input, err, 'Message is required.'), false;
    if (v.length < 10) return setErr(input, err, 'Message must be at least 10 characters.'), false;
    return clearErr(input, err), true;
  }

  function setErr(input, errEl, msg) {
    input.classList.add('invalid');
    if (errEl) errEl.textContent = msg;
    return false;
  }

  // Clears active error status on a form element
  function clearErr(input, errEl) {
    input.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
    return true;
  }

  function clearErrors() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('invalid'));
    document.querySelectorAll('.form-feedback.error').forEach(el => {
      if (el.id !== 'form-error') el.textContent = '';
    });
  }

  /* --- Project Filtering --- */
  function initProjectFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#featured-projects-grid .project-card');

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.dataset.filter;

        // Update active filter button attributes and classes
        filters.forEach(f => {
          f.classList.remove('active');
          f.setAttribute('aria-selected', 'false');
          f.setAttribute('tabindex', '-1');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        btn.setAttribute('tabindex', '0');

        cards.forEach(card => {
          // Trigger smooth fade-out and scale transition
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.98)';

          setTimeout(() => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
              card.classList.remove('hidden');
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
              }, 50);
            } else {
              card.classList.add('hidden');
            }
          }, 300); // matches CSS transitions
        });
      });

      // Keyboard navigation support for accessibility (Arrow keys)
      btn.addEventListener('keydown', e => {
        let index = Array.from(filters).indexOf(btn);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          let nextIndex = (index + 1) % filters.length;
          filters[nextIndex].focus();
          filters[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          let prevIndex = (index - 1 + filters.length) % filters.length;
          filters[prevIndex].focus();
          filters[prevIndex].click();
        }
      });
    });
  }

  function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

})();
