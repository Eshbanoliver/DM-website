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
   3D Tilt Effect
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.nfc-card, .portfolio-card, .ad-card, .service-row, .feature-card');
  if (window.innerWidth <= 900) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 14; 
      const angleY = (x - xc) / 14;
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.08s ease-out';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s var(--ease-out)';
    });
  });
}

/* --------------------------------------------------------------------------
   Magnetic Buttons
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const elements = document.querySelectorAll('.btn, .nav-link, .logo');
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
