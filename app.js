/* ==========================================================================
   UAE Bus Time - Interactive Javascript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initRouteExplorer();
  initScreenshotCarousel();
  initFaqAccordion();
  initBackToTop();
});

/* --- 1. Navbar Scroll Effect & Active Highlighting --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
}

/* --- 2. Mobile Menu Toggle --- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* --- 3. Interactive Route Explorer Demo --- */
const routeDatabase = [
  {
    code: '30',
    name: 'Dubai Mall MS ⇄ Dubai Sky Courts',
    category: 'dubai',
    categoryName: 'Dubai RTA Regular',
    nextBus: '13:29:30',
    tripsPerDay: 161,
    stops: '28 Stops &bull; Every 15 mins'
  },
  {
    code: 'E303',
    name: 'Union Bus Stn ⇄ Al Jubail Bus Stn',
    category: 'intercity',
    categoryName: 'Intercity Express (Sharjah)',
    nextBus: '14:39:30',
    tripsPerDay: 792,
    stops: 'Direct Highway &bull; Every 10 mins'
  },
  {
    code: 'D03',
    name: 'Dubai Mall MS ⇄ Dubai Design District',
    category: 'dubai',
    categoryName: 'Dubai Urban Line',
    nextBus: '13:45:00',
    tripsPerDay: 98,
    stops: '14 Stops &bull; Every 20 mins'
  },
  {
    code: 'CR9',
    name: 'Dubai Festival City MTS ⇄ Creek Harbour',
    category: 'dubai',
    categoryName: 'Dubai Marine & Creek',
    nextBus: '14:10:15',
    tripsPerDay: 112,
    stops: '18 Stops &bull; Every 12 mins'
  },
  {
    code: '5',
    name: 'Al Zahiyah Bus Stn ⇄ Al Kasir, King Salman St',
    category: 'abudhabi',
    categoryName: 'Abu Dhabi ITC',
    nextBus: '13:50:00',
    tripsPerDay: 210,
    stops: 'Corniche Area &bull; PDF Timetable'
  },
  {
    code: '24',
    name: 'Al Rawdah Grand Mosque ⇄ Al Kasir',
    category: 'abudhabi',
    categoryName: 'Abu Dhabi Main Line',
    nextBus: '14:05:00',
    tripsPerDay: 145,
    stops: 'Sheikh Zayed Mosque &bull; PDF Schedule'
  },
  {
    code: 'F08',
    name: 'Dubai Festival City ⇄ Al Nahda 2',
    category: 'feeder',
    categoryName: 'Metro Feeder Line',
    nextBus: '13:35:10',
    tripsPerDay: 180,
    stops: 'Metro Connection &bull; Every 12 mins'
  },
  {
    code: 'E306',
    name: 'Ghubaiha Bus Stn ⇄ Al Jubail Bus Stn',
    category: 'intercity',
    categoryName: 'Intercity Express',
    nextBus: '14:15:00',
    tripsPerDay: 640,
    stops: 'Inter-Emirate &bull; High Frequency'
  }
];

function initRouteExplorer() {
  const resultsContainer = document.getElementById('demo-results');
  const searchInput = document.getElementById('route-search-input');
  const searchBtn = document.getElementById('search-btn');
  const filterPills = document.querySelectorAll('.pill-btn');

  let currentFilter = 'all';
  let searchQuery = '';

  function renderRoutes() {
    if (!resultsContainer) return;

    const filtered = routeDatabase.filter(route => {
      const matchFilter = currentFilter === 'all' || route.category === currentFilter;
      const matchSearch = !searchQuery || 
        route.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-bus-simple" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--border-strong);"></i>
          <p style="font-weight: 600; color: var(--text-primary);">No matching routes found</p>
          <p style="font-size: 0.9rem;">Search in the app to access all 500+ official bus lines in the UAE.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map(r => `
      <div class="route-card">
        <div class="route-card-top">
          <span class="route-badge ${r.category === 'intercity' ? 'intercity-tag' : r.category === 'feeder' ? 'feeder-tag' : ''}">
            ${r.code}
          </span>
          <span class="route-category-tag">${r.categoryName}</span>
        </div>
        <div class="route-name">${r.name}</div>
        <div class="route-details-row">
          <span><i class="fa-regular fa-clock" style="color: var(--primary-color);"></i> Next: <strong>${r.nextBus}</strong></span>
          <span><i class="fa-solid fa-repeat" style="color: var(--text-muted);"></i> <strong>${r.tripsPerDay}</strong> trips/day</span>
        </div>
      </div>
    `).join('');
  }

  // Filter Pill clicks
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter');
      renderRoutes();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderRoutes();
    });
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchQuery = searchInput.value.trim();
      renderRoutes();
    });
  }

  // Initial render
  renderRoutes();
}

/* --- 4. Screenshot Gallery Carousel --- */
function initScreenshotCarousel() {
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const items = track.querySelectorAll('.gallery-item');
  const itemCount = items.length;

  // Build dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < itemCount; i++) {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
      scrollToIndex(i);
    });
    dotsContainer.appendChild(dot);
  }

  function scrollToIndex(idx) {
    if (items[idx]) {
      const scrollLeft = items[idx].offsetLeft - track.offsetLeft;
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      updateDots(idx);
    }
  }

  function updateDots(activeIdx) {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === activeIdx);
    });
  }

  // Scroll listener for active dot
  track.addEventListener('scroll', () => {
    const scrollPos = track.scrollLeft + 140;
    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft - track.offsetLeft;
      const distance = Math.abs(scrollPos - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    updateDots(closestIndex);
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });
}

/* --- 5. FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
    });
  });
}

/* --- 6. Back to top button --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
