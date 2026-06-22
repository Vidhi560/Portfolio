/**
 * Vidhi Prajapati — Data Science & AI/ML Portfolio
 * Vanilla JavaScript — No frameworks
 */

(function () {
  'use strict';

  /* --- Constants --- */
  const GITHUB_USER = 'Vidhi560';
  const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`;

  /** Repositories to always exclude */
  const EXCLUDED_REPOS = ['portfolio'];

  /** Keywords for filtering relevant DS/AI/ML repositories */
  const RELEVANT_KEYWORDS = [
    'python', 'data science', 'data-science', 'datascience',
    'machine learning', 'machine-learning', 'machinelearning', 'ml',
    'deep learning', 'deep-learning', 'deeplearning',
    'artificial intelligence', 'ai',
    'ann', 'cnn', 'rnn', 'lstm',
    'nlp', 'natural language', 'sentiment',
    'recommendation', 'recommender',
    'computer vision', 'vision',
    'sql', 'data analysis', 'data-analysis', 'data analytics',
    'analytics', 'analysis', 'eda',
    'tensorflow', 'keras', 'pytorch', 'scikit', 'sklearn',
    'pandas', 'numpy', 'matplotlib', 'seaborn',
    'classification', 'regression', 'clustering',
    'neural', 'model', 'predict', 'forecast',
    'jupyter', 'notebook', 'dataset'
  ];

  const RELEVANT_LANGUAGES = [
    'python', 'sql', 'jupyter notebook', 'r'
  ];

  const TYPING_WORDS = [
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Computer Vision',
    'Artificial Intelligence'
  ];

  /* --- DOM Ready --- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initTheme();
    initNavbar();
    initTyping();
    initScrollReveal();
    initBackToTop();
    initContactForm();
    fetchProjects();
  }

  /* --- Page Loader --- */
  function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    const hide = () => setTimeout(() => loader.classList.add('hidden'), 700);

    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide, { once: true });
  }

  /* --- Dark / Light Theme --- */
  function initTheme() {
    const btn = document.getElementById('theme-btn');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'dark';

    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved);

    btn?.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
      if (!icon) return;
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  /* --- Sticky Navbar & Mobile Menu --- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /* Scroll shadow */
    window.addEventListener('scroll', () => {
      navbar?.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    /* Mobile toggle */
    toggle?.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    /* Close menu on link click */
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu?.classList.remove('open');
        toggle?.classList.remove('active');
        toggle?.setAttribute('aria-expanded', 'false');
      });
    });

    /* Smooth scroll */
    links.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    /* Active link on scroll */
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
          current = section.getAttribute('id');
        }
      });
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }, { passive: true });
  }

  /* --- Typing Animation --- */
  function initTyping() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = TYPING_WORDS[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const word = TYPING_WORDS[wordIndex];
      let delay = 100;

      if (deleting) {
        el.textContent = word.substring(0, charIndex - 1);
        charIndex--;
        delay = 50;
      } else {
        el.textContent = word.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* --- Scroll Reveal --- */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* --- Back to Top --- */
  function initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- GitHub Projects --- */
  async function fetchProjects() {
    const grid = document.getElementById('projects-grid');
    const loading = document.getElementById('projects-loading');
    const errorEl = document.getElementById('projects-error');
    const emptyEl = document.getElementById('projects-empty');

    if (!grid) return;

    try {
      const response = await fetch(GITHUB_API);

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const repos = await response.json();
      const filtered = repos
        .filter(repo => !repo.fork)
        .filter(repo => !isExcludedRepo(repo.name))
        .filter(repo => isRelevantRepo(repo));

      loading?.classList.add('hidden');

      if (filtered.length === 0) {
        emptyEl?.classList.remove('hidden');
        return;
      }

      const cards = filtered.map(repo => createProjectCard(repo)).join('');
      grid.insertAdjacentHTML('beforeend', cards);

      /* Reveal new cards */
      grid.querySelectorAll('.project-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.08}s`;
        setTimeout(() => card.classList.add('visible'), 50);
      });

    } catch (err) {
      loading?.classList.add('hidden');
      if (errorEl) {
        errorEl.classList.remove('hidden');
        errorEl.innerHTML = `
          <i class="fas fa-exclamation-triangle"></i>
          <p>Unable to load projects from GitHub. Please try again later.</p>
        `;
      }
    }
  }

  /** Exclude Portfolio / portfolio repositories */
  function isExcludedRepo(name) {
    return EXCLUDED_REPOS.includes(name.toLowerCase());
  }

  /** Check if repository is related to DS/AI/ML topics */
  function isRelevantRepo(repo) {
    const searchText = [
      repo.name,
      repo.description || '',
      repo.language || '',
      ...(repo.topics || [])
    ].join(' ').toLowerCase();

    if (RELEVANT_LANGUAGES.includes((repo.language || '').toLowerCase())) {
      return true;
    }

    return RELEVANT_KEYWORDS.some(keyword => searchText.includes(keyword));
  }

  function createProjectCard(repo) {
    const name = escapeHtml(repo.name);
    const desc = escapeHtml(repo.description || 'No description provided.');
    const lang = repo.language ? escapeHtml(repo.language) : '';
    const topics = (repo.topics || []).slice(0, 4);

    const tags = [
      lang,
      ...topics.map(t => escapeHtml(t))
    ].filter(Boolean);

    const tagsHtml = tags.length
      ? tags.map(t => `<span class="project-tag">${t}</span>`).join('')
      : '<span class="project-tag">GitHub</span>';

    return `
      <article class="project-card fade-up">
        <div class="project-card-header">
          <h3>${name}</h3>
          <i class="fas fa-folder-open project-card-icon" aria-hidden="true"></i>
        </div>
        <p>${desc}</p>
        <div class="project-tags">${tagsHtml}</div>
        <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener noreferrer">
          View on GitHub <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
      </article>
    `;
  }

  /* --- Contact Form Validation --- */
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

      const nameValid = validateName(nameInput);
      const emailValid = validateEmail(emailInput);
      const messageValid = validateMessage(messageInput);

      if (!nameValid || !emailValid || !messageValid) {
        if (errorEl) {
          errorEl.textContent = 'Please fix the errors above before submitting.';
          errorEl.classList.remove('hidden');
        }
        return;
      }

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      const mailto = `mailto:vidhi3684@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

      window.location.href = mailto;

      if (successEl) {
        successEl.textContent = 'Thank you! Your email client will open to send the message.';
        successEl.classList.remove('hidden');
      }

      form.reset();
      clearErrors();
    });

    [nameInput, emailInput, messageInput].forEach(input => {
      input?.addEventListener('blur', () => {
        if (input === nameInput) validateName(nameInput);
        if (input === emailInput) validateEmail(emailInput);
        if (input === messageInput) validateMessage(messageInput);
      });

      input?.addEventListener('input', () => {
        if (input.classList.contains('invalid')) {
          if (input === nameInput) validateName(nameInput);
          if (input === emailInput) validateEmail(emailInput);
          if (input === messageInput) validateMessage(messageInput);
        }
      });
    });
  }

  function validateName(input) {
    const error = document.getElementById('name-error');
    const val = input.value.trim();

    if (!val) {
      setFieldError(input, error, 'Name is required.');
      return false;
    }
    if (val.length < 2) {
      setFieldError(input, error, 'Name must be at least 2 characters.');
      return false;
    }
    clearFieldError(input, error);
    return true;
  }

  function validateEmail(input) {
    const error = document.getElementById('email-error');
    const val = input.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      setFieldError(input, error, 'Email is required.');
      return false;
    }
    if (!regex.test(val)) {
      setFieldError(input, error, 'Please enter a valid email address.');
      return false;
    }
    clearFieldError(input, error);
    return true;
  }

  function validateMessage(input) {
    const error = document.getElementById('message-error');
    const val = input.value.trim();

    if (!val) {
      setFieldError(input, error, 'Message is required.');
      return false;
    }
    if (val.length < 10) {
      setFieldError(input, error, 'Message must be at least 10 characters.');
      return false;
    }
    clearFieldError(input, error);
    return true;
  }

  function setFieldError(input, errorEl, msg) {
    input.classList.add('invalid');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }

  function clearErrors() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
      el.classList.remove('invalid');
    });
    document.querySelectorAll('.form-feedback.error').forEach(el => {
      if (el.id !== 'form-error') el.textContent = '';
    });
  }

  /* --- Utility --- */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

})();
