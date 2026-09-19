/* The Dementia Barber Co. — small progressive enhancements.
   Everything here is optional: the site is fully usable with JS disabled. */
(function () {
  'use strict';

  /* --- Mobile navigation ------------------------------------------- */
  var toggle = document.querySelector('.navtoggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Shadow on the sticky nav once the page has moved ------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Staggered reveal on scroll ----------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var group = entry.target.parentElement
          ? Array.prototype.indexOf.call(entry.target.parentElement.children, entry.target)
          : 0;
        entry.target.style.transitionDelay = Math.min(group, 5) * 70 + 'ms';
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) { observer.observe(el); });
  }

  /* --- Enquiry form ------------------------------------------------
     Posts to Formspree. Until a real endpoint is pasted into the form's
     data-endpoint attribute we do not pretend to send anything — the
     visitor is pointed at the phone number and email instead. */
  var form = document.getElementById('enquiryForm');
  if (!form) return;

  var status = document.getElementById('formStatus');
  var endpoint = form.getAttribute('data-endpoint') || '';
  var configured = endpoint.indexOf('REPLACE_ME') === -1 && endpoint.indexOf('http') === 0;

  var say = function (message, kind) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status ' + (kind || '');
  };

  if (!configured) {
    say('This form is not connected yet. Please call 07403 057708 or email dementiabarberco@outlook.com and I will come straight back to you.', 'err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!configured) {
      say('This form is not connected yet. Please call 07403 057708 or email dementiabarberco@outlook.com and I will come straight back to you.', 'err');
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; }
    say('Sending your enquiry…');

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed with status ' + res.status);
        form.reset();
        say('Thank you — your enquiry has been sent. I aim to reply within two working days.', 'ok');
      })
      .catch(function () {
        say('Sorry, that did not send. Please call 07403 057708 or email dementiabarberco@outlook.com instead.', 'err');
      })
      .finally(function () {
        if (button) { button.disabled = false; }
      });
  });
})();
