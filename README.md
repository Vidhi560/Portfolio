# Vidhi Prajapati — Data Science & AI/ML Portfolio

A modern, recruiter-focused portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

## Live Sections

- **Home** — Hero with typing animation and profile image
- **About** — Professional summary
- **Skills** — Animated skill cards
- **Projects** — GitHub repositories (filtered for DS/AI/ML)
- **Certifications** — Editable certificate cards
- **Resume** — PDF preview and download
- **Contact** — Validated contact form

## Folder Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── profile.jpg
    ├── resume.pdf
    └── certificates/
```

## Setup

1. Clone or download this repository
2. Replace `assets/profile.jpg` with your photo
3. Replace `assets/resume.pdf` with your resume
4. Add certificate PDFs to `assets/certificates/` and update links in `index.html`
5. Update certification names and organizations in `index.html`

## Local Preview

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```

Open `http://localhost:8080` in your browser.

## GitHub Pages Deployment

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Select **Deploy from branch** → `main` → `/ (root)`
4. Your site will be live at `https://yourusername.github.io/repo-name/`

## Customization

### Certifications
Edit the certification cards in `index.html` under the `#certifications` section.

### GitHub Projects
Projects are fetched automatically from `https://github.com/Vidhi560`.
Repositories named `Portfolio` or `portfolio` are excluded.
Only repos related to Data Science, ML, AI, Python, and SQL are shown.

### Theme
Dark mode is default. Users can toggle light/dark mode — preference is saved in `localStorage`.

## Technologies

- HTML5
- CSS3 (Glassmorphism, CSS Grid, Flexbox, Animations)
- JavaScript (ES6+)
- GitHub REST API
- Font Awesome Icons
- Google Fonts (Poppins & Inter)

## Contact

- **Email:** vidhi3684@gmail.com
- **LinkedIn:** [vidhi-prajapati](http://linkedin.com/in/vidhi-prajapati-b91a35183)
- **GitHub:** [Vidhi560](https://github.com/Vidhi560)

© 2026 Vidhi Prajapati. All Rights Reserved.
