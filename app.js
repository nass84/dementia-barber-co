// The Dementia Barber Co. — mobile menu and enquiry form.
// Everything works without this file: anchors scroll natively and the form
// falls back to a plain mailto: submit.

(function () {
  const ENQUIRY_EMAIL = 'dementiabarberco@outlook.com';

  // --- Mobile menu ---
  const burger = document.querySelector('.nav-burger');
  const menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  }

  burger.addEventListener('click', function () {
    setMenu(menu.hidden);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      burger.focus();
    }
  });

  // --- Enquiry form ---
  // Builds a readable email in the visitor's own mail app, then swaps the
  // form for a thank-you note.
  const form = document.querySelector('.enquiry');
  const done = document.querySelector('.form-done');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const body =
      'Name: ' + fd.get('name') + '\n' +
      'Phone: ' + (fd.get('phone') || '-') + '\n' +
      'Email: ' + fd.get('email') + '\n' +
      'Enquiring as: ' + fd.get('type') + '\n\n' +
      fd.get('message');
    window.location.href =
      'mailto:' + ENQUIRY_EMAIL +
      '?subject=' + encodeURIComponent('Enquiry from ' + fd.get('name')) +
      '&body=' + encodeURIComponent(body);
    form.hidden = true;
    done.hidden = false;
    done.focus();
  });
  done.tabIndex = -1;
})();
