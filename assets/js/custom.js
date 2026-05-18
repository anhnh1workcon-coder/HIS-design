/* HIS Design Portal — Custom JavaScript */

(function () {
  'use strict';

  // Highlight current module in sidebar based on URL
  function highlightCurrentModule() {
    var path = window.location.hash || '';
    var moduleMap = {
      'modules/MOS': 'mos',
      'modules/EMR': 'emr',
      'modules/LIS': 'lis',
      'modules/ACS': 'acs',
      'modules/FSS': 'fss',
    };

    Object.keys(moduleMap).forEach(function (key) {
      if (path.indexOf(key) !== -1) {
        document.body.setAttribute('data-module', moduleMap[key]);
      }
    });
  }

  // Add anchor links to headings
  function addAnchorLinks() {
    var headings = document.querySelectorAll('.markdown-section h2, .markdown-section h3');
    headings.forEach(function (heading) {
      if (!heading.id) return;
      var anchor = document.createElement('a');
      anchor.className = 'anchor-link';
      anchor.href = '#' + heading.id;
      anchor.innerHTML = ' #';
      anchor.style.cssText = 'color: #aaa; text-decoration: none; font-size: 0.8em; opacity: 0; transition: opacity 0.2s;';
      heading.appendChild(anchor);
      heading.addEventListener('mouseenter', function () { anchor.style.opacity = '1'; });
      heading.addEventListener('mouseleave', function () { anchor.style.opacity = '0'; });
    });
  }

  // Render status badges inline: ![status](status:draft), ![status](status:approved)
  function renderStatusBadges() {
    var content = document.querySelector('.markdown-section');
    if (!content) return;

    var statusColors = {
      draft: '#9e9e9e',
      review: '#ff9800',
      approved: '#4caf50',
      deprecated: '#f44336',
      active: '#2196f3',
    };

    content.querySelectorAll('img[src^="status:"]').forEach(function (img) {
      var status = img.getAttribute('src').replace('status:', '').toLowerCase();
      var label = img.getAttribute('alt') || status;
      var color = statusColors[status] || '#9e9e9e';
      var badge = document.createElement('span');
      badge.style.cssText = [
        'display:inline-block',
        'background:' + color,
        'color:#fff',
        'padding:2px 8px',
        'border-radius:4px',
        'font-size:0.75rem',
        'font-weight:600',
        'vertical-align:middle',
        'letter-spacing:0.04em',
      ].join(';');
      badge.textContent = label.toUpperCase();
      img.parentNode.replaceChild(badge, img);
    });
  }

  // Track page views (console only, no external calls)
  function logPageView() {
    var page = window.location.hash.replace('#/', '') || 'home';
    console.debug('[HIS Design] page:', page);
  }

  // Hook into Docsify lifecycle
  window.$docsify = window.$docsify || {};
  var originalPlugins = window.$docsify.plugins || [];
  window.$docsify.plugins = originalPlugins.concat([
    function (hook) {
      hook.doneEach(function () {
        highlightCurrentModule();
        addAnchorLinks();
        renderStatusBadges();
        logPageView();
      });
    },
  ]);
})();
