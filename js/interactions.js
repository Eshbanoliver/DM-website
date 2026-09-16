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
  initSmoothAnchors();
  initPortfolioFilters();
  initMockupLightbox();
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

  // Auto-select package from URL params (e.g. ?plan=growth)
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get('plan');
  const serviceSelect = document.getElementById('form-service');
  if (plan && serviceSelect) {
    if (plan.toLowerCase() === 'starter') {
      serviceSelect.value = 'Starter Retainer Plan (₹15K/mo)';
    } else if (plan.toLowerCase() === 'growth') {
      serviceSelect.value = 'Growth Retainer Plan (₹30K/mo)';
    } else if (plan.toLowerCase() === 'scale') {
      serviceSelect.value = 'Scale Retainer Plan (₹70K/mo)';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const serviceSelect = document.getElementById('form-service');
    const budgetSelect = document.getElementById('form-budget');
    const service = serviceSelect && serviceSelect.value ? serviceSelect.value : 'General Inquiry';
    const budget = budgetSelect && budgetSelect.value ? budgetSelect.value : 'Not Specified';
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

    // Build structured, clean WhatsApp message
    const waText = 
`*New Project Inquiry - Rydon Digital*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone / WhatsApp:* ${phone}
💼 *Capability / Package:* ${service}
💰 *Estimated Budget:* ${budget}

📝 *Project Details & Objectives:*
${message}

---
Sent via rydondigital.com contact form`;

    const whatsappNumber = '918306241815';
    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(waText)}`;

    // Display confirmation state with fallback link
    statusMsg.className = 'form-status-msg success';
    statusMsg.style.display = 'block';
    statusMsg.style.background = 'rgba(0, 200, 83, 0.15)';
    statusMsg.style.border = '1px solid #00C853';
    statusMsg.style.color = '#00E676';
    statusMsg.innerHTML = `✓ <strong>Opening WhatsApp...</strong> If your WhatsApp did not open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #00E676; text-decoration: underline; font-weight: 700;">click here to send on WhatsApp</a>.`;

    // Open WhatsApp in new tab/app, fallback to current window if popup blocked
    const newTab = window.open(waUrl, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      window.location.href = waUrl;
    }

    form.reset();

    setTimeout(() => {
      statusMsg.style.display = 'none';
    }, 12000);
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
  const cards = document.querySelectorAll('.svc-card, .why-card, .nfc-showcase-card, .prod-card, .nfc-card, .ad-card, .testi-box');
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

/* --------------------------------------------------------------------------
   Ultra-Smooth Momentum Inertia Wheel Scroll Engine
   -------------------------------------------------------------------------- */
function initSmoothScrollEngine() {
  if (window.innerWidth <= 900) return;

  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let isScrolling = false;

  window.addEventListener('wheel', e => {
    if (document.body.classList.contains('menu-open') || document.body.style.overflow === 'hidden') return;
    
    e.preventDefault();
    targetY += e.deltaY * 0.85;
    targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));

    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateScroll);
    }
  }, { passive: false });

  function updateScroll() {
    const diff = targetY - currentY;
    if (Math.abs(diff) > 0.5) {
      currentY += diff * 0.1;
      window.scrollTo(0, currentY);
      requestAnimationFrame(updateScroll);
    } else {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isScrolling = false;
    }
  }

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      currentY = window.scrollY;
      targetY = window.scrollY;
    }
  });
}

/* --------------------------------------------------------------------------
   Smooth Anchor Navigation Handler
   -------------------------------------------------------------------------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive Portfolio & Mockup Category Filtering
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBars = document.querySelectorAll('.portfolio-filter-nav, .portfolio-filters, .mockup-filter-bar');
  
  filterBars.forEach(bar => {
    const buttons = bar.querySelectorAll('.portfolio-filter, .mockup-filter-chip');
    const targetSelector = bar.getAttribute('data-target');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle active button state within this bar
        buttons.forEach(b => {
          b.classList.remove('active');
          if (b.classList.contains('btn-secondary')) {
            b.classList.remove('btn-secondary');
            b.classList.add('btn-outline');
          }
        });
        btn.classList.add('active');
        if (btn.classList.contains('btn-outline')) {
          btn.classList.remove('btn-outline');
          btn.classList.add('btn-secondary');
        }

        const filterValue = btn.getAttribute('data-filter') || 'all';

        // Determine which cards to filter
        let cards;
        if (targetSelector) {
          const targetContainer = document.querySelector(targetSelector);
          cards = targetContainer ? targetContainer.querySelectorAll('.work-card, .portfolio-card, .mockup-card') : [];
        } else {
          // Check if inside a section with a grid, else all cards
          const parentSection = bar.closest('section') || document;
          cards = parentSection.querySelectorAll('.work-card, .portfolio-card, .mockup-card');
          if (!cards.length) {
            cards = document.querySelectorAll('.work-card, .portfolio-card, .mockup-card');
          }
        }

        cards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          const categories = category.toLowerCase().split(/\s+/);
          const matches = filterValue === 'all' || categories.includes(filterValue.toLowerCase());

          if (matches) {
            card.classList.remove('is-hidden');
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.92)';
            setTimeout(() => {
              card.classList.add('is-hidden');
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  });
}

/* --------------------------------------------------------------------------
   High-Resolution Mockup Lightbox Modal Viewer
   -------------------------------------------------------------------------- */
