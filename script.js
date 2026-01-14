// Smooth hero gradient transition on scroll
function handleHeroScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const heroSection = document.querySelector('.hero-section');
    const heroContainer = document.querySelector('.hero-scroll-container');

    if (!heroSection || !heroContainer) return;

    // Get container boundaries
    const containerRect = heroContainer.getBoundingClientRect();
    const containerTop = scrollPosition + containerRect.top;

    // Calculate scroll progress within the container (0 to 1)
    // Transition happens across the first 100vh of the 300vh container
    const scrollInContainer = scrollPosition - containerTop;
    const scrollProgress = Math.max(0, Math.min(scrollInContainer / windowHeight, 1));

    // Blue theme radial gradient
    const blueTop = { r: 26, g: 75, b: 156 };      // #1a4b9c
    const blueMid = { r: 90, g: 143, b: 212 };     // #5a8fd4
    const blueBottom = { r: 212, g: 228, b: 247 }; // #d4e4f7

    // Gold theme radial gradient
    const goldTop = { r: 201, g: 162, b: 39 };     // #c9a227
    const goldMid = { r: 212, g: 188, b: 106 };    // #d4bc6a
    const goldBottom = { r: 245, g: 237, b: 214 }; // #f5edd6

    // Interpolate colors
    const topR = Math.round(blueTop.r + (goldTop.r - blueTop.r) * scrollProgress);
    const topG = Math.round(blueTop.g + (goldTop.g - blueTop.g) * scrollProgress);
    const topB = Math.round(blueTop.b + (goldTop.b - blueTop.b) * scrollProgress);

    const midR = Math.round(blueMid.r + (goldMid.r - blueMid.r) * scrollProgress);
    const midG = Math.round(blueMid.g + (goldMid.g - blueMid.g) * scrollProgress);
    const midB = Math.round(blueMid.b + (goldMid.b - blueMid.b) * scrollProgress);

    const bottomR = Math.round(blueBottom.r + (goldBottom.r - blueBottom.r) * scrollProgress);
    const bottomG = Math.round(blueBottom.g + (goldBottom.g - blueBottom.g) * scrollProgress);
    const bottomB = Math.round(blueBottom.b + (goldBottom.b - blueBottom.b) * scrollProgress);

    // Apply radial gradient
    heroSection.style.background = `radial-gradient(ellipse at center, rgb(${topR}, ${topG}, ${topB}) 0%, rgb(${midR}, ${midG}, ${midB}) 50%, rgb(${bottomR}, ${bottomG}, ${bottomB}) 100%)`;

    // Transition text colors
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const eyebrowBtn = document.querySelector('.eyebrow-btn');
    const ctaBtn = document.querySelector('.hero-section .cta-btn');

    // Text color interpolation: white to dark brown #4a3f1f
    const whiteColor = { r: 255, g: 255, b: 255 };
    const brownColor = { r: 74, g: 63, b: 31 };

    const textR = Math.round(whiteColor.r + (brownColor.r - whiteColor.r) * scrollProgress);
    const textG = Math.round(whiteColor.g + (brownColor.g - whiteColor.g) * scrollProgress);
    const textB = Math.round(whiteColor.b + (brownColor.b - whiteColor.b) * scrollProgress);

    const textColor = `rgb(${textR}, ${textG}, ${textB})`;

    if (heroTitle) heroTitle.style.color = textColor;
    if (heroDescription) heroDescription.style.color = textColor;
    if (eyebrowBtn) {
        eyebrowBtn.style.color = textColor;
        eyebrowBtn.style.borderColor = `rgba(${textR}, ${textG}, ${textB}, 0.4)`;
    }

    // CTA button: White bg → Black bg, Black text → White text
    if (ctaBtn) {
        // Background: white (#ffffff) to black (#1a1a1a)
        const bgStartColor = { r: 255, g: 255, b: 255 };
        const bgEndColor = { r: 26, g: 26, b: 26 };

        const bgR = Math.round(bgStartColor.r + (bgEndColor.r - bgStartColor.r) * scrollProgress);
        const bgG = Math.round(bgStartColor.g + (bgEndColor.g - bgStartColor.g) * scrollProgress);
        const bgB = Math.round(bgStartColor.b + (bgEndColor.b - bgStartColor.b) * scrollProgress);

        // Text: black (#1a1a1a) to white (#ffffff)
        const textStartColor = { r: 26, g: 26, b: 26 };
        const textEndColor = { r: 255, g: 255, b: 255 };

        const ctaTextR = Math.round(textStartColor.r + (textEndColor.r - textStartColor.r) * scrollProgress);
        const ctaTextG = Math.round(textStartColor.g + (textEndColor.g - textStartColor.g) * scrollProgress);
        const ctaTextB = Math.round(textStartColor.b + (textEndColor.b - textStartColor.b) * scrollProgress);

        ctaBtn.style.background = `rgb(${bgR}, ${bgG}, ${bgB})`;
        ctaBtn.style.color = `rgb(${ctaTextR}, ${ctaTextG}, ${ctaTextB})`;
        ctaBtn.style.border = 'none';
    }
}

