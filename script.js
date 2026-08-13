// Mobile navigation: open/close the menu and close it after selecting a section.
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Reveal sections gently as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

// Contact form: provide simple front-end validation (there is no backend submission).
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll('[required]')];
  let isValid = true;

  fields.forEach((field) => {
    const hasValue = field.value.trim().length > 0;
    const isEmail = field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    const fieldIsValid = hasValue && isEmail;
    field.classList.toggle('invalid', !fieldIsValid);
    isValid = isValid && fieldIsValid;
  });

  if (!isValid) {
    formStatus.textContent = 'Please complete all fields with a valid email address.';
    formStatus.className = 'form-status error';
    return;
  }

  formStatus.textContent = 'Thanks! Your message is ready to send. (This demo form has no backend yet.)';
  formStatus.className = 'form-status success';
  contactForm.reset();
});

// Keep the footer year current without requiring a future edit.
document.querySelector('#year').textContent = new Date().getFullYear();
