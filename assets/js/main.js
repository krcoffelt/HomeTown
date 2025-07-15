/* =====================================================
Hometown Marketing Agency - Main JavaScript File
=====================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    // --- Check if GSAP and ScrollTrigger exist before using them ---
    if (typeof gsap !== 'undefined') {
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
    initGrowthGrader(); // Initialize the new analyzer tool
    
    // --- CORE LOGIC ---

    /**
     * Animates the hero text on initial page load.
     */
    function initPageLoadAnimation() {
        if (select(".split-child")) {
            let tl = gsap.timeline();
            tl.from(".split-child", { 
                yPercent: 100, 
                stagger: 0.1, 
                duration: 0.8, 
                ease: "power3.out" 
            });
        }
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
        
        if(select('#year')) {
            select('#year').textContent = new Date().getFullYear();
        }
    }

    /**
     * Initializes GSAP ScrollTrigger animations for elements with the .fade-in class.
     * Also adds a parallax effect to images within .work-item containers.
     */
    function initScrollTriggers() {
        if (typeof gsap === 'undefined') {
            console.warn("GSAP not loaded, skipping scroll animations.");
            return;
        }

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
     * Initializes the Growth Grader functionality on the analyzer page.
     */
    function initGrowthGrader() {
        const analyzeButton = select('#analyze-button');
        const resultsDiv = select('#results-area');

        if (!analyzeButton || !resultsDiv) {
            // Do nothing if we're not on the analyzer page
            return;
        }

        analyzeButton.addEventListener('click', function() {
            // 1. Show a loading message
            resultsDiv.innerHTML = `<p class="text-center text-text-muted">Analyzing your digital presence...</p>`;
            
            // 2. Wait for 2 seconds, then show the example report
            setTimeout(() => {
                const exampleReportHTML = `
                    <div class="results-card fade-in">
                        <h3 class="text-2xl font-bold mb-4">Digital Growth Grade for: <span class="gradient-text">${select('#business-name').value || 'Your Business'}</span></h3>
                        <div class="text-center border-y border-border-color py-6 my-6">
                            <p class="text-text-muted text-sm uppercase tracking-widest">Overall Score</p>
                            <p class="text-7xl font-bold">68<span class="text-3xl text-text-muted">/100</span></p>
                            <p class="font-semibold text-orange-600 mt-2">Improvement Needed</p>
                        </div>
                        <div class="space-y-6">
                            <div>
                                <h4 class="font-bold text-lg">Local SEO: <span class="text-red-600">D+</span></h4>
                                <p class="text-text-muted">Your business is not visible for critical Kansas City search terms. Customers using Google Maps are likely finding your competitors first.</p>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg">Social Media Presence: <span class="text-orange-500">C</span></h4>
                                <p class="text-text-muted">Your social media activity is inconsistent. You are missing key opportunities to engage with the KC community during major events like Chiefs game days.</p>
                            </div>
                            <div>
                                <h4 class="font-bold text-lg">Website Conversion: <span class="text-yellow-500">B-</span></h4>
                                <p class="text-text-muted">Your website lacks a clear, compelling call-to-action on the homepage, causing potential customers to leave without contacting you.</p>
                            </div>
                        </div>
                        <div class="mt-8 pt-6 border-t border-border-color text-center">
                            <h4 class="text-xl font-bold">Ready to turn this grade into an A+?</h4>
                            <p class="text-text-muted my-4">A score of 68 means your business has significant growth potential. HomeTown specializes in turning these problems into profits.</p>
                            <a href="/contact.html" class="inline-block px-10 py-4 rounded-md font-semibold cta-button text-lg">
                                Schedule Your Free Consultation
                            </a>
                        </div>
                    </div>
                `;
                resultsDiv.innerHTML = exampleReportHTML;
            }, 2000); // 2000 milliseconds = 2 seconds
        });
    }
});