// Section animations removed - sections are now visible by default

// Parallax effect for specific elements
function handleParallax() {
    const scrolled = window.scrollY;

    // Parallax on floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach(card => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });

    // Parallax on orbit visual
    const orbitVisuals = document.querySelectorAll('.orbit-visual');
    orbitVisuals.forEach(visual => {
        const rect = visual.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
            const scrollPercent = (windowHeight - elementTop) / (windowHeight + elementHeight);
            const parallaxValue = (scrollPercent - 0.5) * 50;
            visual.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

// Smart navbar contrast switching based on section background
function updateNavbar() {
    const navbar = document.querySelector('.navbar');

    // Get all sections including hero
    const sections = document.querySelectorAll('.section, .hero-section, .feature-row-section, .ecosystem-row-section');
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if navbar overlaps this section
        if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = section;
        }
    });

    if (!currentSection) {
        currentSection = document.querySelector('.hero-section');
    }

    // Determine section background color
    const bgColor = window.getComputedStyle(currentSection).backgroundColor;
    const rgb = bgColor.match(/\d+/g);

    if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;

        if (brightness > 128) {
            // Light section - use dark text/logo
            navbar.classList.add('dark-theme');
        } else {
            // Dark section - use white text/logo
            navbar.classList.remove('dark-theme');
        }
    }
}

// Section fade animations removed - sections are visible by default

// Navbar scroll direction detection
let lastScrollY = 0;
let navbarVisible = true;

function handleNavbarVisibility() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    // Always show navbar at the top
    if (currentScrollY < 100) {
        navbar.classList.remove('hidden');
        navbarVisible = true;
    } else {
        // Scrolling down - hide navbar
        if (currentScrollY > lastScrollY && navbarVisible) {
            navbar.classList.add('hidden');
            navbarVisible = false;
        }
        // Scrolling up - show navbar
        else if (currentScrollY < lastScrollY && !navbarVisible) {
            navbar.classList.remove('hidden');
            navbarVisible = true;
        }
    }

    lastScrollY = currentScrollY;
}

// Main scroll handler
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeroScroll();
            handleParallax();
            updateNavbar();
            handleNavbarVisibility();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

// Initialize on load
handleHeroScroll();
updateNavbar();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to CTA buttons
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Cursor trail effect (subtle)
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate product cards on hover
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02) translateZ(0)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateZ(0)';
    });
});

// Add subtle floating animation to sun symbols
document.querySelectorAll('.sun-symbol').forEach((sun, index) => {
    sun.style.animation = `pulse 3s ease-in-out infinite ${index * 0.5}s`;
});

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Image fade animations removed - images are visible by default

// Stats count-up animation
function animateStatValue(element, target, duration = 2000, delay = 0) {
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const startTime = performance.now() + delay;
    let animationFrame;

    // EaseOutQuart easing function
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;

        if (elapsed < 0) {
            animationFrame = requestAnimationFrame(updateValue);
            return;
        }

        if (elapsed < duration) {
            const progress = elapsed / duration;
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.round(easedProgress * target);
            element.textContent = `${prefix}${currentValue}${suffix}`;
            animationFrame = requestAnimationFrame(updateValue);
        } else {
            element.textContent = `${prefix}${target}${suffix}`;
        }
    }

    animationFrame = requestAnimationFrame(updateValue);
}

