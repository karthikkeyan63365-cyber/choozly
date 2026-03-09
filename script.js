Content is user-generated and unverified.
2
/* ================================================================
   SCRIPT.JS — Portfolio JavaScript
   What this file does:
   1. Navbar: adds background when user scrolls down
   2. Mobile hamburger menu: open/close drawer
   3. Scroll Reveal: animates elements when they enter the viewport
   4. Skill Bars: animates progress bars when skills section is visible
   5. Contact Form: basic validation + success message
   6. Active nav link: highlights current section in navbar
================================================================ */


/* ----------------------------------------------------------------
   1. NAVBAR — Add 'scrolled' class on scroll
   This makes the navbar background appear after the hero section
---------------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ----------------------------------------------------------------
   2. MOBILE MENU — Hamburger toggle
   Opens/closes the fullscreen mobile nav drawer
---------------------------------------------------------------- */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobileNav');
const mobLinks   = document.querySelectorAll('.mob-link');

// Toggle menu open/close
hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close menu when any link is clicked
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});


/* ----------------------------------------------------------------
   3. SCROLL REVEAL — Animate elements into view
   Uses IntersectionObserver — a modern browser API that fires
   a callback whenever an element enters or leaves the viewport.
   When an element with class "reveal" enters the screen,
   we add the "visible" class which triggers the CSS transition.
---------------------------------------------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once visible (animation only plays once)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,    // Trigger when 12% of element is visible
    rootMargin: '0px 0px -50px 0px'  // Slightly before entering viewport
  }
);

// Observe every element with class "reveal"
revealElements.forEach(el => revealObserver.observe(el));


/* ----------------------------------------------------------------
   4. SKILL BARS — Animate progress bars
   Each .skill-fill has a "data-width" attribute (e.g. data-width="75")
   We wait until the skills section is visible, then animate the
   width from 0 to that value.
---------------------------------------------------------------- */
const skillFills   = document.querySelectorAll('.skill-fill');
const skillSection = document.getElementById('skills');
let   skillsAnimated = false;  // Track if already animated (run once)

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;

        // Small delay before starting bars
        setTimeout(() => {
          skillFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth + '%';
          });
        }, 300);

        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

if (skillSection) skillObserver.observe(skillSection);


/* ----------------------------------------------------------------
   5. CONTACT FORM — Simple validation + success message
   This is a frontend-only form simulation.
   To make it actually send emails, you'd add a backend or
   use a service like EmailJS / Formspree.
---------------------------------------------------------------- */
function sendMessage() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const success = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendBtn');

  // Basic validation — check all fields are filled
  if (!name || !email || !message) {
    // Shake button to signal error
    sendBtn.style.transform = 'translateX(-6px)';
    setTimeout(() => sendBtn.style.transform = 'translateX(6px)',  100);
    setTimeout(() => sendBtn.style.transform = 'translateX(0)',    200);
    return;
  }

  // Simple email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Simulate sending (you'd do a real fetch/POST here in production)
  sendBtn.textContent = 'Sending...';
  sendBtn.style.opacity = '0.7';
  sendBtn.disabled = true;

  setTimeout(() => {
    // Clear the form
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';

    // Show success message
    success.style.display = 'block';

    // Reset button
    sendBtn.innerHTML = 'Send Message <span class="iconify" data-icon="ph:paper-plane-right-bold"></span>';
    sendBtn.style.opacity = '1';
    sendBtn.disabled = false;

    // Hide success message after 5 seconds
    setTimeout(() => success.style.display = 'none', 5000);

  }, 1500);   // Simulate 1.5s network delay
}


/* ----------------------------------------------------------------
   6. ACTIVE NAV LINK — Highlight current section
   Uses IntersectionObserver to detect which section is on screen,
   then highlights the matching nav link.
---------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navAnchors.forEach(a => {
          a.style.color = '';        // Reset all
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--accent)';  // Highlight current
          }
        });
      }
    });
  },
  {
    threshold: 0.5   // Trigger when 50% of section is visible
  }
);

sections.forEach(sec => sectionObserver.observe(sec));


/* ----------------------------------------------------------------
   7. SMOOTH SCROLL for all anchor links (backup for older browsers)
---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

