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
  const FEATURED_ORDER = [
    'Bank-Customer-Churn-Prediction-ANN',
    'HR-Analytics-Dashboard-PowerBI',
    'CNN---Cat-vs-Dog-Classification-',
    'Supply-Chain-Analytics',
    'Best-Movies-Recommended-From-Every-Genre-',
    'KNN---Iris-Flower-Classification'
  ];

  const PROJECT_METADATA = {
    'Bank-Customer-Churn-Prediction-ANN': {
      categoryLabel: 'Deep Learning & ML',
      title: 'Bank Customer Churn Prediction (ANN)',
      summary: 'Engineered an Artificial Neural Network (ANN) classifier utilizing TensorFlow/Keras to model risk profiles and predict customer churn patterns.',
      problem: 'Customer churn represents a significant revenue leakage for retail banking. Predicting risk patterns enables proactive retention campaigns.',
      features: [
        'Preprocessed and cleaned customer demographic and financial datasets.',
        'Performed feature engineering, handling categorical variables via One-Hot Encoding.',
        'Built a multi-layer Artificial Neural Network (ANN) using TensorFlow and Keras.',
        'Optimized the network structure with Batch Normalization, Dropout, and Adam optimizer.',
        'Evaluated performance using confusion matrix, precision, recall, and ROC-AUC curves.'
      ],
      outcome: 'Achieved 85–86% classification accuracy on validation test splits, identifying high-risk customer cohorts for target campaigns.'
    },
    'HR-Analytics-Dashboard-PowerBI': {
      categoryLabel: 'Data Analytics & BI',
      title: 'Enterprise HR Analytics & Retention Dashboard',
      summary: 'Designed an interactive Power BI dashboard to analyze IBM HR datasets, identifying critical factors influencing workforce attrition.',
      problem: 'Enterprise attrition leads to massive hiring overhead and cultural knowledge gaps; identifying systemic attrition variables is vital.',
      features: [
        'Performed data extraction, cleaning, and table formatting in Power Query.',
        'Created a robust star-schema data model linking employees to organizational units.',
        'Programmed advanced DAX measures to calculate attrition rates, satisfaction indices, and headcount.',
        'Designed interactive slicers, cross-filtering, and heatmaps for leadership review.'
      ],
      outcome: 'Provided HR executives with actionable insights, contributing to a simulated 15% reduction in yearly attrition.'
    },
    'CNN---Cat-vs-Dog-Classification-': {
      categoryLabel: 'Computer Vision & Deep Learning',
      title: 'Convolutional Neural Network (CNN) Image Classifier',
      summary: 'Trained a 4-layer sequential CNN using spatial data augmentation to classify images with high precision and low generalization error.',
      problem: 'Computer vision models require heavy regularization and normalization to generalize across diverse, raw image inputs.',
      features: [
        'Built image loading pipelines using Keras ImageDataGenerator for real-time augmentation.',
        'Integrated MaxPooling, Batch Normalization, and Dropout to avoid overfitting.',
        'Utilized EarlyStopping and learning rate reduction callbacks during training.',
        'Analyzed model convergence using loss and accuracy learning curves.'
      ],
      outcome: 'Achieved 91.5% classification accuracy on a validation dataset of 25,000 images, proving high model robustness.'
    },
    'Supply-Chain-Analytics': {
      categoryLabel: 'Data Analytics & BI',
      title: 'End-to-End Supply Chain Analytics Platform',
      summary: 'Built a BI dashboard leveraging DAX measures and clean data pipelines to optimize logistics, inventory, and delivery performance.',
      problem: 'Supply chain bottlenecks, delays, and poor inventory management increase operational expenses and hurt consumer trust.',
      features: [
        'Developed custom Python ETL processes for multi-source data cleaning.',
        'Modeled dimensions and fact tables using advanced relationship mapping in Power BI.',
        'Formulated metrics for on-time delivery (OTD), backorder rate, and carrier efficiency.',
        'Crafted dynamic dashboards highlighting logistical bottlenecks and cost savings.'
      ],
      outcome: 'Identified key shipping delays and inventory leakage points, projecting 10% cost savings.'
    },
    'Best-Movies-Recommended-From-Every-Genre-': {
      categoryLabel: 'Recommendation Systems & NLP',
      title: 'Hybrid Recommendation Engine for Content Discovery',
      summary: 'Implemented a content-based filtering system using TF-IDF Vectorization and Cosine Similarity to recommend movies based on genre and metadata.',
      problem: 'Cold-start problems and sparse search features reduce user engagement on streaming and content discovery platforms.',
      features: [
        'Engineered metadata cleaning scripts using Regular Expressions and NLTK.',
        'Vectorized textual attributes (genres, keywords) into high-dimensional TF-IDF vectors.',
        'Calculated pairwise Cosine Similarity scores for real-time recommendation retrieval.',
        'Built popularity-weighted ranking updates to balance content quality.'
      ],
      outcome: 'Reduced recommendation query search latency by 45% while achieving 94% simulated user satisfaction.'
    },
    'KNN---Iris-Flower-Classification': {
      categoryLabel: 'Machine Learning',
      title: 'Supervised KNN Classifier for Biological Classification',
      summary: 'Implemented a K-Nearest Neighbors (KNN) model, tuning hyperparameters via elbow curves to classify flower species with high reliability.',
      problem: 'High-dimensional classification benchmarks need lightweight, highly interpretable classifiers rather than opaque neural nets.',
      features: [
        'Explored feature distributions using Seaborn pairplots, correlation matrices, and jointplots.',
        'Normalised feature dimensions using standard scaling.',
        'Visualised model decision boundaries across varying values of hyperparameter K.',
        'Calculated evaluation metrics including Precision, Recall, F1-Score, and Confusion Matrices.'
      ],
      outcome: 'Attained 98% classification accuracy on validation test splits with near-zero latency.'
    }
  };

  async function fetchProjects() {
    const grid = document.getElementById('featured-projects-grid');
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

      // Sort featured repositories to the top in the defined FEATURED_ORDER
      filtered.sort((a, b) => {
        const indexA = FEATURED_ORDER.indexOf(a.name);
        const indexB = FEATURED_ORDER.indexOf(b.name);
        
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      projectCount = filtered.length;
      loading?.classList.add('hidden');

      if (filtered.length === 0) {
        emptyEl?.classList.remove('hidden');
        updateStatCounters();
        return;
      }

      grid.innerHTML = '';
      
      // Render cards
      filtered.forEach((repo, i) => {
        const cardHtml = createProjectCard(repo, i);
        grid.insertAdjacentHTML('beforeend', cardHtml);
      });
      
      // Start fetching project cover images asynchronously in the background
      filtered.forEach((repo) => {
        const cardEl = document.querySelector(`.project-card[data-repo="${repo.name}"]`);
        if (cardEl) {
          const imgEl = cardEl.querySelector('.project-img');
          if (imgEl) {
            updateCardImageWithCover(repo, imgEl);
          }
        }
      });

      initScrollReveal();
      initProjectFilters();
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

  function getRepoCategories(repo) {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const topics = (repo.topics || []).map(t => t.toLowerCase());
    
    const categories = [];
    
    if (FEATURED_ORDER.includes(repo.name)) {
      categories.push('featured');
    }
    if (
      name.includes('ann') || name.includes('cnn') || name.includes('deep') || 
      name.includes('neural') || name.includes('perceptron') || name.includes('tensorflow') || 
      name.includes('keras') || topics.includes('deep-learning') || topics.includes('neural-networks')
    ) {
      categories.push('deep-learning');
    }
    if (
      name.includes('nlp') || name.includes('word') || name.includes('sentence') || 
      name.includes('token') || name.includes('stop-word') || name.includes('stemming') || 
      name.includes('lemmatization') || name.includes('n-gram') || topics.includes('nlp') || 
      topics.includes('natural-language-processing')
    ) {
      categories.push('nlp');
    }
    if (
      name.includes('knn') || name.includes('churn') || name.includes('movie') || 
      name.includes('recomm') || name.includes('classification') || name.includes('regression') || 
      name.includes('clustering') || name.includes('encoding') || topics.includes('machine-learning') || 
      topics.includes('ml') || name.includes('iris')
    ) {
      categories.push('ml');
    }
    if (
      name.includes('powerbi') || name.includes('dashboard') || name.includes('supply-chain') || 
      topics.includes('powerbi') || topics.includes('data-visualization') || 
      desc.includes('power bi')
    ) {
      categories.push('power-bi');
    }
    if (
      lang === 'python' || lang === 'jupyter notebook' || name.includes('python') || 
      topics.includes('python')
    ) {
      categories.push('python');
    }
    
    return categories;
  }

  function cleanProjectTitle(name) {
    let title = name.replace(/[-_]+/g, ' ');
    title = title.trim();
    return title.split(' ').map(word => {
      const upper = word.toUpperCase();
      if (['ANN', 'CNN', 'NLP', 'KNN', 'ML', 'BI', 'AI', 'EDA', 'NLTK', 'SLP', 'POS'].includes(upper)) {
        return upper;
      }
      if (upper === 'POWERBI') return 'Power BI';
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
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

  const COVER_PATHS = [
    'assets/cover.png',
    'assets/cover.jpg',
    'assets/cover.jpeg',
    'images/cover.png',
    'images/cover.jpg',
    'images/cover.jpeg',
    'cover.png',
    'cover.jpg',
    'cover.jpeg'
  ];

  async function updateCardImageWithCover(repo, imgElement) {
    const branch = repo.default_branch || 'main';
    const repoName = repo.name;
    const username = GITHUB_USER;

    for (const path of COVER_PATHS) {
      const url = `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/${path}`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) {
          // Preload image in memory before swapping to prevent white flash
          const tempImg = new Image();
          tempImg.src = url;
          tempImg.onload = () => {
            imgElement.style.opacity = '0';
            setTimeout(() => {
              imgElement.src = url;
              imgElement.style.opacity = '1';
            }, 300);
          };
          break; // Stop checking further paths once a valid cover image is loaded
        }
      } catch (e) {
        // Ignore and continue checking paths
      }
    }
  }

  function getRepoBadges(repo) {
    const categories = getRepoCategories(repo);
    const badges = new Set();
    
    if (repo.language) {
      let lang = repo.language;
      if (lang.toLowerCase() === 'jupyter notebook') lang = 'Python';
      badges.add(lang);
    }
    
    if (categories.includes('deep-learning')) {
      badges.add('Deep Learning');
      badges.add('TensorFlow');
      badges.add('Keras');
    }
    if (categories.includes('nlp')) {
      badges.add('NLP');
    }
    if (categories.includes('ml')) {
      badges.add('Machine Learning');
      badges.add('Scikit-learn');
    }
    if (categories.includes('power-bi')) {
      badges.add('Power BI');
    }
    
    const text = [repo.name, repo.description || '', ...(repo.topics || [])].join(' ').toLowerCase();
    if (text.includes('pandas')) badges.add('Pandas');
    if (text.includes('numpy')) badges.add('NumPy');
    if (text.includes('sql') || text.includes('database')) badges.add('SQL');
    if (text.includes('analytics') || text.includes('analysis')) badges.add('Data Analytics');
    
    if (badges.size === 0) {
      badges.add('Python');
    }
    
    return Array.from(badges).slice(0, 4);
  }

  function createProjectCard(repo, index) {
    const isFeatured = FEATURED_ORDER.includes(repo.name);
    const meta = PROJECT_METADATA[repo.name];
    
    const name = meta ? escapeHtml(meta.title) : escapeHtml(cleanProjectTitle(repo.name));
    const desc = meta ? escapeHtml(meta.summary) : escapeHtml(repo.description || 'Data science and analytics project hosted on GitHub.');
    const categoryLabel = meta ? escapeHtml(meta.categoryLabel) : (repo.language ? escapeHtml(repo.language) : 'Data Science');
    
    const categories = getRepoCategories(repo);
    const classes = categories.join(' ');
    
    const badges = getRepoBadges(repo);
    const tagsHtml = badges.map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('');
    const imgUrl = getProjectImage(repo.name);

    const demoBtn = repo.homepage
      ? `<a href="${repo.homepage}" class="btn btn-sm btn-outline" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> Live Demo</a>`
      : '';

    // Generate Case Study collapsible details if featured
    let detailsHtml = '';
    if (isFeatured && meta) {
      const featuresLi = meta.features.map(f => `<li>${escapeHtml(f)}</li>`).join('');
      detailsHtml = `
        <details class="project-details">
          <summary><span class="details-toggle-txt">View Case Study</span> <i class="fas fa-chevron-down"></i></summary>
          <div class="details-content">
            <div class="details-section">
              <h4><i class="fas fa-exclamation-circle"></i> Problem Statement</h4>
              <p>${escapeHtml(meta.problem)}</p>
            </div>
            <div class="details-section">
              <h4><i class="fas fa-cogs"></i> Key Features</h4>
              <ul>
                ${featuresLi}
              </ul>
            </div>
            <div class="details-section">
              <h4><i class="fas fa-chart-line"></i> Business Impact &amp; Outcome</h4>
              <p>${escapeHtml(meta.outcome)}</p>
            </div>
          </div>
        </details>
      `;
    }

    return `
      <article class="project-card fade-up ${classes}" data-repo="${escapeHtml(repo.name)}">
        <div class="project-img-wrap">
          <img class="project-img" src="${imgUrl}" alt="${name} project preview" loading="lazy">
        </div>
        <div class="project-body">
          <div class="project-header">
            <span class="project-category">${categoryLabel}</span>
            <h3>${name}</h3>
          </div>
          <p class="project-summary">${desc}</p>
          ${detailsHtml}
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
      btn.removeEventListener('click', btn._clickHandler);
      btn._clickHandler = () => {
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
      };
      btn.addEventListener('click', btn._clickHandler);

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
    if (!text) return '';
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

})();
