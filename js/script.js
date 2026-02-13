/* =============================================================
   VALENTINE'S DAY WEBSITE - JAVASCRIPT
   =============================================================

   CUSTOMIZATION:
   Edit the configuration object below to personalize the website.

   ============================================================= */

// ---------------------------------------------------------------
// CONFIGURATION - Edit these values to personalize!
// ---------------------------------------------------------------

const CONFIG = {
    // Countdown: Set the date you're counting down to.
    // Format: "Month Day, Year HH:MM:SS" or "YYYY-MM-DDTHH:MM:SS"
    COUNTDOWN_DATE: "February 13, 2126 00:00:00",

    // The label shown above the countdown timer
    COUNTDOWN_EVENT: "Our Marriage",

    // Number of floating background hearts
    NUM_BACKGROUND_HEARTS: 15,
};


// ---------------------------------------------------------------
// SCROLL REVEAL ANIMATION
// Elements with the .scroll-reveal class fade in when they
// enter the viewport.
// ---------------------------------------------------------------

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Apply staggered delay if data-delay attribute is set
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay, 10));
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
}


// ---------------------------------------------------------------
// NAVIGATION
// Show/hide the top nav bar based on scroll position.
// Highlight the current section link.
// ---------------------------------------------------------------

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const heroSection = document.getElementById('hero');
    const navLinks = nav.querySelectorAll('a');
    const sections = document.querySelectorAll('section[id]');

    // Show nav after scrolling past the hero
    function updateNavVisibility() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    }

    // Highlight the nav link for the current section in view
    function updateActiveLink() {
        let currentSection = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateNavVisibility();
        updateActiveLink();
    }, { passive: true });

    // Smooth scroll for nav links (fallback for browsers without CSS smooth scroll)
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}


// ---------------------------------------------------------------
// FLIP CARDS (Reasons I Love You)
// Click a card to flip it and reveal the message on the back.
// ---------------------------------------------------------------

function initFlipCards() {
    const cards = document.querySelectorAll('.reason-card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        // Also support keyboard interaction
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Click to reveal a reason');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
}


// ---------------------------------------------------------------
// COUNTDOWN TIMER
// Counts down to the date specified in CONFIG.COUNTDOWN_DATE.
// ---------------------------------------------------------------

function initCountdown() {
    const targetDate = new Date(CONFIG.COUNTDOWN_DATE).getTime();

    // Set event name
    const eventNameEl = document.getElementById('countdown-event-name');
    if (eventNameEl) {
        eventNameEl.textContent = CONFIG.COUNTDOWN_EVENT;
    }

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    function update() {
        const now = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
            // The date has arrived!
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            const msgEl = document.querySelector('.countdown-message');
            if (msgEl) {
                msgEl.textContent = "The day is here! Happy celebration, my love!";
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately, then every second
    update();
    setInterval(update, 1000);
}


// ---------------------------------------------------------------
// FLOATING BACKGROUND HEARTS
// Generates subtle heart shapes that float upward behind all
// content for a dreamy, romantic ambiance.
// ---------------------------------------------------------------

function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const hearts = ['♥', '♡', '❤', '❥'];
    const count = CONFIG.NUM_BACKGROUND_HEARTS;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        // Randomize position, size, speed, and delay
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.animationDuration = (Math.random() * 15 + 15) + 's';
        heart.style.animationDelay = (Math.random() * 20) + 's';

        container.appendChild(heart);
    }
}


// ---------------------------------------------------------------
// MUSIC TOGGLE
// Optional: plays/pauses background music.
// Place an audio file at "images/our-song.mp3" to enable.
// ---------------------------------------------------------------

function initMusicToggle() {
    const btn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    if (!btn || !audio) return;

    let isPlaying = false;

    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            btn.classList.remove('playing');
        } else {
            audio.play().catch(() => {
                // Audio file may not exist or autoplay blocked
            });
            btn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}


// ---------------------------------------------------------------
// PARALLAX EFFECT (subtle)
// Adds a gentle parallax movement to the hero content on scroll.
// ---------------------------------------------------------------

function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Only apply within the hero section height
        if (scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
            heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.6;
        }
    }, { passive: true });
}


// ---------------------------------------------------------------
// BROWNIE POINTS
// Synced scoreboard using backend API, with localStorage fallback.
// ---------------------------------------------------------------

function initBrowniePoints() {
    const saloniEl = document.getElementById('score-saloni');
    const zaidEl = document.getElementById('score-zaid');
    const statusEl = document.getElementById('brownie-status');
    if (!saloniEl || !zaidEl) return;

    let scores = { saloni: 0, zaid: 0 };

    function render() {
        saloniEl.textContent = scores.saloni;
        zaidEl.textContent = scores.zaid;

        if (statusEl) {
            if (scores.saloni > scores.zaid) {
                statusEl.textContent = "Saloni is winning! Better step up, Zaid.";
            } else if (scores.zaid > scores.saloni) {
                statusEl.textContent = "Zaid is in the lead! Your move, Saloni.";
            } else {
                statusEl.textContent = "It's a tie! You're both equally amazing.";
            }
        }
    }

    // Fetch scores from server
    function fetchScores() {
        fetch('/api/scores')
            .then(function(res) { return res.json(); })
            .then(function(data) {
                scores = data;
                render();
            })
            .catch(function() {
                // Fallback to localStorage if server is unavailable
                try {
                    var saved = localStorage.getItem('browniePoints');
                    if (saved) scores = JSON.parse(saved);
                } catch (e) { /* ignore */ }
                render();
            });
    }

    // Send score update to server
    function updateScore(player, action) {
        fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: player, action: action })
        })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                scores = data;
                try { localStorage.setItem('browniePoints', JSON.stringify(scores)); } catch (e) { /* ignore */ }
                render();
            })
            .catch(function() {
                // Fallback: update locally if server is down
                if (action === 'plus') scores[player]++;
                else scores[player]--;
                try { localStorage.setItem('browniePoints', JSON.stringify(scores)); } catch (e) { /* ignore */ }
                render();
            });
    }

    document.querySelectorAll('.brownie-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            updateScore(btn.dataset.player, btn.dataset.action);
        });
    });

    // Load scores on init and refresh every 10 seconds
    fetchScores();
    setInterval(fetchScores, 10000);
}


// ---------------------------------------------------------------
// INITIALIZE EVERYTHING ON DOM READY
// ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavigation();
    initFlipCards();
    initCountdown();
    initFloatingHearts();
    initMusicToggle();
    initParallax();
    initBrowniePoints();
});
