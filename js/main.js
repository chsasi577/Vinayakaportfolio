/**
 * WEST STREET YOUTH - VINAYAKA CHAVITHI CELEBRATIONS
 * Main Interactive Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initCountdownTimer();
  initEventFilters();
  initGalleryFilters();
  initGalleryLightbox();
  initDonationAmountChips();
  initCopyUPI();
  initTempleBellAudio();
  initPetalToggle();
  initBackToTop();
  initContactForm();
});

/* --- 1. STICKY HEADER SCROLL EFFECT --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- 2. MOBILE NAVIGATION DRAWER --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-donate-btn');

  if (!toggleBtn || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu();
    }
  });

  // Highlight active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

/* --- 3. COUNTDOWN TIMER TO VINAYAKA CHAVITHI --- */
function initCountdownTimer() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set festival date (Vinayaka Chavithi celebrations target)
  // Default to upcoming celebration date or 7 days from today
  const now = new Date();
  const festivalDate = new Date(now.getFullYear(), 8, 15, 8, 30, 0); // Mid-September morning
  if (festivalDate.getTime() < now.getTime()) {
    festivalDate.setDate(now.getDate() + 7);
  }

  function update() {
    const currentTime = new Date().getTime();
    const distance = festivalDate.getTime() - currentTime;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      const label = document.querySelector('.countdown-title');
      if (label) label.innerHTML = '🎉 వేడుకలు ప్రారంభమయ్యాయి! (Celebrations Live!)';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --- 4. EVENT SCHEDULE FILTERING --- */
function initEventFilters() {
  const filterBtns = document.querySelectorAll('.events-filter-bar .filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (!filterBtns.length || !eventCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'grid';
          card.classList.add('fade-in-up');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in-up');
        }
      });
    });
  });
}

/* --- 5. GALLERY FILTERING --- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          item.classList.add('fade-in-up');
        } else {
          item.style.display = 'none';
          item.classList.remove('fade-in-up');
        }
      });
    });
  });
}

/* --- 6. GALLERY LIGHTBOX MODAL --- */
function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!modal || !modalImg || !modalCaption) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-item-title')?.textContent || 'West Street Youth Celebrations';
      const sub = item.querySelector('.gallery-item-sub')?.textContent || '';

      if (img) {
        modalImg.src = img.src;
        modalImg.alt = title;
        modalCaption.innerHTML = `<strong>${title}</strong><br><small class="telugu-font" style="color:#FFE082;">${sub}</small>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-content')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --- 7. DONATION AMOUNT CHIPS SELECTOR --- */
function initDonationAmountChips() {
  const chips = document.querySelectorAll('.amount-chip');
  const customInputNote = document.getElementById('selected-amount-display');

  if (!chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const amount = chip.getAttribute('data-amount');
      if (customInputNote) {
        if (amount === 'custom') {
          customInputNote.textContent = 'మీ ఇష్టానుసారంగా కానుక సమర్పించవచ్చు (Custom Amount of your choice)';
        } else {
          customInputNote.textContent = `ఎంపిక చేసిన కానుక: ₹${amount} (Selected: ₹${amount})`;
        }
      }
    });
  });
}

/* --- 8. COPY UPI ID FUNCTIONALITY --- */
function initCopyUPI() {
  const copyBtn = document.getElementById('copy-upi-btn');
  const upiIdEl = document.getElementById('upi-id-value');

  if (!copyBtn || !upiIdEl) return;

  copyBtn.addEventListener('click', () => {
    const upiText = upiIdEl.textContent.trim();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(upiText).then(() => {
        showCopyFeedback(copyBtn);
      }).catch(() => {
        fallbackCopyText(upiText, copyBtn);
      });
    } else {
      fallbackCopyText(upiText, copyBtn);
    }
  });

  function fallbackCopyText(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopyFeedback(btn);
    } catch (err) {
      showToast('దయచేసి UPI ID ని నేరుగా కాపీ చేయండి');
    }
    document.body.removeChild(textArea);
  }

  function showCopyFeedback(btn) {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '✓ కాపీ అయ్యింది!';
    btn.style.background = '#2E7D32';
    btn.style.color = '#FFF';

    showToast('UPI ID క్లిప్‌బోర్డ్‌కు కాపీ అయ్యింది! (Copied to Clipboard)');

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.style.background = '';
      btn.style.color = '';
    }, 2500);
  }
}

/* --- 9. SYNTHESIZED TEMPLE BELL SOUND (WEB AUDIO API) --- */
function initTempleBellAudio() {
  const bellBtn = document.getElementById('bell-chime-btn');
  if (!bellBtn) return;

  bellBtn.addEventListener('click', () => {
    playTempleBell();
    bellBtn.classList.add('active');
    setTimeout(() => bellBtn.classList.remove('active'), 1200);
    showToast('🔔 గణపతి ప్రార్థన - గంటానాదం! (Temple Bell Chime)');
  });

  function playTempleBell() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Temple bell harmonic frequencies
      const freqs = [587.33, 880, 1174.66, 1760, 2349.32];
      const now = ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Exponential decay of sound
        gain.gain.setValueAtTime(0.18 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3);
      });
    } catch (e) {
      console.warn('AudioContext not permitted before user gesture:', e);
    }
  }
}

/* --- 10. PETAL SHOWER TOGGLE --- */
function initPetalToggle() {
  const toggleBtn = document.getElementById('toggle-petals-btn');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (window.festivePetals) {
      const isRunning = window.festivePetals.toggle();
      toggleBtn.classList.toggle('active', isRunning);
      showToast(isRunning ? '🌸 పుష్ప వర్షం ప్రారంభమైంది (Petal shower ON)' : '🌸 పుష్ప వర్షం ఆపబడింది (Petal shower OFF)');
    }
  });
}

/* --- 11. BACK TO TOP --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 12. INTERACTIVE CONTACT FORM --- */
function initContactForm() {
  const form = document.getElementById('festival-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim() || 'భక్తుడు';
    const phone = document.getElementById('contact-phone')?.value.trim() || '';
    const message = document.getElementById('contact-msg')?.value.trim() || '';

    // Show Devotional Acknowledgment Toast
    showToast(`ధన్యవాదాలు ${name} గారు! మీ సందేశం నమోదైంది. (Thank you! Message received.)`);

    // Reset form fields
    form.reset();
  });
}

/* --- HELPER: TOAST NOTIFICATION --- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message toast-anim';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
