document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // --- UTILITY FUNCTIONS ---
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);

    // --- INITIALIZATION ---
    initPageLoadAnimation();
    initScrollTriggers();
    initMobileMenu();
    initFaqAccordion();
    initGrowthGrader();
    initAdvancedAnimations();
    initMagneticButtons();
    initParallaxEffects();
    initTextRevealAnimations();
    initCounterAnimations();
    initTiltCards();
    initCursorEffects();

    // --- CORE LOGIC ---

    /**
     * Animates the hero text on initial page load.
     */
    function initPageLoadAnimation() {
        if (typeof gsap === 'undefined') return;

        // Add page transition
        document.body.classList.add('page-transition');

        let tl = gsap.timeline();
        tl.from(".split-child", {
            yPercent: 100,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        });

        // Animate other hero elements
        tl.from(".hero-fade", {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.5");
    }

    /**
     * Sets up the mobile menu toggle functionality.
     */
    function initMobileMenu() {
        const mobileMenuButton = select('#mobile-menu-button');
        const mobileMenu = select('#mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

            selectAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
            });
        }

        // Set current year in footer
        const yearElement = select('#year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    /**
     * Initializes GSAP ScrollTrigger animations for elements with the .fade-in class.
     * Also adds a parallax effect to images within .work-item containers.
     */
    function initScrollTriggers() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            // Fallback for when GSAP isn't loaded
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        if (entry.target.classList.contains('stagger-children')) {
                            entry.target.classList.add('animated');
                        }
                    }
                });
            }, observerOptions);

            selectAll('.fade-in, .stagger-children').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s ease';
                observer.observe(el);
            });

            return;
        }

        // Enhanced fade-in animation
        selectAll('.fade-in').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                },
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
            });
        });

        // Enhanced parallax effect for work item images
        selectAll('.work-item-image').forEach(img => {
            gsap.to(img, {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.work-item'),
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
            });
        });

        // Stagger children animations
        selectAll('.stagger-children').forEach(container => {
            ScrollTrigger.create({
                trigger: container,
                start: "top 80%",
                onEnter: () => container.classList.add('animated'),
                once: true
            });
        });
    }

    /**
     * Initializes the accordion functionality for the FAQ section.
     */
    function initFaqAccordion() {
        const faqItems = selectAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    // Close other active items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    // Toggle the clicked item
                    item.classList.toggle('active');
                });
            }
        });
    }

    /**
     * Initializes the Growth Grader tool functionality
     */
    function initGrowthGrader() {
        const form = select('#growth-grader-form');
        const analyzerForm = select('#analyzer-form');
        const resultsArea = select('#results-area');
        const loadingState = select('#loading-state');
        const resultsContent = select('#results-content');

        if (!form) return; // Exit if not on the analyzer page

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const businessName = select('#business-name').value;
            const websiteAddress = select('#website-address').value;

            // Hide form and show results area
            analyzerForm.style.display = 'none';
            resultsArea.classList.remove('hidden');

            // Show loading state
            loadingState.classList.remove('hidden');
            resultsContent.classList.add('hidden');

            // Simulate analysis delay
            setTimeout(() => {
                // Hide loading state and show results
                loadingState.classList.add('hidden');
                resultsContent.classList.remove('hidden');

                // Generate and display results
                displayResults(businessName, websiteAddress);
            }, 2000);
        });
    }

    /**
     * Advanced Animations
     */
    function initAdvancedAnimations() {
        // Add hover lift class to cards
        selectAll('.bento-grid-item, .work-item-image-wrap').forEach(el => {
            el.classList.add('hover-lift');
        });

        // Add spotlight effect to cards
        selectAll('.bento-grid-item').forEach(el => {
            el.classList.add('spotlight-card');
        });

        // Add floating animation to certain elements
        selectAll('.grade-circle').forEach(el => {
            el.classList.add('float-animation');
        });
    }

    /**
     * Magnetic Button Effects
     */
    function initMagneticButtons() {
        selectAll('.cta-button, .magnetic-button').forEach(button => {
            // Check if the button is already wrapped to avoid double-wrapping
            if (button.parentElement.classList.contains('magnetic-wrapper')) {
                return;
            }

            const wrapper = document.createElement('div');
            wrapper.className = 'magnetic-wrapper';
            button.parentNode.insertBefore(wrapper, button);
            wrapper.appendChild(button);

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }


    /**
     * Parallax Effects
     */
    function initParallaxEffects() {
        selectAll('.parallax-container').forEach(container => {
            const element = container.querySelector('.parallax-element');
            if (!element) return;

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                element.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            });

            container.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Text Reveal Animations
     */
    function initTextRevealAnimations() {
        selectAll('.reveal-text').forEach(text => {
            const content = text.textContent;
            const words = content.split(' ');
            text.innerHTML = words.map((word, index) =>
                `<span style="transition-delay: ${index * 0.1}s">${word}</span>`
            ).join(' ');

            ScrollTrigger.create({
                trigger: text,
                start: "top 80%",
                onEnter: () => text.classList.add('revealed'),
                once: true
            });
        });
    }

    /**
     * Counter Animations
     */
    function initCounterAnimations() {
        const animateCounter = (el, target, isDecimal = false) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
            }, 30);
        };

        selectAll('.counter').forEach(counter => {
            const text = counter.textContent;
            const isDecimal = text.includes('.');
            const target = parseFloat(text);
            counter.textContent = '0';

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: counter,
                    start: "top 80%",
                    onEnter: () => {
                        animateCounter(counter, target, isDecimal);
                    },
                    once: true
                });
            } else {
                // Fallback with Intersection Observer
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounter(counter, target, isDecimal);
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.5
                });

                observer.observe(counter);
            }
        });
    }

    /**
     * Tilt Card Effects
     */
    function initTiltCards() {
        selectAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const tiltX = (y - 0.5) * 20;
                const tiltY = (x - 0.5) * -20;

                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    /**
     * Custom Cursor Effects
     */
    function initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follow';
        document.body.appendChild(cursor);

        let mouseX = 0,
            mouseY = 0;
        let cursorX = 0,
            cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.1;
            cursorY += dy * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hide cursor on touch devices
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
        }
    }

    /**
     * Displays the Growth Grader results with enhanced animations
     */
    function displayResults(businessName, websiteAddress) {
        const resultsContent = select('#results-content');

        // Sample report data
        const overallGrade = 'B+';
        const metrics = [{
            name: 'Website Performance',
            score: 75,
            feedback: 'Good loading speed, but room for optimization'
        }, {
            name: 'Mobile Responsiveness',
            score: 90,
            feedback: 'Excellent mobile experience'
        }, {
            name: 'SEO Optimization',
            score: 65,
            feedback: 'Missing key meta tags and structured data'
        }, {
            name: 'Content Quality',
            score: 85,
            feedback: 'Strong content, could benefit from more keywords'
        }, {
            name: 'User Experience',
            score: 80,
            feedback: 'Clear navigation, consider adding more CTAs'
        }, {
            name: 'Social Media Presence',
            score: 60,
            feedback: 'Inconsistent posting schedule detected'
        }, {
            name: 'Local SEO',
            score: 70,
            feedback: 'Google My Business needs optimization'
        }, {
            name: 'Conversion Optimization',
            score: 55,
            feedback: 'Missing clear conversion paths'
        }];

        const recommendations = [{
            priority: 'High',
            title: 'Improve Page Load Speed',
            description: 'Optimize images and implement lazy loading to improve your site speed by 40%'
        }, {
            priority: 'High',
            title: 'Add Schema Markup',
            description: 'Implement structured data to improve search visibility and rich snippets'
        }, {
            priority: 'Medium',
            title: 'Create Content Calendar',
            description: 'Develop a consistent posting schedule for social media engagement'
        }, {
            priority: 'Medium',
            title: 'Optimize Conversion Paths',
            description: 'Add clear CTAs and simplify your contact forms to increase conversions'
        }];

        // Generate HTML
        resultsContent.innerHTML = `
            <div class="bg-bg-alt rounded-lg p-8 md:p-12 shadow-xl mb-12 page-transition">
                <h2 class="text-3xl font-bold text-center mb-8">Growth Grade Report for ${businessName}</h2>
                
                <div class="text-center mb-12">
                    <div class="grade-circle">${overallGrade}</div>
                    <p class="text-xl text-text-muted">Your Overall Growth Grade</p>
                    <p class="text-sm text-text-muted mt-2">Analyzed: ${websiteAddress}</p>
                </div>

                <div class="mb-12">
                    <h3 class="text-2xl font-bold mb-6">Performance Metrics</h3>
                    <div class="space-y-6 stagger-children">
                        ${metrics.map(metric => `
                            <div class="fade-in">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-medium">${metric.name}</span>
                                    <span class="text-sm font-bold counter">${metric.score}</span><span class="text-sm font-bold">%</span>
                                </div>
                                <div class="metric-bar">
                                    <div class="metric-fill" data-score="${metric.score}" style="width: 0%"></div>
                                </div>
                                <p class="text-sm text-text-muted mt-2">${metric.feedback}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h3 class="text-2xl font-bold mb-6">Recommended Actions</h3>
                    <div class="space-y-4 stagger-children">
                        ${recommendations.map(rec => `
                            <div class="recommendation-item hover-lift">
                                <div class="flex items-start justify-between mb-2">
                                    <h4 class="font-bold">${rec.title}</h4>
                                    <span class="text-sm px-3 py-1 rounded-full ${
                                        rec.priority === 'High' 
                                            ? 'bg-red-100 text-red-700' 
                                            : 'bg-yellow-100 text-yellow-700'
                                    }">${rec.priority} Priority</span>
                                </div>
                                <p class="text-text-muted">${rec.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="text-center page-transition">
                <h3 class="text-2xl font-bold mb-4">Ready to Improve Your Grade?</h3>
                <p class="text-text-muted mb-8">Let our experts help you implement these improvements and achieve sustainable growth.</p>
                <a href="/contact.html" class="inline-block px-10 py-4 rounded-md font-semibold cta-button text-lg magnetic-button">
                    Schedule Your Free Consultation
                </a>
            </div>
        `;

        // Animate metric bars after a short delay
        setTimeout(() => {
            selectAll('.metric-fill').forEach((bar, index) => {
                const score = bar.getAttribute('data-score');
                setTimeout(() => {
                    bar.style.width = score + '%';
                }, index * 100);
            });

            // Trigger stagger animations
            selectAll('.stagger-children').forEach(container => {
                container.classList.add('animated');
            });
        }, 100);

        // Re-initialize magnetic buttons for new content
        initMagneticButtons();
    }
});