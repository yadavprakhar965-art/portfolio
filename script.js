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
        "Full-Stack Web Applications",
        "Spring Boot REST APIs",
        "React Interfaces & MySQL Systems",
        "Scalable & Efficient Code"
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
        'internship-recommender': {
            title: 'Internship Recommender System',
            content: `
                <div class="project-modal-details">
                    <p style="margin-bottom: 1.5rem; color: var(--text-secondary);">
                        The <strong>Internship Recommender System</strong> is a full-stack platform engineered to match student profiles with relevant internship positions using profile parameters, skill tagging, and ML-assisted scoring algorithms.
                    </p>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Key Technical Architecture</h4>
                    <ul style="margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary);">
                        <li><strong>Backend API:</strong> Spring Boot application serving RESTful endpoints for profile management, internship catalog search, and match calculations.</li>
                        <li><strong>Database Layer:</strong> MySQL relational database storing user profiles, recruiters, candidate preferences, and internship specifications.</li>
                        <li><strong>Frontend Interface:</strong> Responsive React component architecture facilitating easy resume submission and match score visualizations.</li>
                        <li><strong>Recommendation Engine:</strong> Integrated ML logic weighing applicant skills against internship prerequisites for accuracy improvement.</li>
                    </ul>

                    <h4 style="margin-bottom: 0.8rem; color: var(--primary-color);">Technology Stack Highlights</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem;">
                        <span class="tech-pill">Spring Boot</span>
                        <span class="tech-pill">React</span>
                        <span class="tech-pill">MySQL</span>
                        <span class="tech-pill">RESTful APIs</span>
                        <span class="tech-pill">Machine Learning</span>
                        <span class="tech-pill">Java 8</span>
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
