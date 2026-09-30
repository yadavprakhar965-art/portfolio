/* ==========================================================================
   PRAKHAR YADAV PORTFOLIO - JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initTheme();
    initTypingEffect();
    initNavbarScroll();
    initMobileMenu();
    initClipboardToast();
    initProjectModal();
    initContactForm();
    setCurrentYear();
    initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme in localStorage or default to dark
    const savedTheme = localStorage.getItem('prakhar-portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('prakhar-portfolio-theme', newTheme);
        
        showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
}

/* --------------------------------------------------------------------------
   2. DYNAMIC TYPING EFFECT FOR HERO
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const phrases = [
        "FastAPI & Spring Boot APIs",
        "Expense Trackers & HR Systems",
        "Responsive JavaScript Apps",
        "Scalable Database Architecture"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at top
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const header = document.querySelector('.navbar-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section Highlight
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   4. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. COPY TO CLIPBOARD & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initClipboardToast() {
    const emailBtn = document.getElementById('copy-email-btn');
    const phoneBtn = document.getElementById('copy-phone-btn');

    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard('yadavprakhar965@gmail.com', 'Email address copied to clipboard!');
        });
    }

    if (phoneBtn) {
        phoneBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyToClipboard('+919026742295', 'Phone number copied to clipboard!');
        });
    }
}

function copyToClipboard(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message);
        }).catch(err => {
            fallbackCopy(text, message);
        });
    } else {
        fallbackCopy(text, message);
    }
}

function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(message);
    } catch (err) {
        showToast('Failed to copy');
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* --------------------------------------------------------------------------
   6. PROJECT DETAILS MODAL
   -------------------------------------------------------------------------- */
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const triggers = document.querySelectorAll('.modal-trigger');

    if (!modal) return;

    const projectData = {
        'expense-tracker': {
            title: 'Expense Tracker API',
            content: `
                <div class="project-modal-details">
                    <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                        The <strong>Expense Tracker API</strong> is a high-performance RESTful API service built with FastAPI and MySQL that enables users to manage daily financial transactions, categorize expenses, and analyze spending habits.
                    </p>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Key Technical Architecture</h4>
                    <ul style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary);">
                        <li><strong>CRUD Operations:</strong> Complete endpoints for creating, editing, deleting, and searching daily expense records.</li>
                        <li><strong>Advanced Filtering:</strong> Filter query endpoints by specific spending categories or custom date ranges.</li>
                        <li><strong>Summary Analytics Engine:</strong> Calculates real-time total spending, average daily expense, and top spending category.</li>
                        <li><strong>Database Layer:</strong> Optimized MySQL relational schema using Python ORM queries for low latency.</li>
                    </ul>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Technology Stack</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
                        <span class="tech-pill">FastAPI</span>
                        <span class="tech-pill">Python</span>
                        <span class="tech-pill">MySQL</span>
                        <span class="tech-pill">RESTful APIs</span>
                        <span class="tech-pill">Postman</span>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <a href="https://github.com/yadavprakhar965-art" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repository
                        </a>
                    </div>
                </div>
            `
        },
        'employee-management': {
            title: 'Employee Management System',
            content: `
                <div class="project-modal-details">
                    <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                        The <strong>Employee Management System</strong> is an end-to-end full-stack solution featuring a Spring Boot REST API and an intuitive management frontend interface for HR administration.
                    </p>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Key Technical Features</h4>
                    <ul style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary);">
                        <li><strong>Employee Records Management:</strong> Robust REST endpoints to add, update, delete, and search corporate employee records.</li>
                        <li><strong>Department & Salary Analytics:</strong> Departmental filtering views with automated salary aggregation and breakdown for each department.</li>
                        <li><strong>HR Web Dashboard:</strong> Clean, responsive web dashboard allowing HR staff to visualize and manage company employees seamlessly.</li>
                        <li><strong>Persistence Layer:</strong> Built on Spring Data JPA and MySQL database for relational integrity.</li>
                    </ul>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Technology Stack</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
                        <span class="tech-pill">Spring Boot</span>
                        <span class="tech-pill">Spring Data JPA</span>
                        <span class="tech-pill">Java</span>
                        <span class="tech-pill">MySQL</span>
                        <span class="tech-pill">HTML/CSS</span>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <a href="https://github.com/yadavprakhar965-art" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repository
                        </a>
                    </div>
                </div>
            `
        },
        'weather-app': {
            title: 'Weather App',
            content: `
                <div class="project-modal-details">
                    <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                        The <strong>Weather App</strong> is a modern, responsive frontend web application that fetches live weather forecasts and meteorological metrics for worldwide cities using public weather REST APIs.
                    </p>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Key Technical Features</h4>
                    <ul style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary);">
                        <li><strong>Live Weather Fetching:</strong> Asynchronous Fetch API integration providing real-time temperature, humidity, and atmospheric conditions.</li>
                        <li><strong>Location Search & Geolocation:</strong> Search lookup input box + one-click auto-detection of current user location using browser Geolocation API.</li>
                        <li><strong>5-Day Forecast Display:</strong> Dynamic rendering of 5-day weather forecast cards with weather icons and metrics.</li>
                    </ul>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Technology Stack</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
                        <span class="tech-pill">JavaScript</span>
                        <span class="tech-pill">HTML5</span>
                        <span class="tech-pill">CSS3</span>
                        <span class="tech-pill">RESTful Weather API</span>
                    </div>

                    <div style="display: flex; gap: 1rem;">
                        <a href="https://github.com/yadavprakhar965-art" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View GitHub Repository
                        </a>
                    </div>
                </div>
            `
        }
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;

        showToast(`Thank you ${name}! Your message regarding "${subject}" has been received.`);
        contactForm.reset();
    });
}

/* --------------------------------------------------------------------------
   8. CURRENT YEAR AUTO-UPDATE
   -------------------------------------------------------------------------- */
function setCurrentYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* --------------------------------------------------------------------------
   9. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.glass-card, .section-header, .timeline-item');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
