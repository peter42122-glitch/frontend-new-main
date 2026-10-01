/**
 * Zain Tailor House - Main JavaScript
 * Custom Vanilla JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initThemeToggle();
  initHeaderAndMobileNav();
  initScrollAnimations();
  initSearch();
  initGalleryAndLightbox();
  initTestimonialSlider();
  initFaqAccordion();
  initAnimatedCounters();
  initAppointmentBooking();
  initContactForm();
  initScrollToTop();
  initServiceBookingSync();
});

/* ==========================================================================
   1. Dark / Light Mode Toggle
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('zain_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark');
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('zain_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  });
}

function updateThemeIcon(isDark) {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;
  themeToggleBtn.innerHTML = isDark 
    ? '<i class="fas fa-sun" title="Switch to Light Mode"></i>' 
    : '<i class="fas fa-moon" title="Switch to Dark Mode"></i>';
}

/* ==========================================================================
   2. Header Scroll & Mobile Navigation
   ========================================================================== */
function initHeaderAndMobileNav() {
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header Shadow on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Hamburger Menu Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   3. Search Functionality
   ========================================================================== */
function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchSubmit = document.getElementById('searchSubmit');

  if (!searchToggle || !searchModal) return;

  searchToggle.addEventListener('click', () => {
    searchModal.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
  });

  const closeSearch = () => searchModal.classList.remove('active');
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // Perform Search
  const performSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    closeSearch();

    // Map keywords to section IDs
    const searchMap = {
      'suit': 'services',
      'shalwar': 'services',
      'kameez': 'services',
      'sherwani': 'services',
      'waistcoat': 'services',
      'alteration': 'services',
      'dress': 'services',
      'price': 'pricing',
      'cost': 'pricing',
      'rate': 'pricing',
      'about': 'about',
      'history': 'about',
      'gallery': 'gallery',
      'design': 'gallery',
      'photo': 'gallery',
      'book': 'booking',
      'appointment': 'booking',
      'schedule': 'booking',
      'review': 'testimonials',
      'feedback': 'testimonials',
      'faq': 'faq',
      'question': 'faq',
      'contact': 'contact',
      'address': 'contact',
      'phone': 'contact',
      'location': 'contact'
    };

    let matchedSection = null;
    for (const key in searchMap) {
      if (query.includes(key)) {
        matchedSection = searchMap[key];
        break;
      }
    }

    if (matchedSection) {
      const element = document.getElementById(matchedSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      showToast(`No specific results for "${query}". Please check our services or contact us directly.`);
    }
    searchInput.value = '';
  };

  if (searchSubmit) searchSubmit.addEventListener('click', performSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }
}

/* ==========================================================================
   4. Service Selection to Booking Sync
   ========================================================================== */
function initServiceBookingSync() {
  const selectServiceBtns = document.querySelectorAll('.select-service-btn');
  const dressTypeSelect = document.getElementById('dressType');
  const bookingSection = document.getElementById('booking');

  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');

      if (dressTypeSelect && serviceName) {
        // Select matching option
        for (let i = 0; i < dressTypeSelect.options.length; i++) {
          if (dressTypeSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
              dressTypeSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            dressTypeSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        const bookingCard = document.querySelector('.booking-card');
        if (bookingCard) {
          bookingCard.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.5)';
          setTimeout(() => {
            bookingCard.style.boxShadow = '';
          }, 2000);
        }
      }
    });
  });
}

/* ==========================================================================
   5. Gallery Filtering & Lightbox Modal
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const visibleItems = [];

  // Filter Gallery Items
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // Lightbox Functionality
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentGalleryIndex = index;
      openLightbox(item);
    });
  });

  function openLightbox(item) {
    if (!lightbox || !lightboxImg) return;
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || '';
    const category = item.querySelector('.gallery-category')?.textContent || '';

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) {
      lightboxCaption.innerHTML = `<strong>${title}</strong> - <span>${category}</span>`;
    }
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove('active');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Prev / Next Lightbox Controls
  if (lightboxPrev && lightboxNext) {
    lightboxPrev.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(galleryItems[currentGalleryIndex]);
    });

    lightboxNext.addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      openLightbox(galleryItems[currentGalleryIndex]);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });
}

/* ==========================================================================
   6. Testimonials Auto Slider
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  if (!track) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideInterval;

  // Create Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoSlide();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Auto Play
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Pause on Hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  track.parentElement.addEventListener('mouseleave', startAutoSlide);

  startAutoSlide();
}

/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-body').style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   8. Animated Counter Statistics
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  let animated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50; // increment step

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + suffix;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + suffix;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateCounters();
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   9. Appointment Booking Form & Backend API
   ========================================================================== */
const ZAIN_API_BASE_URL = (window.ZAIN_API_BASE_URL || 'https://backend-production-8aa5.up.railway.app').replace(/\/$/, '');

async function postToApi(path, payload) {
  const response = await fetch(`${ZAIN_API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let data = {};
  try { data = await response.json(); } catch (_) {}
  if (!response.ok) {
    throw new Error(data.message || 'Request failed. Please try again.');
  }
  return data;
}

function initAppointmentBooking() {
  const bookingForm = document.getElementById('bookingForm');
  const dateInput = document.getElementById('appointmentDate');
  const alertBox = document.getElementById('bookingAlert');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (!bookingForm) return;

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = dateInput.value;
    const time = document.getElementById('appointmentTime').value;
    const dressType = document.getElementById('dressType').value;
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !phone || !email || !date || !time || !dressType) {
      showFormAlert(alertBox, 'Please fill in all required fields.', 'error');
      return;
    }

    // Phone validation
    if (phone.length < 8) {
      showFormAlert(alertBox, 'Please enter a valid phone number.', 'error');
      return;
    }

    try {
      await postToApi('/api/appointments', {
        name, phone, email, date, time, dressType, message
      });

      showFormAlert(alertBox, 'Your appointment request has been submitted successfully! We will contact you shortly.', 'success');
      bookingForm.reset();
    } catch (error) {
      showFormAlert(alertBox, error.message || 'Could not submit appointment. Please try again.', 'error');
    }
  });
}

function showFormAlert(alertBox, text, type) {
  if (!alertBox) return;
  alertBox.textContent = text;
  alertBox.className = `booking-alert ${type}`;
  alertBox.style.display = 'block';

  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 6000);
}

/* ==========================================================================
   10. Contact Form Validation
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please complete all fields in the contact form.');
      return;
    }

    try {
      await postToApi('/api/messages', { name, email, subject, message });
      showToast('Thank you! Your message has been sent successfully.');
      contactForm.reset();
    } catch (error) {
      showToast(error.message || 'Could not send your message. Please try again.');
    }
  });
}

/* ==========================================================================
   11. Scroll Animations & Scroll-To-Top
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #111111;
      color: #D4AF37;
      border: 1px solid #D4AF37;
      padding: 1rem 1.75rem;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 4000;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
  }, 4000);
}
