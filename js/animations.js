/* ==========================================================================
   RYDON DIGITAL — ANIMATIONS JS MODULE
   Handles Scroll Reveals (IntersectionObserver) & Numerical Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStaggeredReveals();
  initScrollReveals();
  initStatsCounters();
});

/* --------------------------------------------------------------------------
   Staggered Reveal Setup
   -------------------------------------------------------------------------- */
function initStaggeredReveals() {
  const containers = document.querySelectorAll('.service-list-container, .portfolio-grid, .nfc-grid, .ad-grid, .process-grid, .work-grid, .intro-stats-grid, .feature-grid-3');
  containers.forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, idx) => {
      child.classList.add('reveal-item');
      child.style.transitionDelay = `${idx * 0.1}s`;
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const selector = '.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-flip, .reveal-rotate, .u-reveal, .u-reveal-left, .u-reveal-right, .u-reveal-zoom, .u-reveal-flip, .u-reveal-rotate';
  const revealElements = document.querySelectorAll(selector);

  // Immediately activate hero elements
  document.querySelectorAll('.inner-hero .reveal, .hero-eyebrow, .hero-headline, .hero-sub-row').forEach(el => {
    el.classList.add('active');
    el.classList.add('visible');
  });

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => {
      el.classList.add('active');
      el.classList.add('visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '50px 0px -20px 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('active');
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });

  // Fallback trigger after 400ms to reveal any remaining top-fold elements
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
        el.classList.add('visible');
      }
    });
  }, 400);
}

/* --------------------------------------------------------------------------
   Numerical Counter Animation for Stats
   -------------------------------------------------------------------------- */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
          count += Math.ceil(target / 40);
          if (count >= target) {
            count = target;
            entry.target.innerHTML = `${target}<span>+</span>`;
            clearInterval(timer);
          } else {
            entry.target.innerHTML = `${count}<span>+</span>`;
          }
        }, Math.max(stepTime, 25));

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach(num => observer.observe(num));
}
