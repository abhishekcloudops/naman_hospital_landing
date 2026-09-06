/* =========================================================
   main.js — Shared JavaScript for all pages
   Naman Hospital Professional Website
   ========================================================= */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---- Active nav link highlight ---- */
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const page = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Mobile menu toggle ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Intersection Observer — Reveal animations ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---- Counter animation ---- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function step(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const current = Math.round(eased * target * 10) / 10;
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current) + suffix;
      if (elapsed < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ---- Toast notifications ---- */
  window.showToast = function (message, type = 'success') {
    let stack = document.getElementById('toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toast-stack';
      document.body.appendChild(stack);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '18'); icon.setAttribute('height', '18');
    icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', '#4ADE80'); icon.setAttribute('stroke-width', '2.5');
    icon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    toast.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = message;
    toast.appendChild(span);
    stack.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(110%)';
      setTimeout(() => toast.remove(), 320);
    }, 3500);
  };

  /* ---- Appointment form shared handler ---- */
  const apptForm = document.getElementById('apptForm');
  if (apptForm) {
    apptForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = document.getElementById('fName')?.value.trim()    || '';
      const phone   = document.getElementById('fPhone')?.value.trim()   || '';
      const age     = document.getElementById('fAge')?.value            || '';
      const gender  = document.getElementById('fGender')?.value         || 'Not specified';
      const dept    = document.getElementById('fDept')?.value           || 'General OPD';
      const address = document.getElementById('fAddress')?.value.trim() || 'Patna';
      const note    = document.getElementById('fNote')?.value.trim()    || 'OPD Consultation';

      if (!name || !phone) {
        showToast('Please fill in Name and Phone.', 'error');
        return;
      }

      const msg = encodeURIComponent(
        `*NAMAN HOSPITAL — APPOINTMENT REQUEST*\n` +
        `─────────────────────────\n` +
        `Patient : ${name}\n` +
        `Phone   : ${phone}\n` +
        `Age/Sex : ${age} / ${gender}\n` +
        `City    : ${address}\n` +
        `Dept    : ${dept}\n` +
        `Concern : ${note}\n` +
        `─────────────────────────\n` +
        `Kindly confirm appointment. Thank you.`
      );

      window.open(`https://wa.me/919304671782?text=${msg}`, '_blank');
      showToast('Appointment request sent via WhatsApp!');
      apptForm.reset();
    });
  }

  /* ---- Doctor search & filter (doctors.html) ---- */
  const docSearch = document.getElementById('docSearch');
  const docGrid   = document.getElementById('docGrid');
  const docTabs   = document.querySelectorAll('.doc-tab');

  if (docSearch && docGrid) {
    let activeDept = 'all';

    function filterDoctors() {
      const q = docSearch.value.toLowerCase().trim();
      let shown = 0;
      docGrid.querySelectorAll('.doc-card').forEach(card => {
        const text = card.dataset.text || '';
        const dept = card.dataset.dept || '';
        const matchQ = !q || text.includes(q);
        const matchD = activeDept === 'all' || dept === activeDept;
        const visible = matchQ && matchD;
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      const empty = document.getElementById('docEmpty');
      if (empty) empty.style.display = shown === 0 ? 'flex' : 'none';
    }

    docSearch.addEventListener('input', filterDoctors);

    docTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        docTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeDept = tab.dataset.dept;
        filterDoctors();
      });
    });
  }

  /* ---- Facility filter (services.html) ---- */
  const facTabs = document.querySelectorAll('.fac-tab');
  const facGrid = document.getElementById('facGrid');

  if (facTabs.length && facGrid) {
    facTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        facTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        facGrid.querySelectorAll('.fac-card').forEach(card => {
          const visible = cat === 'all' || card.dataset.cat === cat;
          card.style.display = visible ? '' : 'none';
        });
      });
    });
  }

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
