/* Nikhara Inderlal — Portfolio interactions
 * Mobile menu toggle + project filtering. No dependencies.
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function initMobileMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var links = document.querySelector('[data-nav-links]');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function initProjectFilters() {
    var buttons = document.querySelectorAll('.filter-button');
    var cards = document.querySelectorAll('[data-project-card]');
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
      var needle = filter.toLowerCase();
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var visible = filter === 'all' || tags.indexOf(needle) !== -1;
        card.style.display = visible ? '' : 'none';
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });
  }

  ready(function () {
    initMobileMenu();
    initProjectFilters();
  });
})();
