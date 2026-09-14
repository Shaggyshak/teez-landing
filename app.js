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

  // ---- shared Supabase project (also backs comments below) ----
  // NB: the anon/publishable key is meant to be public — access is governed
  // by RLS policies on each table, not by keeping this secret.
  var SB = 'https://gclrtcheaojuoyvvhuuq.supabase.co';
  var KEY = 'sb_publishable_4mlutbnqFlM8CFxnvetiVw_zrjVQiH1';

  // ---- book-a-call form -> Supabase ----
  var f = document.getElementById('book-form');
  if (f) {
    var src = f.dataset.source || 'landing';
    var st = document.getElementById('book-status'), sub = document.getElementById('book-submit');
    var label = sub.innerHTML;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = document.getElementById('book-email');
      if (!em.value.trim() || !em.checkValidity()) { st.textContent = '#ERROR — enter a valid email.'; st.className = 'status error'; return; }
      sub.disabled = true; sub.innerHTML = 'Submitting…'; st.textContent = ''; st.className = 'status';
      fetch(SB + '/rest/v1/leads', {
        method: 'POST',
        headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({
          kind: 'book_call',
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

  // ---- outreach click attribution (?r=<id> on a tracked link) ----
  // Tracked links point straight at teez.live rather than through a redirect
  // host, so recipients never get Gmail's "are you sure" interstitial.
  var rid = (location.search.match(/[?&]r=([A-Za-z0-9_-]{8,64})/) || [])[1];
  if (rid) {
    // Image beacon: no CORS, no fetch, fires immediately on load.
    new Image().src = 'https://gclrtcheaojuoyvvhuuq.supabase.co/functions/v1/r/' +
      encodeURIComponent(rid) + '?t=' + Date.now();
    // Strip the parameter so the visible URL stays clean and isn't shared on.
    if (window.history && history.replaceState) {
      var q = location.search.replace(/([?&])r=[^&]*/, '$1').replace(/[?&]+$/, '').replace(/\?&/, '?');
      history.replaceState({}, '', location.pathname + (q === '?' ? '' : q) + location.hash);
    }
  }

  // ---- share: copy-link button ----
  [].slice.call(document.querySelectorAll('.copy-link')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var url = btn.dataset.url || location.href;
      var label = btn.textContent;
      var flash = function (text) { btn.textContent = text; setTimeout(function () { btn.textContent = label; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { flash('Copied!'); }).catch(function () { window.prompt('Copy this link:', url); });
      } else {
        window.prompt('Copy this link:', url);
      }
    });
  });

  // ---- research post comments -> Supabase (blog_comments table) ----
  // New comments start unapproved (see the "approved = false" insert policy)
  // and only show up here once approved:true is set from Supabase's table
  // editor — so nothing posted by a visitor appears on the page unreviewed.
  var comments = document.getElementById('comments');
  if (comments) {
    var slug = comments.dataset.slug;
    var list = document.getElementById('comment-list');
    var empty = document.getElementById('comment-empty');

    var esc = function (s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };

    fetch(SB + '/rest/v1/blog_comments?select=name,body,created_at&post_slug=eq.' + encodeURIComponent(slug) + '&approved=eq.true&order=created_at.asc', {
      headers: { apikey: KEY, Authorization: 'Bearer ' + KEY }
    }).then(function (r) { return r.ok ? r.json() : []; })
      .then(function (rows) {
        if (!rows || !rows.length) return;
        if (empty) empty.remove();
        list.innerHTML = rows.map(function (c) {
          var when = new Date(c.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          return '<div class="comment"><div class="comment-head"><span class="comment-name">' + esc(c.name) +
            '</span><span class="comment-date">' + when + '</span></div><p class="comment-body">' + esc(c.body) + '</p></div>';
        }).join('');
      })
      .catch(function () { /* leave the "no comments yet" state in place */ });

    var cf = document.getElementById('comment-form');
    if (cf) {
      var cst = document.getElementById('comment-status'), csub = document.getElementById('comment-submit');
      var clabel = csub.innerHTML;
      cf.addEventListener('submit', function (e) {
        e.preventDefault();
        var hp = document.getElementById('comment-website');
        if (hp && hp.value) return; // honeypot tripped — silently drop, no error shown
        var name = document.getElementById('comment-name').value.trim();
        var body = document.getElementById('comment-body').value.trim();
        if (!name || !body) { cst.textContent = '#ERROR — name and comment are required.'; cst.className = 'comment-status error'; return; }
        csub.disabled = true; csub.innerHTML = 'Posting…'; cst.textContent = ''; cst.className = 'comment-status';
        fetch(SB + '/rest/v1/blog_comments', {
          method: 'POST',
          headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ post_slug: slug, name: name, body: body })
        }).then(function (r) {
          if (r.ok) { cst.textContent = "✓ Thanks — your comment is awaiting approval and will appear here shortly."; cst.className = 'comment-status'; cf.reset(); }
          else { cst.textContent = 'Something went wrong. Try again in a moment.'; cst.className = 'comment-status error'; }
        }).catch(function () { cst.textContent = 'Network issue. Try again in a moment.'; cst.className = 'comment-status error'; })
          .then(function () { csub.disabled = false; csub.innerHTML = clabel; });
      });
    }
  }
})();
