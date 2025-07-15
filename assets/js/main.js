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
    
    // --- CORE LOGIC ---

    /**
     * Animates the hero text on initial page load.
     */
    function initPageLoadAnimation() {
        if (typeof gsap === 'undefined') return;
        
        let tl = gsap.timeline();
        tl.from(".split-child", { 
            yPercent: 100, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: "power3.out" 
        });
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
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        // General fade-in animation for sections and elements
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

        // Parallax effect for work item images
        selectAll('.work-item-image').forEach(img => {
            gsap.to(img, {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.work-item'),
                    scrub: true
                },
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
     * Displays the Growth Grader results
     */
    function displayResults(businessName, websiteAddress) {
        const resultsContent = select('#results-content');
        
        // Sample report data
        const overallGrade = 'B+';
        const metrics = [
            { name: 'Website Performance', score: 75, feedback: 'Good loading speed, but room for optimization' },
            { name: 'Mobile Responsiveness', score: 90, feedback: 'Excellent mobile experience' },
            { name: 'SEO Optimization', score: 65, feedback: 'Missing key meta tags and structured data' },
            { name: 'Content Quality', score: 85, feedback: 'Strong content, could benefit from more keywords' },
            { name: 'User Experience', score: 80, feedback: 'Clear navigation, consider adding more CTAs' },
            { name: 'Social Media Presence', score: 60, feedback: 'Inconsistent posting schedule detected' },
            { name: 'Local SEO', score: 70, feedback: 'Google My Business needs optimization' },
            { name: 'Conversion Optimization', score: 55, feedback: 'Missing clear conversion paths' }
        ];

        const recommendations = [
            {
                priority: 'High',
                title: 'Improve Page Load Speed',
                description: 'Optimize images and implement lazy loading to improve your site speed by 40%'
            },
            {
                priority: 'High',
                title: 'Add Schema Markup',
                description: 'Implement structured data to improve search visibility and rich snippets'
            },
            {
                priority: 'Medium',
                title: 'Create Content Calendar',
                description: 'Develop a consistent posting schedule for social media engagement'
            },
            {
                priority: 'Medium',
                title: 'Optimize Conversion Paths',
                description: 'Add clear CTAs and simplify your contact forms to increase conversions'
            }
        ];

        // Generate HTML
        resultsContent.innerHTML = `
            <div class="bg-bg-alt rounded-lg p-8 md:p-12 shadow-xl mb-12">
                <h2 class="text-3xl font-bold text-center mb-8">Growth Grade Report for ${businessName}</h2>
                
                <!-- Overall Grade -->
                <div class="text-center mb-12">
                    <div class="grade-circle">${overallGrade}</div>
                    <p class="text-xl text-text-muted">Your Overall Growth Grade</p>
                    <p class="text-sm text-text-muted mt-2">Analyzed: ${websiteAddress}</p>
                </div>

                <!-- Metrics -->
                <div class="mb-12">
                    <h3 class="text-2xl font-bold mb-6">Performance Metrics</h3>
                    <div class="space-y-6">
                        ${metrics.map(metric => `
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-medium">${metric.name}</span>
                                    <span class="text-sm font-bold">${metric.score}%</span>
                                </div>
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${metric.score}%"></div>
                                </div>
                                <p class="text-sm text-text-muted mt-2">${metric.feedback}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Recommendations -->
                <div>
                    <h3 class="text-2xl font-bold mb-6">Recommended Actions</h3>
                    <div class="space-y-4">
                        ${recommendations.map(rec => `
                            <div class="recommendation-item">
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

            <!-- CTA Section -->
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">Ready to Improve Your Grade?</h3>
                <p class="text-text-muted mb-8">Let our experts help you implement these improvements and achieve sustainable growth.</p>
                <a href="/contact.html" class="inline-block px-10 py-4 rounded-md font-semibold cta-button text-lg">
                    Schedule Your Free Consultation
                </a>
            </div>
        `;

        // Animate metric bars after a short delay
        setTimeout(() => {
            selectAll('.metric-fill').forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = metrics[index].score + '%';
                }, index * 100);
            });
        }, 100);
    }
});