// IntersectionObserver for stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');

            // Animate each stat with staggered delay (150ms per card)
            statValues.forEach((stat, index) => {
                const target = parseInt(stat.dataset.target);
                const delay = index * 150;
                animateStatValue(stat, target, 2000, delay);
            });

            // Unobserve after animation starts (only animate once)
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

// Observe stats section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Quote section word-by-word animation - DISABLED to preserve spacing
// The animation was removing spaces around the highlighted text
// const quoteObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const quoteText = document.getElementById('quoteText');
//             if (quoteText && !quoteText.dataset.animated) {
//                 // Process text node by node to preserve HTML structure
//                 let delay = 0;
//                 const processNode = (node) => {
//                     if (node.nodeType === Node.TEXT_NODE) {
//                         const words = node.textContent.trim().split(/\s+/);
//                         const wrappedWords = words.map(word => {
//                             const span = document.createElement('span');
//                             span.className = 'word';
//                             span.style.animationDelay = `${delay * 0.05}s`;
//                             span.textContent = word;
//                             delay++;
//                             return span;
//                         });
//                         const fragment = document.createDocumentFragment();
//                         wrappedWords.forEach((span, i) => {
//                             fragment.appendChild(span);
//                             if (i < wrappedWords.length - 1) {
//                                 fragment.appendChild(document.createTextNode(' '));
//                             }
//                         });
//                         node.parentNode.replaceChild(fragment, node);
//                     } else if (node.nodeType === Node.ELEMENT_NODE) {
//                         const childNodes = Array.from(node.childNodes);
//                         childNodes.forEach(child => processNode(child));
//                     }
//                 };

//                 const childNodes = Array.from(quoteText.childNodes);
//                 childNodes.forEach(child => processNode(child));
//                 quoteText.dataset.animated = 'true';
//             }
//             quoteObserver.unobserve(entry.target);
//         }
//     });
// }, { threshold: 0.3 });

// const quoteSection = document.querySelector('.quote-section');
// if (quoteSection) {
//     quoteObserver.observe(quoteSection);
// }

// Margin section number count-up and checklist animation
const marginObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate the number
            const numberEl = document.getElementById('marginNumber');
            if (numberEl && !numberEl.dataset.animated) {
                animateStatValue(numberEl, 60, 1500, 0);
                numberEl.dataset.animated = 'true';
            }

            // Animate checklist items
            const checklistItems = entry.target.querySelectorAll('.checklist-item');
            checklistItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';

                    // Animate checkmark stroke
                    const path = item.querySelector('.checkmark-svg path');
                    if (path) {
                        setTimeout(() => {
                            path.style.strokeDashoffset = '0';
                            path.style.transition = 'stroke-dashoffset 0.4s ease';
                        }, 200);
                    }
                }, index * 150 + 300);
            });

            marginObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const marginSection = document.querySelector('.margin-section');
if (marginSection) {
    marginObserver.observe(marginSection);
}

// Trust section scale effect
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scale-active');
            // Unobserve after animation triggers (only animate once)
            trustObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const trustSection = document.querySelector('.trust-section');
if (trustSection) {
    trustObserver.observe(trustSection);
}

// Value props staggered fade-in animation
const valuePropsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const valueProps = entry.target.querySelectorAll('.value-prop');
            valueProps.forEach((prop, index) => {
                setTimeout(() => {
                    prop.classList.add('fade-in');
                }, index * 150); // 150ms delay between each
            });
            valuePropsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

const valuePropsSection = document.querySelector('.value-props-section');
if (valuePropsSection) {
    valuePropsObserver.observe(valuePropsSection);
}

// CTA scroll handler removed - using static gradient instead

console.log('🚀 Valon website loaded with sophisticated scroll interactions');