function initMockupLightbox() {
  // Inject modal into DOM if not present
  let backdrop = document.getElementById('mockup-modal');
  if (!backdrop) {
    const modalHTML = `
      <div id="mockup-modal" class="mockup-modal-backdrop" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="mockup-modal-window">
          <div class="mockup-modal-header">
            <div class="mockup-modal-meta">
              <span class="mockup-modal-badge" id="modal-category">Design Work</span>
              <span class="mockup-modal-counter" id="modal-counter">1 / 1</span>
            </div>
            <button class="mockup-modal-close-btn" id="modal-close-btn" aria-label="Close Preview" title="Close (Esc)">&times;</button>
          </div>
          <div class="mockup-modal-body">
            <button class="mockup-modal-nav-btn prev" id="modal-prev-btn" aria-label="Previous Design" title="Previous (Left Arrow)">&#10094;</button>
            <img src="" alt="Mockup Design Preview" id="modal-img" class="mockup-modal-img" />
            <button class="mockup-modal-nav-btn next" id="modal-next-btn" aria-label="Next Design" title="Next (Right Arrow)">&#10095;</button>
          </div>
          <div class="mockup-modal-footer">
            <div class="mockup-modal-details">
              <h3 class="mockup-modal-title" id="modal-title">Design Sheet Title</h3>
              <p class="mockup-modal-desc" id="modal-desc">Design Sheet Description</p>
            </div>
            <a href="contact.html" class="mockup-modal-cta">Request Similar Design <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    backdrop = document.getElementById('mockup-modal');
  }

  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCategory = document.getElementById('modal-category');
  const modalCounter = document.getElementById('modal-counter');
  const closeBtn = document.getElementById('modal-close-btn');
  const prevBtn = document.getElementById('modal-prev-btn');
  const nextBtn = document.getElementById('modal-next-btn');

  let activeGalleryCards = [];
  let currentIndex = -1;

  function openLightbox(cards, index) {
    if (!cards || !cards.length || index < 0 || index >= cards.length) return;
    activeGalleryCards = cards;
    currentIndex = index;
    renderCurrentSlide();
    backdrop.classList.add('is-active');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    backdrop.classList.remove('is-active');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCurrentSlide() {
    if (currentIndex < 0 || currentIndex >= activeGalleryCards.length) return;
    const card = activeGalleryCards[currentIndex];
    
    // Extract metadata from card attributes or children
    const imgSrc = card.getAttribute('data-img') || 
                   (card.querySelector('img') ? card.querySelector('img').getAttribute('src') : '');
    const title = card.getAttribute('data-title') || 
                  (card.querySelector('.portfolio-title, .work-title') ? card.querySelector('.portfolio-title, .work-title').textContent.trim() : 'Design Showcase');
    const desc = card.getAttribute('data-desc') || 
                 (card.querySelector('.portfolio-desc, .work-desc, .portfolio-sub') ? card.querySelector('.portfolio-desc, .work-desc, .portfolio-sub').textContent.trim() : '');
    const category = card.getAttribute('data-folder') || 
                     card.getAttribute('data-category') || 
                     (card.querySelector('.mockup-folder-badge, .portfolio-category, .work-cat') ? card.querySelector('.mockup-folder-badge, .portfolio-category, .work-cat').textContent.trim() : 'Showcase');

    // Update UI
    modalImg.style.opacity = '0.3';
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalImg.onload = () => {
      modalImg.style.opacity = '1';
    };

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalCategory.textContent = category.toUpperCase();
    modalCounter.textContent = `${currentIndex + 1} / ${activeGalleryCards.length}`;

    // Hide or dim arrows if only 1 item
    if (activeGalleryCards.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  function prevSlide() {
    if (activeGalleryCards.length <= 1) return;
    currentIndex = (currentIndex - 1 + activeGalleryCards.length) % activeGalleryCards.length;
    renderCurrentSlide();
  }

  function nextSlide() {
    if (activeGalleryCards.length <= 1) return;
    currentIndex = (currentIndex + 1) % activeGalleryCards.length;
    renderCurrentSlide();
  }

  // Bind click handlers to cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.mockup-card, .portfolio-card, [data-lightbox="true"]');
    if (!card) return;

    // Check if user clicked on a direct link inside the card (like button or URL link)
    if (e.target.closest('a') && !e.target.closest('.portfolio-img-wrap, .mockup-card-img-wrap, .portfolio-link-icon')) {
      return;
    }

    e.preventDefault();

    // Collect currently visible cards in the same grid
    const parentGrid = card.closest('.portfolio-grid, .work-grid, #mockup-grid') || card.parentElement;
    const visibleCards = Array.from(parentGrid.querySelectorAll('.mockup-card:not(.is-hidden), .portfolio-card:not(.is-hidden), [data-lightbox="true"]:not(.is-hidden)'));
    const index = visibleCards.indexOf(card);

    if (index !== -1) {
      openLightbox(visibleCards, index);
    } else {
      openLightbox([card], 0);
    }
  });

  // Modal controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });

  // Close on backdrop click (outside window)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('is-active')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
}


