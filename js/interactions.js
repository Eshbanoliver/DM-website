/* ==========================================================================
   RYDON DIGITAL — INTERACTIONS JS MODULE
   Handles Testimonial Slider, Form Validation, Mouse Ambient Glow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
  initContactForm();
  initAmbientGlowFollow();
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
