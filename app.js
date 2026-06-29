/* Teez landing — shared behavior. Each block runs only if its elements exist. */
(function () {
  'use strict';

  // ---- mobile nav toggle (hamburger reveals the top menu) ----
  var nt = document.querySelector('.navtoggle'), an = document.querySelector('.app-nav');
  if (nt && an) {
    nt.addEventListener('click', function () {
      var open = an.classList.toggle('open');
      nt.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    [].slice.call(an.querySelectorAll('a')).forEach(function (a) {
      a.addEventListener('click', function () { an.classList.remove('open'); nt.setAttribute('aria-expanded', 'false'); });
    });
  }

  // ---- row-number gutter: fills to sheet height, 30px rows ----
  var gutter = document.getElementById('gutter');
  var sheet = document.querySelector('.sheet');
  if (gutter && sheet) {
    var actRows = (gutter.dataset.act || '').split(',').map(Number);
    var build = function () {
      var n = Math.ceil(sheet.offsetHeight / 30) + 2, html = '';
      for (var i = 1; i <= n; i++) html += '<div class="rn' + (actRows.indexOf(i) > -1 ? ' act' : '') + '">' + i + '</div>';
      gutter.innerHTML = html;
    };
    window.addEventListener('load', build);
    var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(build, 200); });
    build();
  }

  // ---- mini-sheet: fill empty cells in sequence ----
  var filled = false;
  function fillSheet() {
    if (filled) return; filled = true;
    var cells = [].slice.call(document.querySelectorAll('.mc.empty'));
    cells.forEach(function (c, i) {
      setTimeout(function () {
        c.classList.add('filling');
        setTimeout(function () {
          c.textContent = c.dataset.v; c.classList.remove('empty', 'filling'); c.classList.add('filled');
        }, 180);
      }, i * 260);
    });
  }
  var mini = document.getElementById('mini');
  if (mini && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) fillSheet(); }); }, { threshold: 0.4 }).observe(mini);
  }

  // ---- formula bar: type the formula, then fill the sheet ----
  var fx = document.getElementById('fx');
  if (fx) {
    var full = fx.dataset.formula || '';
    var caret = document.getElementById('caret');
    var hi = function (s) {
      var e = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      // strings first, THEN the function name — otherwise the quotes inside
      // the inserted class="fn" attribute get matched as a string and break the tag
      e = e.replace(/("[^"]*")/g, 'STR$1');
      e = e.replace(/^(=[A-Z_.]+)/, '<span class="fn">$1</span>');
      e = e.replace(/STR("[^"]*")/g, '<span class="str">$1</span>');
      return e;
    };
    var i = 0;
    var step = function () {
      fx.innerHTML = hi(full.slice(0, i));
      if (i >= full.length) { if (caret) caret.style.animationPlayState = 'running'; setTimeout(fillSheet, 450); return; }
      i++;
      setTimeout(step, i < 12 ? 52 : 38);
    };
    setTimeout(step, 500);
  }

  // ---- action feed: reveal lines when scrolled into view ----
  var feedWin = document.getElementById('feedwin');
  if (feedWin && 'IntersectionObserver' in window) {
    var ran = false;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !ran) {
          ran = true;
          [].slice.call(feedWin.querySelectorAll('.fl')).forEach(function (l, n) { setTimeout(function () { l.classList.add('show'); }, n * 520); });
        }
      });
    }, { threshold: 0.35 }).observe(feedWin);
  }

  // ---- book-a-call form -> Supabase ----
  var f = document.getElementById('book-form');
  if (f) {
    var SB = 'https://gclrtcheaojuoyvvhuuq.supabase.co';
    var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbHJ0Y2hlYW9qdW95dnZodXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjU0MDIsImV4cCI6MjA4OTM0MTQwMn0.Jgk_91tCcCLoLQhUYCG4lWFmpbbn__HoH2W5TC-RXAg';
    var src = f.dataset.source || 'landing';
    var st = document.getElementById('book-status'), sub = document.getElementById('book-submit');
    var label = sub.innerHTML;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = document.getElementById('book-email');
      if (!em.value.trim() || !em.checkValidity()) { st.textContent = '#ERROR — enter a valid email.'; st.className = 'status error'; return; }
      sub.disabled = true; sub.innerHTML = 'Submitting…'; st.textContent = ''; st.className = 'status';
      fetch(SB + '/rest/v1/landing_leads', {
        method: 'POST',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          email: em.value.trim(),
          name: (document.getElementById('book-name').value || '').trim() || null,
          message: (document.getElementById('book-message').value || '').trim() || null,
          source: src
        })
      }).then(function (r) {
        if (r.ok) { st.textContent = "✓ Got it — we'll be in touch within a day."; st.className = 'status'; f.reset(); }
        else { st.textContent = 'Something went wrong. Email hello@teez.live.'; st.className = 'status error'; }
      }).catch(function () { st.textContent = 'Network issue. Email hello@teez.live.'; st.className = 'status error'; })
        .then(function () { sub.disabled = false; sub.innerHTML = label; });
    });
  }
})();
