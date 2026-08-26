/* ==========================================================================
   RYDON DIGITAL — ANIMATIONS JS MODULE
   Handles Scroll Reveals (IntersectionObserver) & Numerical Counters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initStatsCounters();
});

/* --------------------------------------------------------------------------
   Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
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
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));

        const timer = setInterval(() => {
          count += 1;
          entry.target.innerHTML = `${count}<span>+</span>`;
          if (count >= target) {
            entry.target.innerHTML = `${target}<span>+</span>`;
            clearInterval(timer);
          }
        }, Math.max(stepTime, 30));

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}
