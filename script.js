/* ======================================
   Lil.hair - Script
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  let overlay = null;

  // Create overlay
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', closeNav);

  // Nav open/close
  function openNav() {
    hamburger.classList.add('active');
    mobileNav.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeNav() : openNav();
  });

  // Close on nav link click
  document.getElementById('navClose').addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Header scroll shadow + hide on scroll down
  let lastScrollY = 0;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        header.classList.toggle('scrolled', currentScrollY > 10);
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          header.classList.add('header-hidden');
        } else {
          header.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Scroll fade-in
  const observerOpts = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOpts);

  // Auto-apply fade animations
  const targets = document.querySelectorAll(
    '.section-header, .concept-body, .feature-item, .menu-category, .menu-note, .btn-detail, .staff-card, .access-info, .access-map, .hero-image'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    if (i % 4 === 1) el.classList.add('fade-up-d1');
    if (i % 4 === 2) el.classList.add('fade-up-d2');
    if (i % 4 === 3) el.classList.add('fade-up-d3');
    fadeObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = header.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .hero-img');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4000);
  }

  // Hero Overlay - fade out after 3 seconds
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) {
    setTimeout(() => {
      heroOverlay.classList.add('fade-out');
    }, 3000);
  }

});