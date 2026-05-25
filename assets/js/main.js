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

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (!links.classList.contains('is-open')) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initProjectFilters() {
    var buttons = document.querySelectorAll('.filter-button');
    var cards = document.querySelectorAll('[data-project-card]');
    var count = document.getElementById('project-count');
    var empty = document.querySelector('[data-empty-state]');
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
      var needle = filter.toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var visible = filter === 'all' || tags.indexOf(needle) !== -1;
        card.style.display = visible ? '' : 'none';
        if (visible) shown += 1;
      });
      if (count) {
        var label = filter === 'all' ? 'projects' : filter + ' projects';
        count.textContent = shown + ' ' + label + ' shown';
      }
      if (empty) empty.hidden = shown !== 0;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        applyFilter(btn.getAttribute('data-filter') || 'all');
      });
    });

    applyFilter('all');
  }

  ready(function () {
    initMobileMenu();
    initProjectFilters();
  });
})();
