(function () {
  'use strict';

  if (window.__landingInitialized) return;
  window.__landingInitialized = true;

  var page = document.querySelector('.landing-page');
  if (!page) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  /* Tanpa animasi: biarkan semua konten tampil apa adanya */
  if (reduceMotion || !canObserve) return;

  function animateCount(el) {
    var target = parseInt(el.dataset.landingCount, 10);
    if (isNaN(target) || target <= 0) return;

    var suffix = el.dataset.landingSuffix || '';
    var duration = 1100;
    var start = null;

    el.textContent = '0' + suffix;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  /* Reveal saat discroll ke dalam layar */
  var revealItems = page.querySelectorAll('[data-landing-reveal]');
  if (revealItems.length) {
    page.classList.add('landing-js');

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    Array.prototype.forEach.call(revealItems, function (el, i) {
      if (el.dataset.bound === 'true') return;
      el.dataset.bound = 'true';
      el.style.transitionDelay = ((i % 4) * 80) + 'ms';
      revealObserver.observe(el);
    });
  }

  /* Hitung naik pada angka statistik hero */
  var counters = page.querySelectorAll('[data-landing-count]');
  if (counters.length) {
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    Array.prototype.forEach.call(counters, function (el) {
      if (el.dataset.bound === 'true') return;
      el.dataset.bound = 'true';
      countObserver.observe(el);
    });
  }
})();
