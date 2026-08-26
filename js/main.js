/* ==========================================================================
   RYDON DIGITAL — MAIN APP JS MODULE
   Handles Initialization, Preloader, Custom Cursor, Sticky Header
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initStickyHeader();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   Preloader Logic
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('preloader-bar');
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 300);
    }
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, 100);
}

/* --------------------------------------------------------------------------
   Custom Cursor Logic (Desktop only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');
  const badge = document.getElementById('cursor-badge');

  if (!cursor || !follower || window.innerWidth <= 992) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  // Hover targets
  const hoverElements = document.querySelectorAll('a, button, .service-row, .portfolio-card, .nfc-card, .ad-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');

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
    });
  });
}

/* --------------------------------------------------------------------------
   Sticky Header & Scroll State
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active state
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

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
