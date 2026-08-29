/* ==========================================================================
   MULTI-PAGE APP JS MODULE — MAIN
   Handles Initialization, Preloader, Custom Cursor, Sticky Header & Active Nav
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initStickyHeader();
  initActiveNavLink();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   Preloader Logic
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar') || document.getElementById('pl-bar');
  const percentText = document.getElementById('pl-percent');
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('out');
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
          preloader.style.pointerEvents = 'none';
        }, 500);
      }, 200);
    }
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
    if (percentText) {
      percentText.textContent = `${progress}%`;
    }
  }, 40);
}

/* --------------------------------------------------------------------------
   Custom Cursor Logic (Desktop only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor') || document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower') || document.getElementById('cursor-ring');
  const badge = document.getElementById('cursor-badge') || document.getElementById('cursor-label');

  if (!cursor || !follower || window.innerWidth <= 900) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let activeHoverEl = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    if (activeHoverEl) {
      const rect = activeHoverEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      followerX += (cx - followerX) * 0.22;
      followerY += (cy - followerY) * 0.22;
      
      follower.style.width = `${rect.width + 12}px`;
      follower.style.height = `${rect.height + 12}px`;
      follower.style.borderRadius = window.getComputedStyle(activeHoverEl).borderRadius;
      follower.style.borderColor = 'var(--red, #E60000)';
    } else {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderRadius = '50%';
      follower.style.borderColor = 'rgba(10, 10, 10, 0.3)';
    }

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover targets
  const hoverElements = document.querySelectorAll('a, button, .service-row, .svc-card, .why-card, .portfolio-card, .work-card, .nfc-card, .ad-card, .feature-card, .dropdown-item, .dd-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
      follower.classList.add('hovered');
      activeHoverEl = el;

      const customBadgeText = el.getAttribute('data-cursor');
      if (badge && customBadgeText) {
        badge.textContent = customBadgeText;
      } else if (badge) {
        badge.textContent = 'EXPLORE';
      }
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
      follower.classList.remove('hovered');
      activeHoverEl = null;
    });
  });
}

/* --------------------------------------------------------------------------
   Sticky Header & Active Link Detection
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('main-header') || document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle') || document.getElementById('mobile-burger');
  const overlay = document.getElementById('mobile-nav-overlay') || document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-overlay .nav-link');

  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}
