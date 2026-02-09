// Portfolio Data - Easily add/modify projects here
const portfolioProjects = [
  {
    id: 1,
    title: "Motorsport Photography",
    description: "High-speed action captured with precision and passion",
    emoji: "🏎️",
    stats: ["75+ Events", "5★ Rating"],
    link: "motorsport.html"
  },
  {
    id: 2,
    title: "Nature",
    description: "Capturing the raw beauty of landscapes and wildlife",
    emoji: "🌄",
    stats: ["120+ Locations", "Award Winning"],
    link: "nature.html"
  },
  {
    id: 3,
    title: "Portrait Sessions",
    description: "Professional portraits that reveal authentic personalities",
    emoji: "👤",
    stats: ["200+ Portraits", "Featured"],
    link: "portrait.html"
  },
  {
    id: 4,
    title: "Urban & Architectural",
    description: "Exploring the intersection of design and urban landscapes",
    emoji: "🏙️",
    stats: ["100+ Projects", "Global"],
    link: "urban.html"
  }
];

// Function to render portfolio items dynamically
function renderPortfolio() {
  const portfolioGrid = document.getElementById('portfolioGrid');
  
  if (!portfolioGrid) return;
  
  portfolioGrid.innerHTML = portfolioProjects.map(project => `
    <a href="${project.link}" class="portfolio-link">
      <div class="portfolio-item">
        <div class="portfolio-card">
          <div class="portfolio-image">
            <div class="image-placeholder">${project.emoji}</div>
          </div>
          <div class="portfolio-content">
            <h3 class="portfolio-title">${project.title}</h3>
            <p class="portfolio-description">${project.description}</p>
            <div class="portfolio-meta">
              <span class="meta-item">${project.stats[0]}</span>
              <span class="meta-divider">•</span>
              <span class="meta-item">${project.stats[1]}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

// Initialize portfolio on page load
window.addEventListener('load', () => {
  renderPortfolio();
});


const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll with nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email', 'error');
      return;
    }

    // Show success message
    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }, 5000);
  });
}

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Hamburger menu (for future mobile menu implementation)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Animated overlay menu
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = (() => {
  const div = document.createElement('div');
  div.className = 'menu-overlay';
  div.innerHTML = `
    <ul class="overlay-items">
      <li><a href="index.html#home" class="overlay-link">HOME</a></li>
      <li><a href="index.html#portfolio" class="overlay-link">PORTFOLIO</a></li>
      <li><a href="index.html#about" class="overlay-link">ABOUT</a></li>
      <li><a href="index.html#contact" class="overlay-link">CONTACT</a></li>
    </ul>
  `;
  document.body.appendChild(div);
  return div;
})();

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    menuOverlay.classList.toggle('open');
  });

  // close overlay when a link is clicked
  menuOverlay.querySelectorAll('.overlay-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow navigation to proceed, but close overlay
      menuToggle.classList.remove('active');
      menuOverlay.classList.remove('open');
    });
  });
}

// Consultation popup behavior
const consultationPopup = document.getElementById('consultationPopup');
const consultClose = document.getElementById('consultClose');
const consultBookNow = document.getElementById('consultBookNow');

function showConsultationPopup() {
  if (!consultationPopup) return;
  consultationPopup.classList.add('show');
  consultationPopup.setAttribute('aria-hidden', 'false');
}

function hideConsultationPopup() {
  if (!consultationPopup) return;
  consultationPopup.classList.remove('show');
  consultationPopup.setAttribute('aria-hidden', 'true');
}

// show popup at a random delay between 4 and 12 seconds after page load
const minDelay = 4000;
const maxDelay = 12000;
const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

window.addEventListener('load', () => {
  setTimeout(() => {
    showConsultationPopup();
  }, randomDelay);
});

if (consultClose) {
  consultClose.addEventListener('click', () => {
    hideConsultationPopup();
  });
}

// Close popup when 'Book Now' clicked — allow navigation to contact
if (consultBookNow) {
  consultBookNow.addEventListener('click', () => {
    hideConsultationPopup();
  });
}

// Timezone update function
function updateTimezones() {
  const now = new Date();
  
  const formatter = (tz) => new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: tz
  });
  
  const londonTime = formatter('Europe/London').format(now);
  const warsawTime = formatter('Europe/Warsaw').format(now);
  const newyorkTime = formatter('America/New_York').format(now);
  
  const londonElements = document.querySelectorAll('#london-time');
  const warsawElements = document.querySelectorAll('#warsaw-time');
  const newyorkElements = document.querySelectorAll('#newyork-time');
  
  londonElements.forEach(el => el.textContent = londonTime);
  warsawElements.forEach(el => el.textContent = warsawTime);
  newyorkElements.forEach(el => el.textContent = newyorkTime);
}

// Update timezones immediately and then every second
updateTimezones();
setInterval(updateTimezones, 1000);

// Page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});