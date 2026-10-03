(function () {
  'use strict';

  if (window.__landingInitialized) return;
  window.__landingInitialized = true;

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.querySelector('.landing-page');
    if (!page || page.dataset.bound === 'true') return;
    page.dataset.bound = 'true';

    // Highlight active link in pagination or menu if needed
    var currentPath = window.location.pathname;
    var navLinks = page.querySelectorAll('.landing-page-link');
    
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === currentPath) {
        var parent = link.closest('.landing-page-item');
        if (parent) parent.classList.add('active');
      }
    });

    // Optional subtle scroll reveal or element initialization
    var featureCards = page.querySelectorAll('.landing-feature-card');
    if ('IntersectionObserver' in window && featureCards.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      featureCards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
      });
    }
  });
})();
