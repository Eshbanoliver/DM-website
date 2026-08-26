/* ==========================================================================
   RYDON DIGITAL — INTERACTIONS JS MODULE
   Handles Testimonial Slider, Form Validation, Mouse Ambient Glow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
  initContactForm();
  initAmbientGlowFollow();
  init3DTilt();
  initMagneticButtons();
  initSpotlightTracking();
  initClickRipple();
  initCursorFollowerLight();
});

/* --------------------------------------------------------------------------
   Testimonial Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial') || document.getElementById('testi-prev');
  const nextBtn = document.getElementById('next-testimonial') || document.getElementById('testi-next');
  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) slide.classList.add('active');
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });
}

/* --------------------------------------------------------------------------
   Contact Form Client-Side Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !phone || !message) {
      statusMsg.className = 'form-status-msg';
      statusMsg.style.display = 'block';
      statusMsg.style.background = 'rgba(255, 26, 26, 0.15)';
      statusMsg.style.border = '1px solid #FF1A1A';
      statusMsg.style.color = '#FF3333';
      statusMsg.textContent = 'Please fill out all required fields before submitting.';
      return;
    }

    // Success State Simulation
    statusMsg.className = 'form-status-msg success';
    statusMsg.textContent = 'Thank you! Your message has been sent successfully. Our team will contact you shortly.';
    form.reset();

    setTimeout(() => {
      statusMsg.style.display = 'none';
    }, 6000);
  });
}

/* --------------------------------------------------------------------------
   Mouse Ambient Glow Movement (CTA & Hero Backgrounds)
   -------------------------------------------------------------------------- */
function initAmbientGlowFollow() {
  const ctaSection = document.querySelector('.cta-section');
  if (!ctaSection) return;

  ctaSection.addEventListener('mousemove', (e) => {
    const rect = ctaSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctaSection.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 0, 0, 0.08) 0%, #FFFFFF 70%)`;
  });

  ctaSection.addEventListener('mouseleave', () => {
    ctaSection.style.background = `radial-gradient(circle at 50% 50%, rgba(230, 0, 0, 0.08) 0%, #FFFFFF 75%)`;
  });
}

/* --------------------------------------------------------------------------
   Spotlight Card Light Tracking
   -------------------------------------------------------------------------- */
function initSpotlightTracking() {
  const cards = document.querySelectorAll('.svc-card, .why-card, .nfc-showcase-card, .prod-card, .testi-box, .cta-card, .nfc-card, .ad-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   Cursor Ambient Light Follower
   -------------------------------------------------------------------------- */
function initCursorFollowerLight() {
  if (window.innerWidth <= 900) return;
  let glow = document.getElementById('cursor-ambient-glow');
  if (!glow) {
    glow = document.createElement('div');
    glow.id = 'cursor-ambient-glow';
    document.body.appendChild(glow);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(render);
  }
  render();
}

/* --------------------------------------------------------------------------
   Click Crimson Ripple Effect
   -------------------------------------------------------------------------- */
function initClickRipple() {
  const targets = document.querySelectorAll('.btn-red, .btn-ghost, .svc-card, .why-card, .nfc-showcase-card, .prod-card, .testi-btn, .strip-cta');
  targets.forEach(target => {
    target.style.position = target.style.position || 'relative';
    target.style.overflow = 'hidden';

    target.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;
      ripple.classList.add('click-ripple');

      const existing = this.querySelector('.click-ripple');
      if (existing) existing.remove();

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* --------------------------------------------------------------------------
   3D Parallax Tilt Physics
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.svc-card, .why-card, .nfc-showcase-card, .prod-card, .nfc-card, .ad-card, .testi-box, .cta-card');
  if (window.innerWidth <= 900) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 16;
      const angleY = (x - xc) / 16;
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`;
      card.style.transition = 'transform 0.08s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      card.style.transition = 'transform 0.5s var(--ease-out)';
    });
  });
}

/* --------------------------------------------------------------------------
   Magnetic Button Physics
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const elements = document.querySelectorAll('.btn-red, .btn-ghost, .svc-card-arrow, .strip-cta, .nav-link, .brand-logo, .testi-btn');
  if (window.innerWidth <= 900) return;

  elements.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      el.style.transition = 'transform 0.1s ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    });
  });
}
