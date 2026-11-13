// Makes the sketches clickable: header menus, goal filter, accordion, mobile menu.
// Menu items, goals and link targets mirror the live growth-sharks.com English site.
(function () {
  var LIVE = 'https://www.growth-sharks.com';

  var MENU = {
    'Solutions': {
      lead: 'Choose your goal. We match it with the technology that fits.',
      more: ['Go to the selector →', '#stores'],
      items: [
        ['More conversions', 'From visitor to buyer', '/en/solutions/more-conversions/'],
        ['Higher order value', 'More per order, without extra discounts', '/en/solutions/higher-order-value/'],
        ['Returning customers', 'Customers who come back on their own', '/en/solutions/returning-customers/'],
        ['Lower ad costs', 'Budget for what actually sells', '/en/solutions/lower-ad-costs/'],
        ['Found in Google and AI', 'SEO and GEO for your products', '/en/solutions/found-in-google-and-ai/'],
        ['Product data in order', 'Copy, attributes and images', '/en/solutions/found-in-google-and-ai/#productdata'],
        ['In-store and online as one', 'One stock, one customer view', '/en/solutions/omnichannel/']
      ]
    },
    'Technologies': {
      lead: 'Seven eCommerce technologies we sell, implement and know inside out.',
      more: ['Compare by goal →', '#stores'],
      items: [
        ['Reskyt', 'Shopping app', '/en/reskyt/'],
        ['Segmentify', 'Personalisation and customer engagement', '/en/segmentify/'],
        ['Fozzels', 'AI product content', '/en/fozzels/'],
        ['Boostic', 'Ad budget per product', '/en/boostic/'],
        ['NextChapter Ecommerce', 'Omni- and multichannel commerce suite', '/en/nextchapter-ecommerce/'],
        ['Cervito', 'AI sales assistant', '/en/cervito/'],
        ['Vchfy', 'Branded discount code page', '/en/vchfy/']
      ]
    },
    'For partners': {
      lead: 'You build the tech. We sell it, in your target market.',
      more: ['See our approach →', '/en/#gs-partners'],
      items: [
        ['Become a partner', 'From fit check to first deals', '/en/#gs-partners'],
        ['How we work', 'Enablement, execution and growth', '/en/#gs-partners'],
        ['Partner ecosystem', 'Technology, agencies and integrations', '/en/partners/'],
        ['Become an agency partner', 'Bring technology to online stores together', '/en/partners/#pa-bureau']
      ]
    },
    'Knowledge base': {
      lead: 'Practical knowledge about eCommerce growth, without the sales talk.',
      more: ['All articles →', '/en/knowledge-base/'],
      items: [
        ['Blog', 'Articles by goal and by technology', '/en/knowledge-base/#kb-blog'],
        ['Cases', 'Results from online stores', '/en/knowledge-base/#kb-cases'],
        ['News', 'Partners, people and milestones', '/en/knowledge-base/#kb-nieuws'],
        ['Events', 'Where you can meet us', '/en/knowledge-base/#kb-events'],
        ['Glossary', 'Shopping app, GEO, control group and more', '/en/knowledge-base/#kb-begrippen']
      ]
    },
    'About us': {
      lead: 'The home of technologies. Based in the Netherlands, active in Europe and Latin America.',
      more: ['Our story →', '/en/#gs-over'],
      items: [
        ['Team', 'The Sharkers behind the deals', '/en/#gs-over'],
        ['Careers', 'Freelance ambassadors, SDRs and sales executives', '/en/careers/'],
        ['Contact', 'Book a call or ask us anything', '#contact'],
        ['Reviews on G2', 'What customers and partners say', 'https://www.g2.com/products/growth-sharks/reviews']
      ]
    }
  };

  var GOALS = [['all', 'Show all'], ['conv', 'More conversions'], ['aov', 'Higher order value'], ['ret', 'More returning customers'], ['ads', 'Lower ad costs'], ['seo', 'Easier to find in Google and AI'], ['content', 'Product data in order'], ['omni', 'In-store and online as one']];
  var FITS = {
    'reskyt': ['conv', 'aov', 'ret', 'ads'],
    'fozzels': ['seo', 'content'],
    'nextchapter-ecommerce': ['omni', 'content'],
    'boostic': ['ads'],
    'segmentify': ['conv', 'aov', 'ret'],
    'cervito': ['conv', 'aov'],
    'vchfy': ['conv', 'ret']
  };

  function url(u) { return u.charAt(0) === '/' ? LIVE + u : u; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }

  // Header menus
  var nav = document.querySelector('.hd nav');
  if (nav) {
    var open = null;
    function close() { if (open) { open.classList.remove('open'); open.querySelector('button').setAttribute('aria-expanded', 'false'); open = null; } }
    Array.prototype.slice.call(nav.querySelectorAll('a')).forEach(function (a) {
      var data = MENU[a.textContent.trim()];
      if (!data) return;
      var dd = el('div', 'dd');
      var btn = el('button', '', a.textContent.trim());
      btn.type = 'button'; btn.setAttribute('aria-expanded', 'false');
      var panel = el('div', 'dd-panel');
      var head = el('div', 'dd-head');
      head.appendChild(el('p', '', data.lead));
      var more = el('a', '', data.more[0]); more.href = url(data.more[1]); head.appendChild(more);
      var list = el('div', 'dd-list');
      data.items.forEach(function (it) {
        var link = el('a'); link.href = url(it[2]);
        link.appendChild(el('b', '', it[0])); link.appendChild(el('span', '', it[1]));
        list.appendChild(link);
      });
      panel.appendChild(head); panel.appendChild(list);
      dd.appendChild(btn); dd.appendChild(panel);
      a.replaceWith(dd);
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var was = open === dd; close();
        if (!was) { dd.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); open = dd; }
      });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    });
    document.addEventListener('click', function (e) { if (open && !open.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    // Mobile menu toggle
    var burger = el('button', 'burger', 'Menu');
    burger.type = 'button'; burger.setAttribute('aria-expanded', 'false');
    nav.parentNode.insertBefore(burger, nav);
    burger.addEventListener('click', function () {
      var on = nav.classList.toggle('show');
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
      burger.textContent = on ? 'Close' : 'Menu';
    });
  }

  // Goal filter
  var holder = document.querySelector('[data-goals]');
  var techs = Array.prototype.slice.call(document.querySelectorAll('[data-tech]'));
  if (holder && techs.length) {
    var note = el('p', 'chips-note');
    function pick(goal, chip) {
      Array.prototype.forEach.call(holder.children, function (c) { c.classList.toggle('on', c === chip); c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      var shown = 0, first = null;
      techs.forEach(function (t) {
        var ok = goal === 'all' || (FITS[t.getAttribute('data-tech')] || []).indexOf(goal) > -1;
        t.hidden = !ok;
        if (ok) { shown++; if (!first) first = t; }
        if (t.tagName === 'DETAILS') t.open = false;
      });
      if (first && first.tagName === 'DETAILS') first.open = true;
      note.textContent = goal === 'all' ? '' : shown + (shown === 1 ? ' technology fits' : ' technologies fit') + ' this goal.';
    }
    GOALS.forEach(function (g, i) {
      var chip = el('button', i === 0 ? 'on' : '', g[1]);
      chip.type = 'button'; chip.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      chip.addEventListener('click', function () { pick(g[0], chip); });
      holder.appendChild(chip);
    });
    holder.insertAdjacentElement('afterend', note);
  }

  // Photo proof: tabs filter the wall, a click opens the photo large
  var wall = document.querySelector('.wall2');
  if (wall) {
    var figs = Array.prototype.slice.call(wall.querySelectorAll('figure'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs button'));
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var show = t.getAttribute('data-show');
        tabs.forEach(function (o) { o.classList.toggle('on', o === t); o.setAttribute('aria-pressed', o === t ? 'true' : 'false'); });
        figs.forEach(function (f) { f.hidden = show !== 'all' && f.getAttribute('data-tag') !== show; });
      });
    });

    var lb = el('div', 'lb'); lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo');
    var big = el('img'); var cap = el('p');
    var x = el('button', 'x', '×'), pv = el('button', 'pv', '‹'), nx = el('button', 'nx', '›');
    x.type = pv.type = nx.type = 'button';
    x.setAttribute('aria-label', 'Close'); pv.setAttribute('aria-label', 'Previous photo'); nx.setAttribute('aria-label', 'Next photo');
    lb.appendChild(big); lb.appendChild(cap); lb.appendChild(x); lb.appendChild(pv); lb.appendChild(nx);
    document.body.appendChild(lb);
    var at = 0, back = null;
    function visible() { return figs.filter(function (f) { return !f.hidden; }); }
    function paint() {
      var v = visible(); if (!v.length) return;
      at = (at + v.length) % v.length;
      var img = v[at].querySelector('img');
      big.src = img.getAttribute('src'); big.alt = img.alt;
      cap.textContent = img.alt;
      var n = el('span', '', (at + 1) + ' / ' + v.length); cap.appendChild(n);
    }
    function shut() { lb.classList.remove('show'); document.body.style.overflow = ''; if (back) back.focus(); }
    figs.forEach(function (f) {
      f.querySelector('button').addEventListener('click', function () {
        back = this; at = visible().indexOf(f); paint();
        lb.classList.add('show'); document.body.style.overflow = 'hidden'; x.focus();
      });
    });
    x.addEventListener('click', shut);
    pv.addEventListener('click', function () { at--; paint(); });
    nx.addEventListener('click', function () { at++; paint(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) shut(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('show')) return;
      if (e.key === 'Escape') shut();
      if (e.key === 'ArrowLeft') { at--; paint(); }
      if (e.key === 'ArrowRight') { at++; paint(); }
    });
  }

  // Accordion: one row open at a time
  var rows = Array.prototype.slice.call(document.querySelectorAll('details[data-tech]'));
  rows.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) rows.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
