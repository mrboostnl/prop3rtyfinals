/* Prop3rty: interactieve onderdelen (tabs, AI-chat, route, meldingenstroom, rekentool, inview-animaties) */
(function () {
  if (window.__p3) return; window.__p3 = true;
  var css = [
    '@keyframes p3-dust{0%{opacity:.0;transform:translate(0,0) scale(.6)}20%{opacity:.9}100%{opacity:0;transform:translate(-60px,-6px) scale(1.5)}}',
    '@keyframes p3-zoom{0%{transform:translateX(0)}35%{transform:translateX(-10px)}100%{transform:translateX(26px)}}',
    '@keyframes p3-pop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}',
    '@keyframes p3-confetti{0%{opacity:1;transform:translate(0,0) rotate(0)}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(var(--r))}}',
    '@keyframes p3-blink{0%,100%{opacity:.25}50%{opacity:1}}',
    '@keyframes p3-float{0%,100%{transform:translateY(0) rotate(var(--rot,0deg))}50%{transform:translateY(-8px) rotate(var(--rot,0deg))}}',
    '[data-p3-anim="bus"] [data-dust]{opacity:0}',
    '[data-p3-anim="bus"][data-p3-on] [data-dust]{animation:p3-dust 1.4s ease-out infinite}',
    '[data-p3-anim="bus"][data-p3-on] [data-dust]:nth-child(2){animation-delay:.25s}',
    '[data-p3-anim="bus"][data-p3-on] [data-dust]:nth-child(3){animation-delay:.5s}',
    '[data-p3-anim="bus"][data-p3-on] [data-busimg]{animation:p3-zoom 1.4s cubic-bezier(.5,0,.2,1) both}',
    '[data-p3-anim="brain"] [data-node]{transition:fill .4s ease, r .4s ease}',
    '[data-p3-anim="brain"] [data-edge]{transition:stroke .4s ease, opacity .4s ease;opacity:.35}',
    '[data-p3-anim="brain"][data-p3-on] [data-node]{fill:#CEFF8A}',
    '[data-p3-anim="brain"][data-p3-on] [data-edge]{opacity:1;stroke:#CEFF8A}',
    '[data-p3-anim="bars"] [data-bar]{transform:scaleY(.08);transform-origin:50% 100%;transform-box:fill-box;transition:transform .9s cubic-bezier(.2,.8,.2,1)}',
    '[data-p3-anim="bars"][data-p3-on] [data-bar]{transform:scaleY(1)}',
    '[data-p3-anim="smile"] [data-chart]{opacity:0;transform:translateX(-14px);transition:opacity .6s ease .5s, transform .6s ease .5s}',
    '[data-p3-anim="smile"] [data-chart-bar]{transform:scaleY(.1);transform-origin:50% 100%;transform-box:fill-box;transition:transform .8s cubic-bezier(.2,.8,.2,1) .9s}',
    '[data-p3-anim="smile"][data-p3-on] [data-chart]{opacity:1;transform:none}',
    '[data-p3-anim="smile"][data-p3-on] [data-chart-bar]{transform:scaleY(1)}',
    '[data-p3-step]{opacity:.38;transform:translateY(10px);transition:opacity .5s ease, transform .5s ease}',
    '[data-p3-step][data-lit]{opacity:1;transform:none}',
    '[data-p3-float]{animation:p3-float 5s ease-in-out infinite}',
    '.p3-only-m{display:none !important}',
    '@media (max-width: 860px){ .p3-ml{margin-left:56px !important} }',
    '@media (max-width: 860px){',
    ' .p3-only-d{display:none !important}',
    ' .p3-only-m{display:flex !important}',
    ' .p3-stack{grid-template-columns:1fr !important}',
    ' .p3-g2{grid-template-columns:1fr !important}',
    ' .p3-flow{grid-template-columns:1fr !important;gap:14px !important}',
    ' .p3-flow > [data-arrow]{display:none !important}',
    ' .p3-tilt{transform:none !important}',
    ' .p3-pad{padding:28px !important}',
    ' .p3-h{font-size:clamp(30px,8.4vw,40px) !important}',
    ' .p3-row-m{flex-direction:row !important;flex-wrap:wrap !important;position:static !important;transform:none !important}',
    ' .p3-row-m > *{position:static !important;transform:none !important}',
    ' .p3-swipe{display:grid !important;grid-auto-flow:column;grid-auto-columns:72% !important;grid-template-columns:none !important;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}',
    ' .p3-swipe > *{scroll-snap-align:start}',
    ' .p3-tabs-nav{display:none !important}',
    ' .p3-tabpanel{display:grid !important}',
    '}'
  ].join('\n');
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = new WeakSet();
  function onView(el, cb, thr) {
    if (seen.has(el)) return; seen.add(el);
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); cb(); } }); }, { threshold: thr || 0.35 });
    io.observe(el);
  }

  /* --- generieke inview-animaties --- */
  function initAnims() {
    document.querySelectorAll('[data-p3-anim]').forEach(function (el) {
      onView(el, function () { el.setAttribute('data-p3-on', '1'); });
    });
  }

  /* --- tabs (Platform: wat zit er in het portaal) --- */
  function initTabs() {
    document.querySelectorAll('[data-p3-tabs]').forEach(function (root) {
      if (root.__p3t) return; root.__p3t = true;
      var btns = root.querySelectorAll('[data-p3-tab]');
      var panels = root.querySelectorAll('[data-p3-panel]');
      function set(i) {
        btns.forEach(function (b) {
          var on = b.getAttribute('data-p3-tab') === String(i);
          b.style.background = on ? '#0E2D30' : '#ffffff';
          b.style.color = on ? '#ffffff' : '#0E2D30';
          b.style.borderColor = on ? '#0E2D30' : '#E2E8DE';
          b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          var on = p.getAttribute('data-p3-panel') === String(i);
          if (window.innerWidth > 860) p.style.display = on ? 'grid' : 'none';
          else p.style.display = '';
        });
      }
      btns.forEach(function (b) { b.addEventListener('click', function () { set(b.getAttribute('data-p3-tab')); }); });
      set(0);
      window.addEventListener('resize', function () { var a = root.querySelector('[data-p3-tab][aria-selected="true"]'); set(a ? a.getAttribute('data-p3-tab') : 0); });
    });
  }

  /* --- AI-assistent chat --- */
  var CHAT = {
    intro: [
      { q: 'Hoeveel leegstand heb ik op dit moment?', sec: '2 SEC', a: 'Je hebt nu <b>10 VHE leeg</b>, goed voor <b>€ 3.890</b> per maand aan huur en servicekosten. De langste leegstand is Stationsplein 4-B (5 maanden).', s: [['Leeg', '10 VHE'], ['Per maand', '€ 3.890'], ['Bezetting', '85%']] },
      { q: 'Welke keuringen moet ik in de gaten houden?', sec: '1 SEC', a: 'Eén keuring is verlopen: de <b>brandmeldinstallatie</b> van Noorderhaven 12. Ons team heeft die al ingepland. Binnenkort verlopen ook de lift van De Linde 3 en de noodverlichting van Stationsplein 4.' }
    ],
    q: [
      { q: 'Wat heb ik dit jaar aan huur ontvangen?', sec: '2 SEC', a: 'Dit jaar heb je <b>€ 1.398.640</b> aan huur ontvangen, 4,2% meer dan vorig jaar. Oktober was met € 139.960 je sterkste maand.', s: [['Ontvangen', '€ 1,40 mln'], ['Groei', '+4,2%'], ['Achterstand', '€ 13.395']] },
      { q: 'Welke panden hebben achterstallig onderhoud?', sec: '1 SEC', a: 'Twee panden: <b>De Linde 3</b> (dakgoot) en <b>Stationsplein 4</b> (schilderwerk kozijnen). Ons team heeft voor beide al een offerte opgevraagd.', s: [['Panden', '2'], ['Werkorders', '3'], ['Begroot', '€ 8.450']] },
      { q: 'Welke huurcontracten lopen dit jaar af?', sec: '1 SEC', a: 'Drie contracten lopen dit jaar af: Noorderhaven 12-B, De Linde 3-2 en Stationsplein 4-A. Wij nemen contact op met de huurders over verlenging.', s: [['Contracten', '3'], ['Huur p/m', '€ 4.210']] },
      { q: 'Wat kost het onderhoud de komende 5 jaar?', sec: '2 SEC', a: 'Volgens de meerjarenonderhoudsplanning verwacht je <b>€ 186.500</b> aan onderhoud over 5 jaar. De grootste post is de dakrenovatie van Noorderhaven in 2028.', s: [['5 jaar', '€ 186.500'], ['Per jaar', '€ 37.300']] }
    ]
  };
  function initChat() {
    document.querySelectorAll('[data-p3-chat]').forEach(function (root) {
      if (root.__p3c) return; root.__p3c = true;
      var log = root.querySelector('[data-chat-log]'); if (!log) return;
      var busy = false, queue = [], t0 = 14;
      function clock() { var m = t0++; return '09:' + (m < 10 ? '0' + m : m); }
      function scroll() { log.scrollTop = log.scrollHeight; }
      function bubbleUser() {
        var w = document.createElement('div'); w.style.cssText = 'display:flex;justify-content:flex-end;';
        var b = document.createElement('div'); b.style.cssText = 'max-width:78%;background:#0E2D30;color:#fff;border-radius:18px 18px 6px 18px;padding:14px 18px;font-size:15px;line-height:1.5;';
        var tx = document.createElement('span'); var tm = document.createElement('span'); tm.style.cssText = 'display:block;text-align:right;font-size:11px;color:#86999A;margin-top:6px;';
        b.appendChild(tx); b.appendChild(tm); w.appendChild(b); log.appendChild(w); return { tx: tx, tm: tm };
      }
      function bubbleAI(item) {
        var b = document.createElement('div'); b.style.cssText = 'align-self:flex-start;max-width:86%;background:#F3F6F1;border:1px solid #E2E8DE;border-radius:18px 18px 18px 6px;padding:14px 18px;font-size:15px;line-height:1.55;color:#0E2D30;opacity:0;transform:translateY(6px);transition:opacity .35s ease, transform .35s ease;';
        var h = '<span style="display:block;font-size:13px;font-weight:700;color:#63736F;margin-bottom:6px;">Assistent · ' + item.sec.toLowerCase() + '</span>' + item.a;
        if (item.s) { h += '<span style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;">' + item.s.map(function (s) { return '<span style="background:#fff;border:1px solid #E2E8DE;border-radius:12px;padding:8px 12px;"><span style="display:block;font-size:12px;color:#63736F;">' + s[0] + '</span><span style="display:block;font-size:17px;font-weight:900;color:#0E2D30;">' + s[1] + '</span></span>'; }).join('') + '</span>'; }
        b.innerHTML = h; log.appendChild(b);
        requestAnimationFrame(function () { b.style.opacity = '1'; b.style.transform = 'none'; });
      }
      function dots() { var d = document.createElement('div'); d.style.cssText = 'align-self:flex-start;display:flex;gap:5px;padding:14px 18px;background:#F3F6F1;border-radius:18px;'; for (var i = 0; i < 3; i++) { var s = document.createElement('span'); s.style.cssText = 'width:7px;height:7px;border-radius:9px;background:#0E2D30;animation:p3-blink 1s ease-in-out ' + (i * 0.15) + 's infinite;'; d.appendChild(s); } log.appendChild(d); return d; }
      function play(item, done) {
        busy = true; var u = bubbleUser(); var i = 0; var speed = reduce ? 0 : 28;
        (function type() { if (i <= item.q.length) { u.tx.textContent = item.q.slice(0, i++); scroll(); setTimeout(type, speed); } else { u.tm.textContent = clock(); var d = dots(); scroll(); setTimeout(function () { d.remove(); bubbleAI(item); scroll(); busy = false; setTimeout(function () { if (queue.length) play(queue.shift()); else if (done) done(); }, 500); }, reduce ? 0 : 700); } })();
      }
      function ask(item) { if (busy) { queue = [item]; return; } play(item); }
      root.querySelectorAll('[data-p3-q]').forEach(function (btn) {
        btn.addEventListener('click', function () { var it = CHAT.q[+btn.getAttribute('data-p3-q')]; if (it) ask(it); });
      });
      onView(root, function () { play(CHAT.intro[0], function () { play(CHAT.intro[1]); }); }, 0.4);
    });
  }

  /* --- meldingenstroom: stappen lichten op, bus rijdt van 3 naar 4 --- */
  function initFlow() {
    document.querySelectorAll('[data-p3-flow]').forEach(function (root) {
      onView(root, function () {
        var steps = root.querySelectorAll('[data-p3-step]');
        var bus = root.querySelector('[data-flow-bus]');
        steps.forEach(function (s, i) {
          setTimeout(function () {
            s.setAttribute('data-lit', '1');
            if (i === 2 && bus) { bus.style.opacity = '1'; }
            if (i === 3 && bus) { bus.style.left = bus.getAttribute('data-to'); }
          }, reduce ? 0 : 200 + i * 650);
        });
      }, 0.3);
    });
  }

  /* --- route met busje (Tarieven: plan van aanpak) --- */
  function initRoute() {
    document.querySelectorAll('[data-p3-route]').forEach(function (root) {
      if (root.__p3r) return; root.__p3r = true;
      var path = root.querySelector('[data-route-path]');
      var bus = root.querySelector('[data-route-bus]');
      var busM = root.querySelector('[data-route-bus-m]');
      var lineM = root.querySelector('[data-route-line-m]');
      var fin = root.querySelector('[data-route-confetti]');
      var svg = path && path.ownerSVGElement;
      var L = path ? path.getTotalLength() : 0, fired = false;
      function confetti() {
        if (fired || !fin) return; fired = true;
        var cols = ['#CEFF8A', '#0E2D30', '#ffffff', '#B6E86C'];
        for (var i = 0; i < 26; i++) {
          var c = document.createElement('span'); var a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 70;
          c.style.cssText = 'position:absolute;left:0;top:0;width:8px;height:12px;border-radius:2px;background:' + cols[i % 4] + ';--dx:' + Math.cos(a) * r + 'px;--dy:' + (Math.sin(a) * r - 30) + 'px;--r:' + (Math.random() * 540 - 270) + 'deg;animation:p3-confetti 1.3s cubic-bezier(.2,.7,.3,1) forwards;';
          fin.appendChild(c); setTimeout(function (el) { el.remove(); }.bind(null, c), 1400);
        }
      }
      function tick() {
        var vh = window.innerHeight; var tgt = (svg && svg.getBoundingClientRect().width > 0) ? svg.parentNode : (lineM || root); var r = tgt.getBoundingClientRect();
        var c = r.top + Math.min(r.height, vh) / 2; var p = (vh * 0.85 - c) / (vh * 0.5); p = Math.max(0, Math.min(1, p));
        if (path && bus && svg && svg.getBoundingClientRect().width > 0) {
          var pt = path.getPointAtLength(L * p), pt2 = path.getPointAtLength(Math.min(L, L * p + 2));
          var ang = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
          var vb = svg.viewBox.baseVal, sw = svg.getBoundingClientRect().width / vb.width;
          bus.style.transform = 'translate(' + (pt.x * sw) + 'px,' + (pt.y * sw) + 'px) translate(-50%,-78%) rotate(' + ang + 'deg) scaleX(-1)';
        }
        if (busM && lineM) { busM.style.top = (p * 100) + '%'; }
        root.querySelectorAll('[data-halte]').forEach(function (h) { var on = p >= +h.getAttribute('data-halte'); h.style.background = on ? '#CEFF8A' : '#ffffff'; });
        if (p > 0.97) confetti();
      }
      window.addEventListener('scroll', tick, { passive: true }); window.addEventListener('resize', tick); tick();
    });
  }

  /* --- rekentool (Tarieven) --- */
  // Joey levert de definitieve tarieven. Zolang een waarde null is, toont de tool "€ …".
  var TARIEF = {
    meegroeier: null,          // % van de huurinkomsten, bv. 0.05
    vasteWaarde: null,         // € per VHE per maand, bv. 25
    staffel: null,             // bv. [[250000,0.06],[1000000,0.05],[Infinity,0.04]]
    verkoop: null,             // courtage %, bv. 0.012
    aankoop: null,             // %, bv. 0.015
    verhuur: null,             // aantal maandhuren, bv. 1
    aanhuur: null              // aantal maandhuren, bv. 1
  };
  var eur = function (n) { return '€ ' + Math.round(n).toLocaleString('nl-NL'); };
  function initCalc() {
    document.querySelectorAll('[data-p3-calc]').forEach(function (root) {
      if (root.__p3k) return; root.__p3k = true;
      var state = { tab: 'beheer', pakket: 'meegroeier' };
      var out = root.querySelector('[data-calc-out]'), unit = root.querySelector('[data-calc-unit]'), note = root.querySelector('[data-calc-note]'), cta = root.querySelector('[data-calc-cta]');
      function val(n) { var el = root.querySelector('[data-calc-in="' + n + '"]'); return el ? el.value : ''; }
      function num(n) { return parseFloat(String(val(n)).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.')) || 0; }
      function calc() {
        var t = state.tab, r = null, u = '', n = '';
        if (t === 'beheer') {
          var vhe = num('vhe'), huur = num('huur');
          if (state.pakket === 'meegroeier' && TARIEF.meegroeier != null) r = huur * TARIEF.meegroeier / 12;
          if (state.pakket === 'vaste' && TARIEF.vasteWaarde != null) r = vhe * TARIEF.vasteWaarde;
          if (state.pakket === 'staffel' && TARIEF.staffel) { var pct = TARIEF.staffel.find(function (s) { return huur <= s[0]; })[1]; r = huur * pct / 12; }
          u = 'per maand, excl. btw'; n = 'Inclusief technisch, financieel, administratief en commercieel beheer en het eigenarenportaal.';
        } else if (t === 'verkoop') { if (TARIEF.verkoop != null) r = num('prijs') * TARIEF.verkoop; u = 'indicatie courtage, excl. btw'; n = 'Inclusief waardebepaling, presentatie, bezichtigingen, onderhandeling en begeleiding tot de overdracht.'; }
        else if (t === 'aankoop') { if (TARIEF.aankoop != null) r = num('prijs') * TARIEF.aankoop; u = 'indicatie aankoopbegeleiding, excl. btw'; n = 'Zoeken, beoordelen op rendement, onderhandelen en begeleiden tot de overdracht.'; }
        else if (t === 'verhuur') { if (TARIEF.verhuur != null) r = num('maandhuur') * TARIEF.verhuur; u = 'indicatie verhuurkosten, excl. btw'; n = 'Inclusief huurprijsadvies, presentatie, huurdersselectie en contract.'; }
        else if (t === 'aanhuur') { if (TARIEF.aanhuur != null) r = num('budget') * TARIEF.aanhuur; u = 'indicatie kosten voor het vinden van een huurpand, excl. btw'; n = 'Wij zoeken, bezichtigen en onderhandelen namens jou.'; }
        if (out) out.textContent = r == null ? '€ …' : eur(r);
        if (unit) unit.textContent = u; if (note) note.textContent = n;
        if (cta) {
          var q = ['dienst=' + t];
          root.querySelectorAll('[data-calc-in]').forEach(function (el) { if (el.closest('[data-calc-pane]') && el.closest('[data-calc-pane]').style.display === 'none') return; if (el.value) q.push(encodeURIComponent(el.getAttribute('data-calc-label') || el.getAttribute('data-calc-in')) + '=' + encodeURIComponent(el.value)); });
          if (t === 'beheer') q.push('pakket=' + state.pakket);
          cta.setAttribute('href', (/\.dc\.html/.test(location.pathname) ? 'Contact.dc.html' : '/contact') + '?' + q.join('&'));
        }
      }
      function setTab(t) {
        state.tab = t;
        root.querySelectorAll('[data-calc-tab]').forEach(function (b) { var on = b.getAttribute('data-calc-tab') === t; b.style.background = on ? '#0E2D30' : 'transparent'; b.style.color = on ? '#ffffff' : '#0E2D30'; });
        root.querySelectorAll('[data-calc-pane]').forEach(function (p) { p.style.display = p.getAttribute('data-calc-pane') === t ? 'flex' : 'none'; });
        calc();
      }
      function setPak(p) {
        state.pakket = p;
        root.querySelectorAll('[data-calc-pak]').forEach(function (b) { var on = b.getAttribute('data-calc-pak') === p; b.style.background = on ? '#CEFF8A' : '#ffffff'; b.style.borderColor = on ? '#0E2D30' : '#E2E8DE'; });
        calc();
      }
      root.querySelectorAll('[data-calc-tab]').forEach(function (b) { b.addEventListener('click', function () { setTab(b.getAttribute('data-calc-tab')); }); });
      root.querySelectorAll('[data-calc-pak]').forEach(function (b) { b.addEventListener('click', function () { setPak(b.getAttribute('data-calc-pak')); }); });
      root.addEventListener('input', calc);
      setTab('beheer'); setPak('meegroeier');
    });
  }

  /* --- contact: voorstel-aanvraag uit de rekentool invullen --- */
  function initPrefill() {
    if (!/contact/i.test(decodeURIComponent(location.pathname)) || !location.search) return;
    var ta = document.querySelector('textarea'); if (!ta || ta.__p3p) return; ta.__p3p = true;
    var p = new URLSearchParams(location.search); if (!p.get('dienst')) return;
    var lines = ['Graag ontvang ik een concreet voorstel.']; p.forEach(function (v, k) { lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); });
    var setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set; setter.call(ta, lines.join('\n')); ta.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function boot() { initAnims(); initTabs(); initChat(); initFlow(); initRoute(); initCalc(); initPrefill(); }
  var n = 0, iv = setInterval(function () { boot(); if (++n > 24) clearInterval(iv); }, 500);
  if (document.readyState !== 'loading') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
