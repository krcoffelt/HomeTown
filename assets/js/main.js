document.addEventListener('DOMContentLoaded', function() {
    // --- UTILITY FUNCTIONS ---
    const select = (e) => document.querySelector(e);
    const selectAll = (e) => document.querySelectorAll(e);

    // --- INITIALIZATION ---
    initMobileMenu();
    initFaqAccordion();
    initGrowthGrader();
    initServiceWorker();
    initFormSecurity();
    initScrollAnimations();
    initMicroInteractions();
    initPortfolioFilter();
    initSmoothScrolling();
    initParallaxEffects();
    initLoadingAnimations();
    initMultiStepForm();
    initChatWidget();
    initPricingCalculator();
    initTestimonialCarousel();

    // --- CORE LOGIC ---

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
     * Enhanced Growth Grader tool with real-time validation
     */
    function initGrowthGrader() {
        const form = select('#growth-grader-form');
        const analyzerForm = select('#analyzer-form');
        const resultsArea = select('#results-area');
        const loadingState = select('#loading-state');
        const resultsContent = select('#results-content');

        if (!form) return; // Exit if not on the analyzer page

        // Initialize real-time validation
        initRealTimeValidation();
        
        // Initialize domain analysis
        initDomainAnalysis();

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const businessName = select('#business-name').value;
            const websiteAddress = select('#website-address').value;

            // Validate before submission
            if (!validateForm()) return;

            // Hide form and show results area
            analyzerForm.style.display = 'none';
            resultsArea.classList.remove('hidden');

            // Show loading state with progress
            showProgressiveLoading();

            // Simulate comprehensive analysis
            setTimeout(() => {
                // Generate and display enhanced results
                displayEnhancedResults(businessName, websiteAddress);
            }, 3000);
        });
    }

    /**
     * Real-time form validation
     */
    function initRealTimeValidation() {
        const businessNameInput = select('#business-name');
        const websiteInput = select('#website-address');
        const submitButton = select('#analyze-button');

        if (!businessNameInput || !websiteInput) return;

        // Business name validation
        businessNameInput.addEventListener('input', function() {
            validateBusinessName(this);
            updateSubmitButton();
        });

        businessNameInput.addEventListener('blur', function() {
            validateBusinessName(this, true);
        });

        // Website URL validation
        websiteInput.addEventListener('input', function() {
            validateWebsiteURL(this);
            updateSubmitButton();
        });

        websiteInput.addEventListener('blur', function() {
            validateWebsiteURL(this, true);
        });

        function validateBusinessName(input, showErrors = false) {
            const value = input.value.trim();
            const isValid = value.length >= 2 && value.length <= 100;
            
            updateFieldValidation(input, isValid, showErrors ? 'Business name must be 2-100 characters' : '');
            return isValid;
        }

        function validateWebsiteURL(input, showErrors = false) {
            const value = input.value.trim();
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            const isValid = urlPattern.test(value);
            
            // Auto-add https:// if missing
            if (value && !value.startsWith('http')) {
                input.value = 'https://' + value;
            }
            
            updateFieldValidation(input, isValid, showErrors ? 'Please enter a valid website URL' : '');
            return isValid;
        }

        function updateFieldValidation(input, isValid, errorMessage) {
            const formGroup = input.closest('.form-group') || input.parentElement;
            
            // Remove existing validation classes
            formGroup.classList.remove('valid', 'invalid');
            
            // Remove existing error message
            const existingError = formGroup.querySelector('.error-message');
            if (existingError) existingError.remove();
            
            if (input.value.trim()) {
                formGroup.classList.add(isValid ? 'valid' : 'invalid');
                
                if (!isValid && errorMessage) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message text-sm text-red-600 mt-1';
                    errorDiv.textContent = errorMessage;
                    formGroup.appendChild(errorDiv);
                }
            }
        }

        function updateSubmitButton() {
            const businessValid = validateBusinessName(businessNameInput);
            const websiteValid = validateWebsiteURL(websiteInput);
            const isFormValid = businessValid && websiteValid;
            
            submitButton.disabled = !isFormValid;
            submitButton.classList.toggle('opacity-50', !isFormValid);
            submitButton.classList.toggle('cursor-not-allowed', !isFormValid);
        }

        // Initial validation state
        updateSubmitButton();
    }

    /**
     * Domain analysis and suggestions
     */
    function initDomainAnalysis() {
        const websiteInput = select('#website-address');
        if (!websiteInput) return;

        let analysisTimeout;
        
        websiteInput.addEventListener('input', function() {
            clearTimeout(analysisTimeout);
            const url = this.value.trim();
            
            if (url) {
                analysisTimeout = setTimeout(() => {
                    performDomainAnalysis(url);
                }, 1000);
            }
        });
    }

    /**
     * Perform basic domain analysis
     */
    function performDomainAnalysis(url) {
        try {
            const domain = new URL(url.startsWith('http') ? url : 'https://' + url).hostname;
            
            // Show domain analysis feedback
            showDomainFeedback(domain);
            
        } catch (error) {
            // Invalid URL format
        }
    }

    /**
     * Show domain analysis feedback
     */
    function showDomainFeedback(domain) {
        const websiteInput = select('#website-address');
        const formGroup = websiteInput.closest('.form-group') || websiteInput.parentElement;
        
        // Remove existing feedback
        const existingFeedback = formGroup.querySelector('.domain-feedback');
        if (existingFeedback) existingFeedback.remove();
        
        const feedback = document.createElement('div');
        feedback.className = 'domain-feedback text-sm text-blue-600 mt-1';
        
        // Simple domain analysis
        const suggestions = [];
        if (domain.length > 15) suggestions.push('Consider a shorter domain name');
        if (!domain.includes('.com') && !domain.includes('.org')) suggestions.push('Consider a .com domain');
        if (domain.includes('-')) suggestions.push('Hyphens in domains can affect memorability');
        
        if (suggestions.length > 0) {
            feedback.innerHTML = `<strong>Domain Tips:</strong> ${suggestions.join(', ')}`;
        } else {
            feedback.innerHTML = `<strong>✓</strong> Great domain choice!`;
            feedback.className = 'domain-feedback text-sm text-green-600 mt-1';
        }
        
        formGroup.appendChild(feedback);
    }

    /**
     * Validate form before submission
     */
    function validateForm() {
        const businessName = select('#business-name').value.trim();
        const websiteAddress = select('#website-address').value.trim();
        
        if (!businessName || businessName.length < 2) {
            showFormError('Please enter a valid business name');
            return false;
        }
        
        if (!websiteAddress) {
            showFormError('Please enter your website URL');
            return false;
        }
        
        return true;
    }

    /**
     * Show form error message
     */
    function showFormError(message) {
        const form = select('#growth-grader-form');
        let errorDiv = form.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4';
            form.insertBefore(errorDiv, form.firstChild);
        }
        
        errorDiv.textContent = message;
        setTimeout(() => errorDiv.remove(), 5000);
    }

    /**
     * Progressive loading with stages
     */
    function showProgressiveLoading() {
        const loadingState = select('#loading-state');
        const resultsContent = select('#results-content');
        
        loadingState.classList.remove('hidden');
        resultsContent.classList.add('hidden');
        
        const stages = [
            'Analyzing website structure...',
            'Checking performance metrics...',
            'Evaluating SEO factors...',
            'Assessing user experience...',
            'Generating recommendations...',
            'Finalizing your report...'
        ];
        
        let currentStage = 0;
        const stageElement = document.createElement('p');
        stageElement.className = 'text-sm text-gray-600 mt-2';
        loadingState.appendChild(stageElement);
        
        const updateStage = () => {
            if (currentStage < stages.length) {
                stageElement.textContent = stages[currentStage];
                currentStage++;
                setTimeout(updateStage, 500);
            } else {
                loadingState.classList.add('hidden');
                resultsContent.classList.remove('hidden');
            }
        };
        
        updateStage();
    }

    /**
     * Enhanced Growth Grader results with interactive elements
     */
    function displayEnhancedResults(businessName, websiteAddress) {
        const resultsContent = select('#results-content');

        // Enhanced report data with more detailed analysis
        const overallGrade = calculateOverallGrade();
        const metrics = [
            {
                name: 'Website Performance',
                score: 75,
                feedback: 'Good loading speed, but room for optimization',
                category: 'technical',
                priority: 'high',
                impact: 'High impact on user experience and SEO'
            },
            {
                name: 'Mobile Responsiveness',
                score: 90,
                feedback: 'Excellent mobile experience',
                category: 'technical',
                priority: 'medium',
                impact: 'Critical for mobile users'
            },
            {
                name: 'SEO Optimization',
                score: 65,
                feedback: 'Missing key meta tags and structured data',
                category: 'marketing',
                priority: 'high',
                impact: 'Directly affects search rankings'
            },
            {
                name: 'Content Quality',
                score: 85,
                feedback: 'Strong content, could benefit from more keywords',
                category: 'content',
                priority: 'medium',
                impact: 'Improves engagement and conversions'
            },
            {
                name: 'User Experience',
                score: 80,
                feedback: 'Clear navigation, consider adding more CTAs',
                category: 'design',
                priority: 'high',
                impact: 'Critical for conversion rates'
            },
            {
                name: 'Social Media Presence',
                score: 60,
                feedback: 'Inconsistent posting schedule detected',
                category: 'marketing',
                priority: 'medium',
                impact: 'Affects brand awareness and engagement'
            },
            {
                name: 'Local SEO',
                score: 70,
                feedback: 'Google My Business needs optimization',
                category: 'marketing',
                priority: 'high',
                impact: 'Essential for local visibility'
            },
            {
                name: 'Conversion Optimization',
                score: 55,
                feedback: 'Missing clear conversion paths',
                category: 'marketing',
                priority: 'high',
                impact: 'Directly affects revenue generation'
            }
        ];

        function calculateOverallGrade() {
            const avgScore = metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length;
            if (avgScore >= 90) return 'A+';
            if (avgScore >= 85) return 'A';
            if (avgScore >= 80) return 'A-';
            if (avgScore >= 75) return 'B+';
            if (avgScore >= 70) return 'B';
            if (avgScore >= 65) return 'B-';
            if (avgScore >= 60) return 'C+';
            return 'C';
        }

        const recommendations = [
            {
                priority: 'High',
                title: 'Improve Page Load Speed',
                description: 'Optimize images and implement lazy loading to improve your site speed by 40%',
                estimatedImpact: '+25% user retention',
                timeframe: '1-2 weeks',
                difficulty: 'Medium'
            },
            {
                priority: 'High',
                title: 'Add Schema Markup',
                description: 'Implement structured data to improve search visibility and rich snippets',
                estimatedImpact: '+15% click-through rate',
                timeframe: '3-5 days',
                difficulty: 'Easy'
            },
            {
                priority: 'High',
                title: 'Optimize Conversion Paths',
                description: 'Add clear CTAs and simplify your contact forms to increase conversions',
                estimatedImpact: '+30% conversion rate',
                timeframe: '1-2 weeks',
                difficulty: 'Medium'
            },
            {
                priority: 'Medium',
                title: 'Enhance Local SEO',
                description: 'Optimize Google My Business and implement local schema markup',
                estimatedImpact: '+40% local visibility',
                timeframe: '1 week',
                difficulty: 'Easy'
            },
            {
                priority: 'Medium',
                title: 'Create Content Calendar',
                description: 'Develop a consistent posting schedule for social media engagement',
                estimatedImpact: '+20% social engagement',
                timeframe: '2-3 weeks',
                difficulty: 'Medium'
            }
        ];

        // Generate enhanced HTML with interactive elements
        resultsContent.innerHTML = `
            <div class="bg-bg-alt rounded-lg p-8 md:p-12 shadow-xl mb-12 fade-in-up">
                <h2 class="text-3xl font-bold text-center mb-8">Growth Grade Report for ${businessName}</h2>
                
                <div class="text-center mb-12">
                    <div class="grade-circle">${overallGrade}</div>
                    <p class="text-xl text-text-muted">Your Overall Growth Grade</p>
                    <p class="text-sm text-text-muted mt-2">Analyzed: ${websiteAddress}</p>
                </div>

                <!-- Interactive Metrics Dashboard -->
                <div class="mb-12">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold">Performance Metrics</h3>
                        <div class="flex space-x-2">
                            <button class="metric-filter active px-3 py-1 text-sm rounded-full bg-accent-start text-white" data-filter="all">All</button>
                            <button class="metric-filter px-3 py-1 text-sm rounded-full bg-gray-200" data-filter="high">High Priority</button>
                            <button class="metric-filter px-3 py-1 text-sm rounded-full bg-gray-200" data-filter="low">Needs Work</button>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6" id="metrics-grid">
                        ${metrics.map((metric, index) => `
                            <div class="metric-card p-4 bg-white rounded-lg border hover-lift stagger-item" data-priority="${metric.priority}" data-score="${metric.score}">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 class="font-semibold text-lg">${metric.name}</h4>
                                        <span class="text-xs px-2 py-1 rounded-full ${
                                            metric.category === 'technical' ? 'bg-blue-100 text-blue-700' :
                                            metric.category === 'marketing' ? 'bg-green-100 text-green-700' :
                                            metric.category === 'design' ? 'bg-purple-100 text-purple-700' :
                                            'bg-orange-100 text-orange-700'
                                        }">${metric.category}</span>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-bold ${
                                            metric.score >= 80 ? 'text-green-600' :
                                            metric.score >= 60 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }">${metric.score}%</div>
                                        <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div class="metric-fill h-full ${
                                                metric.score >= 80 ? 'bg-green-500' :
                                                metric.score >= 60 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }" style="width: 0%; transition: width 1s ease ${index * 0.2}s;"></div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 mb-2">${metric.feedback}</p>
                                <p class="text-xs text-gray-500">${metric.impact}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Enhanced Recommendations -->
                <div class="mb-12">
                    <h3 class="text-2xl font-bold mb-6">Action Plan</h3>
                    <div class="space-y-4">
                        ${recommendations.map((rec, index) => `
                            <div class="recommendation-card p-6 bg-white rounded-lg border-l-4 ${
                                rec.priority === 'High' ? 'border-red-500' : 'border-yellow-500'
                            } hover-lift cursor-pointer" onclick="toggleRecommendation(${index})">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex-1">
                                        <div class="flex items-center mb-2">
                                            <h4 class="font-bold text-lg mr-3">${rec.title}</h4>
                                            <span class="text-xs px-3 py-1 rounded-full ${
                                                rec.priority === 'High' 
                                                    ? 'bg-red-100 text-red-700' 
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }">${rec.priority}</span>
                                        </div>
                                        <p class="text-gray-600 mb-3">${rec.description}</p>
                                    </div>
                                    <div class="text-right ml-4">
                                        <div class="text-sm font-semibold text-green-600">${rec.estimatedImpact}</div>
                                        <div class="text-xs text-gray-500">${rec.timeframe}</div>
                                    </div>
                                </div>
                                
                                <div class="recommendation-details hidden">
                                    <div class="pt-4 border-t border-gray-100">
                                        <div class="grid md:grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <span class="font-medium text-gray-700">Difficulty:</span>
                                                <span class="ml-2 px-2 py-1 rounded text-xs ${
                                                    rec.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                    rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }">${rec.difficulty}</span>
                                            </div>
                                            <div>
                                                <span class="font-medium text-gray-700">Timeline:</span>
                                                <span class="ml-2">${rec.timeframe}</span>
                                            </div>
                                            <div>
                                                <span class="font-medium text-gray-700">Expected Impact:</span>
                                                <span class="ml-2 text-green-600">${rec.estimatedImpact}</span>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <button class="px-4 py-2 bg-accent-start text-white rounded hover:bg-accent-end transition-colors text-sm">
                                                Get Help With This
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">Ready to Improve Your Grade?</h3>
                <p class="text-text-muted mb-8">Let our experts help you implement these improvements and achieve sustainable growth.</p>
                <a href="/contact.html" class="inline-block px-10 py-4 rounded-md font-semibold cta-button text-lg">
                    Schedule Your Free Consultation
                </a>
            </div>
        `;
        
        // Initialize interactive elements
        setTimeout(() => {
            initMetricFilters();
            animateMetricBars();
            initRecommendationToggles();
        }, 100);
    }

    /**
     * Initialize metric filtering functionality
     */
    function initMetricFilters() {
        const filterButtons = selectAll('.metric-filter');
        const metricCards = selectAll('.metric-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-accent-start', 'text-white');
                    btn.classList.add('bg-gray-200');
                });
                this.classList.add('active', 'bg-accent-start', 'text-white');
                this.classList.remove('bg-gray-200');
                
                // Filter metric cards
                metricCards.forEach(card => {
                    const priority = card.getAttribute('data-priority');
                    const score = parseInt(card.getAttribute('data-score'));
                    let shouldShow = false;
                    
                    if (filter === 'all') {
                        shouldShow = true;
                    } else if (filter === 'high' && priority === 'high') {
                        shouldShow = true;
                    } else if (filter === 'low' && score < 70) {
                        shouldShow = true;
                    }
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                    } else {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    /**
     * Animate metric bars with staggered timing
     */
    function animateMetricBars() {
        selectAll('.metric-fill').forEach((bar, index) => {
            setTimeout(() => {
                const card = bar.closest('.metric-card');
                const score = card.getAttribute('data-score');
                bar.style.width = score + '%';
            }, index * 200);
        });
    }

    /**
     * Initialize recommendation card toggles
     */
    function initRecommendationToggles() {
        // Make toggleRecommendation function globally available
        window.toggleRecommendation = function(index) {
            const cards = selectAll('.recommendation-card');
            const card = cards[index];
            const details = card.querySelector('.recommendation-details');
            
            if (details.classList.contains('hidden')) {
                details.classList.remove('hidden');
                details.style.maxHeight = details.scrollHeight + 'px';
            } else {
                details.classList.add('hidden');
                details.style.maxHeight = '0';
            }
        };
    }

    /**
     * Registers the service worker for caching
     */
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful: ', registration.scope);
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    }

    /**
     * Initializes form security features
     */
    function initFormSecurity() {
        // Generate and set CSRF token
        generateCSRFToken();
        
        // Initialize rate limiting
        initRateLimiting();
        
        // Add input sanitization
        addInputSanitization();
    }

    /**
     * Generates a CSRF token for form submission
     */
    function generateCSRFToken() {
        const csrfTokenField = select('#csrf-token');
        if (csrfTokenField) {
            // Generate a random token
            const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            
            csrfTokenField.value = token;
            sessionStorage.setItem('csrf_token', token);
        }
    }

    /**
     * Implements rate limiting for form submissions
     */
    function initRateLimiting() {
        const form = select('#growth-grader-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            if (!checkRateLimit()) {
                e.preventDefault();
                showRateLimitError();
                return false;
            }
        });
    }

    /**
     * Checks if user has exceeded rate limit
     */
    function checkRateLimit() {
        const now = Date.now();
        const hour = 60 * 60 * 1000; // 1 hour in milliseconds
        const maxAttempts = 3;

        // Get submission history from localStorage
        let submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
        
        // Remove submissions older than 1 hour
        submissions = submissions.filter(timestamp => now - timestamp < hour);
        
        // Check if under rate limit
        if (submissions.length >= maxAttempts) {
            return false;
        }

        // Record this submission
        submissions.push(now);
        localStorage.setItem('form_submissions', JSON.stringify(submissions));
        
        return true;
    }

    /**
     * Shows rate limit error message
     */
    function showRateLimitError() {
        const button = select('#analyze-button');
        const originalText = button.textContent;
        
        button.textContent = 'Rate limit exceeded - Try again in 1 hour';
        button.disabled = true;
        button.classList.add('opacity-50', 'cursor-not-allowed');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 5000);
    }

    /**
     * Adds input sanitization to prevent XSS
     */
    function addInputSanitization() {
        const inputs = selectAll('input[type="text"], input[type="url"], textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', function(e) {
                // Basic XSS prevention - remove script tags and common attack vectors
                let value = e.target.value;
                value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                value = value.replace(/javascript:/gi, '');
                value = value.replace(/on\w+=/gi, '');
                
                if (value !== e.target.value) {
                    e.target.value = value;
                }
            });
        });
    }

    /**
     * Initializes scroll-triggered animations using Intersection Observer
     */
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: just show all elements
            selectAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .slide-in-bottom, .stagger-item').forEach(el => {
                el.classList.add('animate');
            });
            return;
        }

        // Create intersection observer with options
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Handle staggered animations
                    if (element.classList.contains('stagger-container')) {
                        const items = element.querySelectorAll('.stagger-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 100); // 100ms delay between items
                        });
                    } else {
                        // Regular animation
                        element.classList.add('animate');
                        
                        // Handle counter animations
                        if (element.classList.contains('counter')) {
                            animateCounter(element);
                        }
                    }
                    
                    // Stop observing this element
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe all animation elements
        const animationElements = selectAll(`
            .fade-in-up:not(.animate),
            .fade-in-left:not(.animate),
            .fade-in-right:not(.animate),
            .scale-in:not(.animate),
            .slide-in-bottom:not(.animate),
            .stagger-container,
            .counter:not(.animate)
        `);

        animationElements.forEach(el => observer.observe(el));
    }

    /**
     * Animates a counter element from 0 to its target value
     */
    function animateCounter(element) {
        const originalText = element.textContent;
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 1500; // 1.5 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        // Determine suffix (%, +, etc.)
        const suffix = originalText.includes('%') ? '%' : 
                      originalText.includes('+') ? '+' : 
                      originalText.includes('Years') ? ' Years' : '';
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        element.classList.add('animate');
        updateCounter();
    }

    /**
     * Initializes micro-interactions for buttons and form elements
     */
    function initMicroInteractions() {
        // Button ripple effects
        initButtonRipples();
        
        // Magnetic button effects
        initMagneticButtons();
        
        // Form interactions
        initFormInteractions();
        
        // Loading button states
        initLoadingButtons();
    }

    /**
     * Adds ripple effect to CTA buttons
     */
    function initButtonRipples() {
        const buttons = selectAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                button.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    /**
     * Adds magnetic effect to buttons
     */
    function initMagneticButtons() {
        const magneticButtons = selectAll('.magnetic-button, .cta-button');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Limit the magnetic effect strength
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Enhanced form interactions
     */
    function initFormInteractions() {
        const inputs = selectAll('input[type="text"], input[type="email"], input[type="url"], textarea');
        
        inputs.forEach(input => {
            // Add focus/blur animations
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value === '') {
                    this.parentElement.classList.remove('filled');
                } else {
                    this.parentElement.classList.add('filled');
                }
            });
            
            // Real-time validation visual feedback
            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
    }

    /**
     * Loading button states for form submissions
     */
    function initLoadingButtons() {
        const forms = selectAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                if (submitButton) {
                    submitButton.classList.add('button-loading');
                    submitButton.disabled = true;
                    
                    // Reset after 3 seconds (adjust based on actual form processing time)
                    setTimeout(() => {
                        submitButton.classList.remove('button-loading');
                        submitButton.disabled = false;
                    }, 3000);
                }
            });
        });
    }

    /**
     * Interactive portfolio filtering system
     */
    function initPortfolioFilter() {
        const filterButtons = selectAll('.filter-btn');
        const portfolioItems = selectAll('.portfolio-item');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;
        
        // Update filter counts
        updateFilterCounts();
        
        // Add click event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const filter = this.getAttribute('data-filter');
                const currentActive = select('.filter-btn.active');
                
                // Don't do anything if clicking the same filter
                if (currentActive === this) return;
                
                // Update active state
                if (currentActive) currentActive.classList.remove('active');
                this.classList.add('active');
                
                // Update ARIA states
                filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
                this.setAttribute('aria-pressed', 'true');
                
                // Filter portfolio items
                filterPortfolioItems(filter);
                
                // Add loading effect
                showFilterLoading();
            });
        });
        
        // Initialize with 'all' filter
        filterPortfolioItems('all');
    }

    /**
     * Filter portfolio items based on category
     */
    function filterPortfolioItems(filter) {
        const portfolioItems = selectAll('.portfolio-item');
        
        portfolioItems.forEach((item, index) => {
            const categories = item.getAttribute('data-category') || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            // Add staggered animation delay
            setTimeout(() => {
                if (shouldShow) {
                    item.classList.remove('hidden', 'filtered-out');
                    item.style.display = 'block';
                    
                    // Trigger animation
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.classList.add('filtered-out');
                    
                    // Hide after animation
                    setTimeout(() => {
                        if (item.classList.contains('filtered-out')) {
                            item.classList.add('hidden');
                        }
                    }, 300);
                }
            }, index * 50); // 50ms stagger delay
        });
        
        // Update results count
        updateResultsCount(filter);
    }

    /**
     * Update filter button counts
     */
    function updateFilterCounts() {
        const filterButtons = selectAll('.filter-btn');
        const portfolioItems = selectAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            const filter = button.getAttribute('data-filter');
            let count;
            
            if (filter === 'all') {
                count = portfolioItems.length;
            } else {
                count = selectAll(`.portfolio-item[data-category*="${filter}"]`).length;
            }
            
            // Add count badge if it doesn't exist
            let countBadge = button.querySelector('.filter-count');
            if (!countBadge) {
                countBadge = document.createElement('span');
                countBadge.classList.add('filter-count');
                button.appendChild(countBadge);
            }
            
            countBadge.textContent = count;
        });
    }

    /**
     * Update visible results count
     */
    function updateResultsCount(filter) {
        const resultsCounter = select('.results-count');
        if (resultsCounter) {
            const visibleItems = selectAll('.portfolio-item:not(.hidden)').length;
            resultsCounter.textContent = `Showing ${visibleItems} project${visibleItems !== 1 ? 's' : ''}`;
        }
    }

    /**
     * Show loading effect during filtering
     */
    function showFilterLoading() {
        const portfolioGrid = select('.portfolio-grid, .grid');
        if (portfolioGrid) {
            portfolioGrid.style.opacity = '0.7';
            portfolioGrid.style.pointerEvents = 'none';
            
            setTimeout(() => {
                portfolioGrid.style.opacity = '1';
                portfolioGrid.style.pointerEvents = 'auto';
            }, 400);
        }
    }

    /**
     * Smooth scrolling navigation with active states
     */
    function initSmoothScrolling() {
        // Initialize scroll progress indicator
        initScrollProgress();
        
        // Initialize scroll to top button
        initScrollToTop();
        
        // Initialize navigation active states
        initNavigationStates();
        
        // Initialize header scroll effects
        initHeaderScrollEffects();
        
        // Initialize smooth scroll for anchor links
        initSmoothScrollLinks();
    }

    /**
     * Scroll progress indicator
     */
    function initScrollProgress() {
        const progressBar = select('#scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }

    /**
     * Scroll to top button functionality
     */
    function initScrollToTop() {
        const scrollToTopBtn = select('#scroll-to-top');
        if (!scrollToTopBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Navigation active states based on scroll position
     */
    function initNavigationStates() {
        const navLinks = selectAll('.nav-link[href^="#"], .nav-link[href*=".html"]');
        const sections = selectAll('section[id], main section');
        
        if (navLinks.length === 0) return;

        // Update active nav link based on current page
        const currentPage = window.location.pathname;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '/' && href === '/index.html') ||
                (currentPage.includes(href.replace('/', '')))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // For single page sections (if any anchor links exist)
        if (sections.length > 0) {
            const observerOptions = {
                threshold: 0.3,
                rootMargin: '-100px 0px -50% 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        const correspondingLink = select(`a[href="#${sectionId}"]`);
                        
                        // Remove active class from all nav links
                        navLinks.forEach(link => link.classList.remove('active'));
                        
                        // Add active class to current section's link
                        if (correspondingLink) {
                            correspondingLink.classList.add('active');
                        }
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                if (section.id) observer.observe(section);
            });
        }
    }

    /**
     * Header scroll effects
     */
    function initHeaderScrollEffects() {
        const header = select('#header, header');
        if (!header) return;

        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScrollLinks() {
        const anchorLinks = selectAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = select(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = select('#header, header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Parallax effects for hero sections
     */
    function initParallaxEffects() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const parallaxElements = selectAll('.parallax-element');
        const shapeDecorations = selectAll('.shape-decoration');
        const heroParallax = selectAll('.hero-parallax::before');
        
        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Update parallax elements
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                
                // Only apply parallax if element is in viewport
                if (rect.bottom >= 0 && rect.top <= windowHeight) {
                    const elementTop = rect.top + scrollY;
                    const elementMiddle = elementTop + rect.height / 2;
                    const depthOffset = (scrollY - elementMiddle) * speed;
                    
                    element.style.transform = `translateY(${depthOffset}px)`;
                }
            });

            // Animate decorative shapes
            shapeDecorations.forEach((shape, index) => {
                const speed = 0.2 + (index * 0.1); // Different speeds for each shape
                const moveY = scrollY * speed;
                const moveX = Math.sin(scrollY * 0.001 + index) * 10;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Use passive event listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initialize parallax on page load
        updateParallax();
    }

    /**
     * Loading animations and skeleton screens
     */
    function initLoadingAnimations() {
        // Initialize progressive image loading
        initProgressiveImages();
        
        // Initialize skeleton screen replacement
        initSkeletonScreens();
        
        // Initialize page loading overlay
        initPageLoading();
        
        // Initialize lazy loading for better performance
        initLazyLoading();
    }

    /**
     * Progressive image loading with fallbacks
     */
    function initProgressiveImages() {
        const images = selectAll('img[data-src], img[loading="lazy"]');
        
        images.forEach(img => {
            // Create intersection observer for lazy loading
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const src = image.getAttribute('data-src') || image.src;
                        
                        // Create new image to preload
                        const newImg = new Image();
                        newImg.onload = () => {
                            image.src = src;
                            image.classList.add('loaded');
                            image.removeAttribute('data-src');
                        };
                        newImg.src = src;
                        
                        observer.unobserve(image);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(img);
        });
    }

    /**
     * Replace skeleton screens with actual content
     */
    function initSkeletonScreens() {
        const skeletons = selectAll('.skeleton, .skeleton-card');
        
        // Simulate content loading (replace with actual data loading)
        setTimeout(() => {
            skeletons.forEach((skeleton, index) => {
                setTimeout(() => {
                    skeleton.classList.add('fade-out');
                    
                    // Remove skeleton after fade out
                    setTimeout(() => {
                        skeleton.style.display = 'none';
                    }, 300);
                }, index * 100); // Stagger the removal
            });
        }, 1000);
    }

    /**
     * Page loading overlay
     */
    function initPageLoading() {
        // Show loading overlay on page load
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner spinner-large"></div>
                <p class="loading-dots">Loading</p>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Hide loading overlay when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.classList.add('fade-out');
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 300);
            }, 500); // Show loading for at least 500ms
        });
    }

    /**
     * Enhanced lazy loading for performance
     */
    function initLazyLoading() {
        // Lazy load sections that are not immediately visible
        const lazySections = selectAll('[data-lazy]');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const content = section.getAttribute('data-lazy');
                    
                    // Simulate loading content
                    section.innerHTML = content;
                    section.classList.add('stagger-load');
                    
                    sectionObserver.unobserve(section);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        
        lazySections.forEach(section => sectionObserver.observe(section));
    }

    /**
     * Show loading state for async operations
     */
    function showLoading(element, text = 'Loading') {
        if (!element) return;
        
        element.classList.add('content-loading');
        
        const spinner = document.createElement('div');
        spinner.className = 'spinner spinner-small';
        spinner.style.margin = '0 auto';
        
        const loadingText = document.createElement('p');
        loadingText.textContent = text;
        loadingText.className = 'loading-dots';
        
        const loadingWrapper = document.createElement('div');
        loadingWrapper.className = 'loading-wrapper';
        loadingWrapper.style.textAlign = 'center';
        loadingWrapper.appendChild(spinner);
        loadingWrapper.appendChild(loadingText);
        
        element.appendChild(loadingWrapper);
    }

    /**
     * Hide loading state
     */
    function hideLoading(element) {
        if (!element) return;
        
        element.classList.remove('content-loading');
        const loadingWrapper = element.querySelector('.loading-wrapper');
        if (loadingWrapper) {
            loadingWrapper.remove();
        }
    }

    // Expose loading functions globally for use in other scripts
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;

    /**
     * Multi-Step Contact Form
     */
    function initMultiStepForm() {
        const form = select('#multi-step-form');
        if (!form) return;

        let currentStep = 1;
        const totalSteps = 4;
        
        const nextBtn = select('#next-btn');
        const prevBtn = select('#prev-btn');
        const submitBtn = select('#submit-btn');
        const progressFill = select('#progress-fill');
        
        const formSteps = selectAll('.form-step');
        const stepIndicators = selectAll('.step-indicator');

        // Form validation rules
        const validationRules = {
            1: [], // No validation for step 1 (project type selection)
            2: ['business_name', 'project_description'],
            3: [], // No validation for step 3 (timeline/budget selection)
            4: ['first_name', 'last_name', 'email']
        };

        /**
         * Update progress indicator and progress bar
         */
        function updateProgress() {
            // Update step indicators
            stepIndicators.forEach((indicator, index) => {
                const stepNumber = index + 1;
                indicator.classList.remove('active', 'completed');
                
                if (stepNumber < currentStep) {
                    indicator.classList.add('completed');
                } else if (stepNumber === currentStep) {
                    indicator.classList.add('active');
                }
            });

            // Update progress bar
            const progressPercentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${progressPercentage}%`;

            // Update button visibility
            prevBtn.classList.toggle('hidden', currentStep === 1);
            nextBtn.classList.toggle('hidden', currentStep === totalSteps);
            submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
        }

        /**
         * Show specific form step with animation
         */
        function showStep(stepNumber) {
            formSteps.forEach((step, index) => {
                const isCurrentStep = (index + 1) === stepNumber;
                step.classList.toggle('active', isCurrentStep);
                
                if (isCurrentStep) {
                    // Add entrance animation
                    step.style.opacity = '0';
                    step.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateX(0)';
                    }, 50);
                }
            });
        }

        /**
         * Validate form inputs for current step
         */
        function validateStep(stepNumber) {
            const requiredFields = validationRules[stepNumber] || [];
            let isValid = true;

            // Clear previous errors
            selectAll('.error-message').forEach(error => {
                error.classList.remove('show');
                error.classList.add('hidden');
            });
            selectAll('.form-input').forEach(input => {
                input.classList.remove('error');
            });

            // Validate required fields
            requiredFields.forEach(fieldName => {
                const field = select(`[name="${fieldName}"]`);
                const errorElement = field?.parentNode?.querySelector('.error-message');
                
                if (!field || !field.value.trim()) {
                    if (field) field.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.classList.remove('hidden');
                        errorElement.classList.add('show');
                    }
                    isValid = false;
                } else if (fieldName === 'email' && !isValidEmail(field.value)) {
                    field.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Please enter a valid email address';
                        errorElement.classList.remove('hidden');
                        errorElement.classList.add('show');
                    }
                    isValid = false;
                }
            });

            // Special validation for step 1 (project type)
            if (stepNumber === 1) {
                const projectTypeSelected = select('input[name="project_type"]:checked');
                if (!projectTypeSelected) {
                    isValid = false;
                    // Could add visual feedback here
                }
            }

            // Special validation for step 3 (timeline and budget)
            if (stepNumber === 3) {
                const timelineSelected = select('input[name="timeline"]:checked');
                const budgetSelected = select('input[name="budget"]:checked');
                if (!timelineSelected || !budgetSelected) {
                    isValid = false;
                    // Could add visual feedback here
                }
            }

            return isValid;
        }

        /**
         * Email validation helper
         */
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Handle form submission
         */
        function handleSubmit(e) {
            e.preventDefault();
            
            if (!validateStep(currentStep)) {
                return;
            }

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Show success message
                showSuccessMessage();
                
                // Reset form after delay
                setTimeout(() => {
                    resetForm();
                }, 3000);
            }, 2000);
        }

        /**
         * Show success message
         */
        function showSuccessMessage() {
            const formContainer = form.parentNode;
            formContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                    <p class="text-text-muted mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button onclick="location.reload()" class="px-8 py-3 bg-gradient-to-r from-accent-start to-accent-end text-white rounded-lg hover:shadow-lg transition-all">
                        Send Another Message
                    </button>
                </div>
            `;
        }

        /**
         * Reset form to initial state
         */
        function resetForm() {
            currentStep = 1;
            form.reset();
            updateProgress();
            showStep(currentStep);
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }

        /**
         * Next button handler
         */
        function handleNext() {
            if (validateStep(currentStep) && currentStep < totalSteps) {
                currentStep++;
                updateProgress();
                showStep(currentStep);
            }
        }

        /**
         * Previous button handler
         */
        function handlePrev() {
            if (currentStep > 1) {
                currentStep--;
                updateProgress();
                showStep(currentStep);
            }
        }

        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', handleNext);
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        if (form) form.addEventListener('submit', handleSubmit);

        // Initialize card selection handlers
        selectAll('.project-type-card, .timeline-option, .budget-option').forEach(card => {
            card.addEventListener('click', function() {
                const radio = this.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    
                    // Remove selection from siblings
                    const siblings = this.parentNode.querySelectorAll('.project-type-card, .timeline-option, .budget-option');
                    siblings.forEach(sibling => {
                        sibling.classList.remove('selected');
                    });
                    
                    // Add selection to current card
                    this.classList.add('selected');
                }
            });
        });

        // Real-time validation for text inputs
        selectAll('.form-input').forEach(input => {
            input.addEventListener('input', function() {
                // Clear error state on input
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.classList.remove('show');
                    errorElement.classList.add('hidden');
                }
            });

            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentNode.classList.remove('focused');
            });
        });

        // Initialize first step
        updateProgress();
        showStep(currentStep);
    }

    // Expose the multi-step form init function globally
    window.initMultiStepForm = initMultiStepForm;

    /**
     * Real-time Chat Widget with AI Responses
     */
    function initChatWidget() {
        const chatWidget = select('#chat-widget');
        if (!chatWidget) return;

        const chatToggle = select('#chat-toggle');
        const chatWindow = select('#chat-window');
        const chatMinimize = select('#chat-minimize');
        const chatInput = select('#chat-input');
        const chatSend = select('#chat-send');
        const chatMessages = select('#chat-messages');
        const chatTyping = select('#chat-typing');
        const chatNotification = select('#chat-notification');
        const quickActions = select('#quick-actions');

        let isOpen = false;
        let conversationHistory = [];
        let hasInteracted = false;

        // Pre-defined responses for common queries
        const chatResponses = {
            pricing: {
                message: "Great question! Our pricing varies based on the scope of your project. Here are our general ranges:\n\n💡 **Starter Package:** $2,500 - $5,000\n- Logo design & basic branding\n- Simple website (5-8 pages)\n- Basic SEO setup\n\n🚀 **Professional Package:** $5,000 - $15,000\n- Complete brand identity\n- Custom website with advanced features\n- Content strategy & SEO\n\n⭐ **Premium Package:** $15,000+\n- Full brand development\n- E-commerce or complex web applications\n- Ongoing marketing campaigns\n\nWould you like a custom quote for your specific project?",
                followUp: ["Get Custom Quote", "Schedule Consultation"]
            },
            services: {
                message: "We offer a comprehensive suite of services to help your business grow:\n\n🎨 **Brand Design**\n- Logo design & brand identity\n- Brand guidelines & style systems\n- Print & digital assets\n\n💻 **Web Development**\n- Custom website design\n- E-commerce solutions\n- Web applications & portals\n\n📱 **Digital Marketing**\n- SEO & content strategy\n- Social media management\n- Paid advertising campaigns\n\n📈 **Growth Strategy**\n- Marketing automation\n- Analytics & reporting\n- Conversion optimization\n\nWhich service interests you most?",
                followUp: ["Brand Design", "Web Development", "Digital Marketing"]
            },
            portfolio: {
                message: "I'd love to show you our work! We've helped over 50+ Kansas City businesses achieve their goals.\n\n🏆 **Recent Highlights:**\n- The Roasted Bean Coffee Co. - 200% increase in online orders\n- Westside Yoga Studio - 300% social media growth\n- Plaza Dental - 150% more appointment bookings\n\nOur portfolio showcases projects across various industries including restaurants, healthcare, fitness, retail, and professional services.\n\nWould you like to see examples from a specific industry?",
                followUp: ["View Full Portfolio", "Industry Examples", "Case Studies"]
            },
            contact: {
                message: "I'm excited to help you get started! Here are the best ways to reach us:\n\n📧 **Email:** hello@hometownmarketing.com\n📞 **Phone:** (816) 555-0123\n📍 **Location:** Kansas City, MO\n\n⚡ **Quick Options:**\n- Schedule a free 30-minute consultation\n- Get a project estimate\n- Download our services guide\n\nWhat works best for you?",
                followUp: ["Schedule Call", "Get Estimate", "Email Us"]
            }
        };

        // AI-like responses for general queries
        const generalResponses = [
            "That's a great question! Let me help you with that. Can you provide a bit more detail about what you're looking for?",
            "I'd be happy to assist you! Could you tell me more about your specific needs or goals?",
            "Thanks for reaching out! To give you the most helpful information, could you share more about your project or business?",
            "I'm here to help! What specific aspect of our services are you most interested in learning about?",
            "Great to connect with you! Let me know what questions you have about working with HomeTown Marketing."
        ];

        /**
         * Initialize chat notification after delay
         */
        function showNotification() {
            if (!hasInteracted && !isOpen) {
                setTimeout(() => {
                    if (!hasInteracted && !isOpen) {
                        chatNotification.classList.add('show');
                        
                        // Hide notification after 10 seconds
                        setTimeout(() => {
                            chatNotification.classList.remove('show');
                        }, 10000);
                    }
                }, 5000);
            }
        }

        /**
         * Toggle chat window
         */
        function toggleChat() {
            isOpen = !isOpen;
            hasInteracted = true;
            
            chatWindow.classList.toggle('open', isOpen);
            chatToggle.classList.toggle('active', isOpen);
            
            // Hide notification when chat is opened
            if (isOpen) {
                chatNotification.classList.remove('show');
                chatInput.focus();
            }
            
            // Update icons
            const chatIcon = chatToggle.querySelector('.chat-icon');
            const closeIcon = chatToggle.querySelector('.close-icon');
            
            if (isOpen) {
                chatIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                chatIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        }

        /**
         * Add message to chat
         */
        function addMessage(message, isUser = false, showTime = true) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="avatar-gradient"></div>
                    <span class="avatar-text">${isUser ? 'You' : 'HT'}</span>
                </div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${message}</p>
                    </div>
                    ${showTime ? `<div class="message-time">${currentTime}</div>` : ''}
                </div>
            `;
            
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
            
            // Store in conversation history
            conversationHistory.push({
                message: message,
                isUser: isUser,
                timestamp: new Date()
            });
        }

        /**
         * Add follow-up buttons
         */
        function addFollowUpButtons(options) {
            const followUpDiv = document.createElement('div');
            followUpDiv.className = 'quick-actions';
            followUpDiv.innerHTML = `
                <p class="quick-actions-title">Quick actions:</p>
                <div class="quick-action-buttons">
                    ${options.map(option => 
                        `<button class="quick-action-btn follow-up-btn" data-text="${option}">${option}</button>`
                    ).join('')}
                </div>
            `;
            
            chatMessages.appendChild(followUpDiv);
            
            // Add event listeners to follow-up buttons
            followUpDiv.querySelectorAll('.follow-up-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const text = this.getAttribute('data-text');
                    handleFollowUpClick(text);
                    followUpDiv.remove(); // Remove follow-up buttons after click
                });
            });
            
            scrollToBottom();
        }

        /**
         * Handle follow-up button clicks
         */
        function handleFollowUpClick(text) {
            // Add user message
            addMessage(text, true);
            
            // Handle specific follow-up actions
            setTimeout(() => {
                showTyping();
                
                setTimeout(() => {
                    hideTyping();
                    
                    switch(text) {
                        case 'Get Custom Quote':
                        case 'Schedule Consultation':
                        case 'Schedule Call':
                            addMessage("Perfect! I'll redirect you to our contact form where you can provide details about your project and schedule a consultation.", false);
                            setTimeout(() => {
                                window.location.href = '/contact.html';
                            }, 2000);
                            break;
                            
                        case 'View Full Portfolio':
                            addMessage("Excellent! Let me take you to our portfolio page where you can see all our recent work and case studies.", false);
                            setTimeout(() => {
                                window.location.href = '/work.html';
                            }, 2000);
                            break;
                            
                        case 'Email Us':
                            addMessage("Great choice! You can reach us at hello@hometownmarketing.com or use the contact form on our website. We typically respond within 2-4 hours during business days.", false);
                            break;
                            
                        case 'Get Estimate':
                            addMessage("I'd love to provide you with an estimate! To give you accurate pricing, I'll need to know more about your project. Let me direct you to our project questionnaire.", false);
                            setTimeout(() => {
                                window.location.href = '/contact.html';
                            }, 2000);
                            break;
                            
                        default:
                            addMessage("Thanks for your interest! Is there anything specific you'd like to know about that service?", false);
                    }
                }, 1500);
            }, 500);
        }

        /**
         * Show typing indicator
         */
        function showTyping() {
            chatTyping.classList.add('show');
            scrollToBottom();
        }

        /**
         * Hide typing indicator
         */
        function hideTyping() {
            chatTyping.classList.remove('show');
        }

        /**
         * Scroll to bottom of messages
         */
        function scrollToBottom() {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }

        /**
         * Generate AI-like response
         */
        function generateResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Check for specific keywords and return relevant responses
            if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('budget')) {
                return chatResponses.pricing;
            }
            
            if (message.includes('service') || message.includes('what do you') || message.includes('help with')) {
                return chatResponses.services;
            }
            
            if (message.includes('portfolio') || message.includes('work') || message.includes('example') || message.includes('case study')) {
                return chatResponses.portfolio;
            }
            
            if (message.includes('contact') || message.includes('reach') || message.includes('call') || message.includes('email') || message.includes('phone')) {
                return chatResponses.contact;
            }
            
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                return {
                    message: "Hello! Welcome to HomeTown Marketing. I'm here to help you learn about our services and answer any questions. What brings you here today?",
                    followUp: ["Our Services", "View Pricing", "See Portfolio"]
                };
            }
            
            // Return general response for other queries
            const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
            return {
                message: randomResponse,
                followUp: ["Our Services", "View Pricing", "Contact Us"]
            };
        }

        /**
         * Handle sending message
         */
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Clear input and disable send button temporarily
            chatInput.value = '';
            chatSend.disabled = true;
            
            // Add user message
            addMessage(message, true);
            
            // Hide quick actions if they exist
            const existingQuickActions = chatMessages.querySelector('.quick-actions');
            if (existingQuickActions) {
                existingQuickActions.style.display = 'none';
            }
            
            // Show typing indicator and generate response
            setTimeout(() => {
                showTyping();
                
                setTimeout(() => {
                    hideTyping();
                    
                    const response = generateResponse(message);
                    addMessage(response.message, false);
                    
                    if (response.followUp) {
                        setTimeout(() => {
                            addFollowUpButtons(response.followUp);
                        }, 800);
                    }
                    
                    // Re-enable send button
                    chatSend.disabled = false;
                }, 1500 + Math.random() * 1000); // Random delay for realism
            }, 500);
        }

        /**
         * Handle quick action clicks
         */
        function handleQuickAction(action) {
            hasInteracted = true;
            
            // Hide quick actions
            quickActions.style.display = 'none';
            
            // Show typing and respond based on action
            setTimeout(() => {
                showTyping();
                
                setTimeout(() => {
                    hideTyping();
                    
                    const response = chatResponses[action];
                    if (response) {
                        addMessage(response.message, false);
                        
                        if (response.followUp) {
                            setTimeout(() => {
                                addFollowUpButtons(response.followUp);
                            }, 800);
                        }
                    }
                }, 1200);
            }, 300);
        }

        // Event listeners
        if (chatToggle) {
            chatToggle.addEventListener('click', toggleChat);
        }
        
        if (chatMinimize) {
            chatMinimize.addEventListener('click', toggleChat);
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Show typing indicator for user
            let typingTimer;
            chatInput.addEventListener('input', function() {
                clearTimeout(typingTimer);
                // Could add "user is typing" indicator here if needed
            });
        }
        
        // Quick action buttons
        selectAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                handleQuickAction(action);
            });
        });
        
        // Initialize notification
        showNotification();
        
        // Set initial focus when chat opens
        if (chatWindow) {
            chatWindow.addEventListener('transitionend', function() {
                if (isOpen && chatInput) {
                    chatInput.focus();
                }
            });
        }
    }

    // Expose the chat widget init function globally
    window.initChatWidget = initChatWidget;

    /**
     * Interactive Pricing Calculator
     */
    function initPricingCalculator() {
        // Check if we're on the pricing page
        if (!select('.billing-toggle')) return;

        const billingOptions = selectAll('.billing-option');
        const serviceOptions = selectAll('.service-option input[type="radio"]');
        const addonOptions = selectAll('.addon-option input[type="checkbox"]');
        const currentRevenueInput = select('#current-revenue');
        
        // Price elements
        const subtotalEl = select('#subtotal');
        const discountLineEl = select('#discount-line');
        const discountAmountEl = select('#discount-amount');
        const totalPriceEl = select('#total-price');
        
        // Service line elements
        const socialMediaLine = select('#social-media-line');
        const websiteLine = select('#website-line');
        const contentLine = select('#content-line');
        const advertisingLine = select('#advertising-line');
        const addonLinesContainer = select('#addon-lines');
        
        // ROI elements
        const growthPercentageEl = select('#growth-percentage');
        const additionalRevenueEl = select('#additional-revenue');
        const roiPercentageEl = select('#roi-percentage');

        let currentBilling = 'monthly';
        let selectedServices = {
            social_media: 'none',
            website: 'none',
            content: 'none',
            advertising: 'none'
        };
        let selectedAddons = new Set();

        /**
         * Service prices for monthly and annual billing
         */
        const servicePrices = {
            social_media: {
                none: { monthly: 0, annual: 0 },
                basic: { monthly: 299, annual: 2690 },
                advanced: { monthly: 499, annual: 4490 },
                premium: { monthly: 799, annual: 7190 }
            },
            website: {
                none: { monthly: 0, annual: 0 },
                maintenance: { monthly: 199, annual: 1790 },
                optimization: { monthly: 399, annual: 3590 },
                redesign: { monthly: 799, annual: 7190 }
            },
            content: {
                none: { monthly: 0, annual: 0 },
                basic: { monthly: 199, annual: 1790 },
                blog: { monthly: 399, annual: 3590 },
                full: { monthly: 599, annual: 5390 }
            },
            advertising: {
                none: { monthly: 0, annual: 0 },
                google: { monthly: 299, annual: 2690 },
                social: { monthly: 399, annual: 3590 },
                full: { monthly: 699, annual: 6290 }
            }
        };

        const addonPrices = {
            photography: { monthly: 199, annual: 1790 },
            video: { monthly: 399, annual: 3590 },
            analytics: { monthly: 99, annual: 890 },
            consulting: { monthly: 299, annual: 2690 }
        };

        /**
         * Service display names
         */
        const serviceNames = {
            social_media: 'Social Media',
            website: 'Website & SEO',
            content: 'Content Marketing',
            advertising: 'Paid Advertising'
        };

        const addonNames = {
            photography: 'Professional Photography',
            video: 'Video Content',
            analytics: 'Advanced Analytics',
            consulting: 'Strategic Consulting'
        };

        /**
         * Toggle billing frequency
         */
        function toggleBilling(billing) {
            currentBilling = billing;
            
            // Update active state
            billingOptions.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.billing === billing);
            });
            
            // Update all price displays
            updatePriceDisplays();
            updateCalculations();
        }

        /**
         * Update price displays throughout the interface
         */
        function updatePriceDisplays() {
            // Update service option prices
            selectAll('.price').forEach(priceEl => {
                const monthlyPrice = parseInt(priceEl.dataset.monthly);
                const annualPrice = parseInt(priceEl.dataset.annual);
                const price = currentBilling === 'annual' ? annualPrice : monthlyPrice;
                
                if (currentBilling === 'annual' && monthlyPrice > 0) {
                    const monthlyEquivalent = Math.round(annualPrice / 12);
                    priceEl.textContent = `$${monthlyEquivalent}/mo`;
                } else {
                    priceEl.textContent = price === 0 ? '$0/mo' : `$${price}/mo`;
                }
            });
            
            // Update addon prices
            selectAll('.addon-price').forEach(priceEl => {
                const monthlyPrice = parseInt(priceEl.dataset.monthly);
                const annualPrice = parseInt(priceEl.dataset.annual);
                
                if (currentBilling === 'annual' && monthlyPrice > 0) {
                    const monthlyEquivalent = Math.round(annualPrice / 12);
                    priceEl.textContent = `+$${monthlyEquivalent}/mo`;
                } else {
                    const price = currentBilling === 'annual' ? annualPrice : monthlyPrice;
                    priceEl.textContent = price === 0 ? '+$0/mo' : `+$${price}/mo`;
                }
            });
        }

        /**
         * Update service selection
         */
        function updateServiceSelection(category, value) {
            selectedServices[category] = value;
            updateCalculations();
            updateServiceLines();
        }

        /**
         * Update addon selection
         */
        function updateAddonSelection(addon, checked) {
            if (checked) {
                selectedAddons.add(addon);
            } else {
                selectedAddons.delete(addon);
            }
            updateCalculations();
            updateAddonLines();
        }

        /**
         * Calculate total price
         */
        function calculateTotal() {
            let subtotal = 0;

            // Add service prices
            Object.keys(selectedServices).forEach(category => {
                const service = selectedServices[category];
                if (service !== 'none' && servicePrices[category][service]) {
                    subtotal += servicePrices[category][service][currentBilling];
                }
            });

            // Add addon prices
            selectedAddons.forEach(addon => {
                if (addonPrices[addon]) {
                    subtotal += addonPrices[addon][currentBilling];
                }
            });

            return subtotal;
        }

        /**
         * Update all calculations and displays
         */
        function updateCalculations() {
            const subtotal = calculateTotal();
            const monthlySubtotal = currentBilling === 'annual' ? Math.round(subtotal / 12) : subtotal;
            
            // Calculate discount for annual billing
            let discount = 0;
            if (currentBilling === 'annual' && subtotal > 0) {
                const monthlyEquivalent = calculateMonthlyEquivalent();
                discount = (monthlyEquivalent * 12) - subtotal;
            }

            // Update price displays with animation
            updatePriceWithAnimation(subtotalEl, formatPrice(monthlySubtotal));
            updatePriceWithAnimation(totalPriceEl, formatPrice(monthlySubtotal));

            // Show/hide discount line
            if (discount > 0) {
                discountLineEl.style.display = 'flex';
                updatePriceWithAnimation(discountAmountEl, `-$${Math.round(discount)}`);
            } else {
                discountLineEl.style.display = 'none';
            }

            // Update ROI calculations
            updateROICalculations(monthlySubtotal);
        }

        /**
         * Calculate monthly equivalent for annual billing
         */
        function calculateMonthlyEquivalent() {
            let monthlyTotal = 0;

            Object.keys(selectedServices).forEach(category => {
                const service = selectedServices[category];
                if (service !== 'none' && servicePrices[category][service]) {
                    monthlyTotal += servicePrices[category][service].monthly;
                }
            });

            selectedAddons.forEach(addon => {
                if (addonPrices[addon]) {
                    monthlyTotal += addonPrices[addon].monthly;
                }
            });

            return monthlyTotal;
        }

        /**
         * Update price with animation
         */
        function updatePriceWithAnimation(element, newPrice) {
            element.classList.add('price-change');
            element.textContent = newPrice;
            
            setTimeout(() => {
                element.classList.remove('price-change');
            }, 400);
        }

        /**
         * Format price for display
         */
        function formatPrice(price) {
            return price === 0 ? '$0' : `$${price.toLocaleString()}`;
        }

        /**
         * Update service line displays
         */
        function updateServiceLines() {
            Object.keys(selectedServices).forEach(category => {
                const service = selectedServices[category];
                const lineEl = select(`#${category.replace('_', '-')}-line`);
                
                if (service !== 'none' && lineEl) {
                    const price = servicePrices[category][service][currentBilling];
                    const monthlyPrice = currentBilling === 'annual' ? Math.round(price / 12) : price;
                    
                    lineEl.style.display = 'flex';
                    lineEl.querySelector('.service-price').textContent = formatPrice(monthlyPrice);
                    
                    // Add animation
                    lineEl.classList.add('service-line');
                } else if (lineEl) {
                    lineEl.style.display = 'none';
                }
            });
        }

        /**
         * Update addon line displays
         */
        function updateAddonLines() {
            addonLinesContainer.innerHTML = '';
            
            selectedAddons.forEach(addon => {
                const price = addonPrices[addon][currentBilling];
                const monthlyPrice = currentBilling === 'annual' ? Math.round(price / 12) : price;
                
                const lineEl = document.createElement('div');
                lineEl.className = 'service-line';
                lineEl.innerHTML = `
                    <span class="service-name">${addonNames[addon]}</span>
                    <span class="service-price">${formatPrice(monthlyPrice)}</span>
                `;
                
                addonLinesContainer.appendChild(lineEl);
            });
        }

        /**
         * Update ROI calculations
         */
        function updateROICalculations(monthlyInvestment) {
            const currentRevenue = parseFloat(currentRevenueInput.value) || 0;
            
            if (currentRevenue === 0 || monthlyInvestment === 0) {
                growthPercentageEl.textContent = '25%';
                additionalRevenueEl.textContent = '$0/mo';
                roiPercentageEl.textContent = '+∞%';
                return;
            }

            // Calculate expected growth based on investment level
            let growthPercentage;
            if (monthlyInvestment < 500) {
                growthPercentage = 15;
            } else if (monthlyInvestment < 1000) {
                growthPercentage = 25;
            } else if (monthlyInvestment < 2000) {
                growthPercentage = 35;
            } else {
                growthPercentage = 50;
            }

            const additionalRevenue = (currentRevenue * growthPercentage) / 100;
            const roi = ((additionalRevenue - monthlyInvestment) / monthlyInvestment) * 100;

            growthPercentageEl.textContent = `${growthPercentage}%`;
            additionalRevenueEl.textContent = `$${Math.round(additionalRevenue).toLocaleString()}/mo`;
            roiPercentageEl.textContent = roi > 0 ? `+${Math.round(roi)}%` : '0%';
        }

        /**
         * Handle custom quote button
         */
        window.getCustomQuote = function() {
            // Collect selected services and pricing
            const selectedData = {
                billing: currentBilling,
                services: selectedServices,
                addons: Array.from(selectedAddons),
                total: calculateTotal(),
                currentRevenue: currentRevenueInput.value
            };
            
            // Store in localStorage for contact form
            localStorage.setItem('pricingCalculatorData', JSON.stringify(selectedData));
            
            // Redirect to contact form
            window.location.href = '/contact.html';
        };

        /**
         * Handle consultation button
         */
        window.scheduleConsultation = function() {
            const selectedData = {
                billing: currentBilling,
                services: selectedServices,
                addons: Array.from(selectedAddons),
                total: calculateTotal()
            };
            
            localStorage.setItem('consultationData', JSON.stringify(selectedData));
            window.location.href = '/contact.html';
        };

        // Event listeners
        billingOptions.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBilling(btn.dataset.billing);
            });
        });

        serviceOptions.forEach(input => {
            input.addEventListener('change', () => {
                if (input.checked) {
                    updateServiceSelection(input.name, input.value);
                }
            });
        });

        addonOptions.forEach(input => {
            input.addEventListener('change', () => {
                updateAddonSelection(input.value, input.checked);
            });
        });

        if (currentRevenueInput) {
            currentRevenueInput.addEventListener('input', () => {
                const monthlyInvestment = currentBilling === 'annual' ? 
                    Math.round(calculateTotal() / 12) : calculateTotal();
                updateROICalculations(monthlyInvestment);
            });
        }

        // Initialize
        updatePriceDisplays();
        updateCalculations();
    }

    // Expose the pricing calculator init function globally
    window.initPricingCalculator = initPricingCalculator;

    /**
     * Dynamic Testimonial Carousel with Autoplay
     */
    function initTestimonialCarousel() {
        const carousel = select('#testimonial-carousel');
        if (!carousel) return;

        const track = select('#testimonial-track');
        const slides = selectAll('.testimonial-slide');
        const indicators = selectAll('.indicator');
        const prevBtn = select('#prev-testimonial');
        const nextBtn = select('#next-testimonial');
        const autoplayBtn = select('#autoplay-toggle');
        const playIcon = autoplayBtn?.querySelector('.play-icon');
        const pauseIcon = autoplayBtn?.querySelector('.pause-icon');

        let currentSlide = 0;
        let isAutoPlaying = true;
        let autoplayInterval;
        let isTransitioning = false;
        const autoplayDelay = 5000; // 5 seconds

        /**
         * Go to specific slide
         */
        function goToSlide(slideIndex, direction = 'next') {
            if (isTransitioning || slideIndex === currentSlide) return;
            
            isTransitioning = true;
            
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            slides[currentSlide].classList.add('exiting');
            
            // Update current slide index
            const prevSlide = currentSlide;
            currentSlide = slideIndex;
            
            // Add entering animation to new slide
            slides[currentSlide].classList.add('entering');
            
            // Animate the track
            const translateX = -currentSlide * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            updateIndicators();
            
            // Handle animation completion
            setTimeout(() => {
                // Clean up previous slide
                slides[prevSlide].classList.remove('exiting');
                
                // Activate new slide
                slides[currentSlide].classList.remove('entering');
                slides[currentSlide].classList.add('active');
                
                isTransitioning = false;
            }, 600);
        }

        /**
         * Go to next slide
         */
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex, 'next');
        }

        /**
         * Go to previous slide
         */
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prevIndex, 'prev');
        }

        /**
         * Update indicator states
         */
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        /**
         * Start autoplay
         */
        function startAutoplay() {
            if (autoplayInterval) return;
            
            isAutoPlaying = true;
            autoplayInterval = setInterval(() => {
                if (!isTransitioning) {
                    nextSlide();
                }
            }, autoplayDelay);
            
            updateAutoplayUI();
        }

        /**
         * Stop autoplay
         */
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            isAutoPlaying = false;
            updateAutoplayUI();
        }

        /**
         * Toggle autoplay
         */
        function toggleAutoplay() {
            if (isAutoPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        }

        /**
         * Update autoplay button UI
         */
        function updateAutoplayUI() {
            if (!autoplayBtn) return;
            
            if (isAutoPlaying) {
                playIcon?.classList.add('hidden');
                pauseIcon?.classList.remove('hidden');
                autoplayBtn.setAttribute('aria-label', 'Pause autoplay');
            } else {
                playIcon?.classList.remove('hidden');
                pauseIcon?.classList.add('hidden');
                autoplayBtn.setAttribute('aria-label', 'Resume autoplay');
            }
        }

        /**
         * Handle keyboard navigation
         */
        function handleKeyboard(e) {
            if (isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
                case ' ':
                    e.preventDefault();
                    toggleAutoplay();
                    break;
                case 'Escape':
                    stopAutoplay();
                    break;
            }
        }

        /**
         * Handle touch/swipe gestures
         */
        function initTouchGestures() {
            let startX = 0;
            let startY = 0;
            let endX = 0;
            let endY = 0;
            const minSwipeDistance = 50;

            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            carousel.addEventListener('touchmove', (e) => {
                // Prevent scrolling during horizontal swipes
                if (Math.abs(e.touches[0].clientX - startX) > 10) {
                    e.preventDefault();
                }
            }, { passive: false });

            carousel.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;
                
                const deltaX = endX - startX;
                const deltaY = endY - startY;
                
                // Check if it's a horizontal swipe
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                    
                    // Temporarily stop autoplay after manual interaction
                    if (isAutoPlaying) {
                        stopAutoplay();
                        setTimeout(startAutoplay, 3000);
                    }
                }
            }, { passive: true });
        }

        /**
         * Handle intersection observer for performance
         */
        function initIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start autoplay when carousel comes into view
                        if (!isAutoPlaying) {
                            startAutoplay();
                        }
                    } else {
                        // Pause autoplay when carousel is out of view
                        if (isAutoPlaying) {
                            stopAutoplay();
                        }
                    }
                });
            }, {
                threshold: 0.3
            });

            observer.observe(carousel);
        }

        /**
         * Add progress bar for autoplay
         */
        function addProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'autoplay-progress';
            progressBar.id = 'autoplay-progress';
            carousel.appendChild(progressBar);
            
            return progressBar;
        }

        /**
         * Update progress bar
         */
        function updateProgressBar() {
            const progressBar = select('#autoplay-progress');
            if (!progressBar || !isAutoPlaying) return;
            
            progressBar.style.animation = `progressBarFill ${autoplayDelay}ms linear`;
            
            // Reset animation
            setTimeout(() => {
                if (progressBar) {
                    progressBar.style.animation = '';
                }
            }, autoplayDelay);
        }

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                if (isAutoPlaying) {
                    stopAutoplay();
                    setTimeout(startAutoplay, 3000);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                if (isAutoPlaying) {
                    stopAutoplay();
                    setTimeout(startAutoplay, 3000);
                }
            });
        }

        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', toggleAutoplay);
        }

        // Indicator click handlers
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                if (isAutoPlaying) {
                    stopAutoplay();
                    setTimeout(startAutoplay, 3000);
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Mouse interactions - pause on hover
        carousel.addEventListener('mouseenter', () => {
            if (isAutoPlaying) {
                stopAutoplay();
            }
        });

        carousel.addEventListener('mouseleave', () => {
            if (!isAutoPlaying) {
                startAutoplay();
            }
        });

        // Visibility API - pause when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (isAutoPlaying) {
                    stopAutoplay();
                }
            } else {
                if (!isAutoPlaying) {
                    startAutoplay();
                }
            }
        });

        // Initialize features
        initTouchGestures();
        initIntersectionObserver();
        
        // Add progress bar with CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes progressBarFill {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
            }
        `;
        document.head.appendChild(style);
        
        const progressBar = addProgressBar();

        // Start autoplay
        startAutoplay();
        
        // Update progress bar on slide change
        const originalGoToSlide = goToSlide;
        goToSlide = function(...args) {
            originalGoToSlide.apply(this, args);
            if (isAutoPlaying && progressBar) {
                setTimeout(updateProgressBar, 100);
            }
        };

        // Initial progress bar update
        setTimeout(updateProgressBar, 100);

        // Initialize first slide
        updateIndicators();
    }

    // Initialize service comparison matrix if on services page
    if (document.getElementById('bento-grid')) {
        initServiceComparison();
    }

    // Expose the testimonial carousel init function globally
    window.initTestimonialCarousel = initTestimonialCarousel;
});

// ========================================
// SERVICE COMPARISON MATRIX
// ========================================

function initServiceComparison() {
    const serviceData = {
        'web-design': {
            name: 'Website Design & Development',
            price: 1299,
            type: 'one-time',
            timeline: '4-8 weeks',
            category: 'design',
            description: 'Bespoke, high-performance websites that serve as the digital flagship for your brand.',
            features: [
                'Custom responsive design',
                'Content management system',
                'SEO optimization',
                'Performance optimization',
                'SSL certificate',
                'Mobile-first approach',
                'Cross-browser compatibility',
                'Google Analytics integration',
                'Contact forms',
                'Social media integration'
            ],
            deliverables: [
                'Fully functional website',
                'Mobile-responsive design',
                'CMS training',
                'Basic SEO setup',
                '3 months support'
            ]
        },
        'brand-identity': {
            name: 'Brand Identity Design',
            price: 599,
            type: 'one-time',
            timeline: '2-4 weeks',
            category: 'design',
            description: 'Memorable logos and brand systems that define your business.',
            features: [
                'Logo design (3 concepts)',
                'Brand guidelines',
                'Color palette',
                'Typography selection',
                'Business card design',
                'Letterhead design',
                'Social media templates',
                'Brand style guide',
                'Vector files',
                'Print-ready files'
            ],
            deliverables: [
                'Final logo in multiple formats',
                'Brand guidelines document',
                'Business collateral',
                'Digital assets package'
            ]
        },
        'social-media': {
            name: 'Social Media Management',
            price: 149,
            type: 'monthly',
            timeline: 'Ongoing',
            category: 'marketing',
            description: 'Build engaged communities and grow your online presence.',
            features: [
                'Content planning & strategy',
                'Daily posting (5x/week)',
                'Community management',
                'Hashtag research',
                'Analytics reporting',
                'Content creation',
                'Engagement monitoring',
                'Brand voice development',
                'Competitor analysis',
                'Monthly strategy calls'
            ],
            deliverables: [
                'Monthly content calendar',
                'Designed posts & graphics',
                'Performance analytics',
                'Strategy recommendations'
            ]
        },
        'content-creation': {
            name: 'Content Creation',
            price: 299,
            type: 'project',
            timeline: '1-3 weeks',
            category: 'content',
            description: 'Professional photography, videography, and copywriting that tells your story.',
            features: [
                'Professional photography',
                'Video production',
                'Copywriting services',
                'Content strategy',
                'Brand storytelling',
                'Image editing',
                'Video editing',
                'SEO-optimized content',
                'Multi-platform adaptation',
                'Content calendar'
            ],
            deliverables: [
                'High-resolution photos',
                'Edited video content',
                'Written content',
                'Usage rights included'
            ]
        },
        'seo-marketing': {
            name: 'SEO & Digital Marketing',
            price: 299,
            type: 'monthly',
            timeline: '3-6 months',
            category: 'marketing',
            description: 'Get found online and convert visitors into customers.',
            features: [
                'Keyword research',
                'On-page optimization',
                'Technical SEO audit',
                'Google Ads management',
                'Local SEO optimization',
                'Content optimization',
                'Link building',
                'Performance tracking',
                'Competitor analysis',
                'Monthly reporting'
            ],
            deliverables: [
                'SEO audit report',
                'Optimized website content',
                'Ad campaign setup',
                'Monthly performance reports'
            ]
        },
        'email-marketing': {
            name: 'Email Marketing',
            price: 99,
            type: 'monthly',
            timeline: 'Ongoing',
            category: 'marketing',
            description: 'Nurture leads and retain customers with targeted campaigns.',
            features: [
                'Email automation setup',
                'Campaign design',
                'List segmentation',
                'A/B testing',
                'Performance analytics',
                'Template design',
                'Drip campaigns',
                'Welcome sequences',
                'Newsletter management',
                'Integration setup'
            ],
            deliverables: [
                'Automated email sequences',
                'Custom email templates',
                'Campaign analytics',
                'List growth strategies'
            ]
        }
    };

    let selectedServices = new Set();
    let comparisonMode = false;

    // Get DOM elements
    const toggleBtn = document.getElementById('toggle-comparison');
    const serviceFilter = document.getElementById('service-filter');
    const priceFilter = document.getElementById('price-filter');
    const comparisonCounter = document.getElementById('comparison-counter');
    const compareSelectedBtn = document.getElementById('compare-selected');
    const serviceCards = document.querySelectorAll('.service-card');
    const comparisonModal = document.getElementById('comparison-modal');
    const serviceDetailModal = document.getElementById('service-detail-modal');

    // Toggle comparison mode
    toggleBtn.addEventListener('click', function() {
        comparisonMode = !comparisonMode;
        toggleBtn.classList.toggle('active', comparisonMode);
        
        if (comparisonMode) {
            showComparisonMode();
        } else {
            hideComparisonMode();
        }
    });

    function showComparisonMode() {
        // Show comparison checkboxes
        serviceCards.forEach(card => {
            const checkbox = card.querySelector('.service-comparison-checkbox');
            if (checkbox) {
                checkbox.classList.remove('hidden');
            }
        });
        
        // Show comparison counter
        comparisonCounter.classList.remove('hidden');
        updateComparisonCounter();
    }

    function hideComparisonMode() {
        // Hide comparison checkboxes
        serviceCards.forEach(card => {
            const checkbox = card.querySelector('.service-comparison-checkbox');
            if (checkbox) {
                checkbox.classList.add('hidden');
            }
        });
        
        // Hide comparison counter
        comparisonCounter.classList.add('hidden');
        
        // Clear selections
        selectedServices.clear();
        document.querySelectorAll('.comparison-checkbox').forEach(cb => {
            cb.checked = false;
        });
    }

    // Handle service selection
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('comparison-checkbox')) {
            const serviceId = e.target.dataset.service;
            
            if (e.target.checked) {
                if (selectedServices.size < 3) {
                    selectedServices.add(serviceId);
                } else {
                    e.target.checked = false;
                    showNotification('You can compare up to 3 services at a time.');
                }
            } else {
                selectedServices.delete(serviceId);
            }
            
            updateComparisonCounter();
        }
    });

    function updateComparisonCounter() {
        const count = selectedServices.size;
        const counterText = comparisonCounter.querySelector('.counter-text');
        counterText.textContent = `Select services to compare (${count}/3)`;
        
        compareSelectedBtn.disabled = count < 2;
    }

    // Compare selected services
    compareSelectedBtn.addEventListener('click', function() {
        if (selectedServices.size >= 2) {
            showComparisonModal();
        }
    });

    function showComparisonModal() {
        const modalBody = document.getElementById('comparison-modal-body');
        modalBody.innerHTML = generateComparisonTable();
        comparisonModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function generateComparisonTable() {
        const selectedServicesArray = Array.from(selectedServices);
        
        let tableHTML = '<table class="comparison-table"><thead><tr><th>Feature</th>';
        
        // Add service headers
        selectedServicesArray.forEach(serviceId => {
            const service = serviceData[serviceId];
            tableHTML += `<th class="service-header">${service.name}</th>`;
        });
        
        tableHTML += '</tr></thead><tbody>';
        
        // Price row
        tableHTML += '<tr><td><strong>Price</strong></td>';
        selectedServicesArray.forEach(serviceId => {
            const service = serviceData[serviceId];
            const priceText = service.type === 'monthly' ? `$${service.price}/mo` : 
                            service.type === 'project' ? `$${service.price}/project` : 
                            `$${service.price}`;
            tableHTML += `<td>${priceText}</td>`;
        });
        tableHTML += '</tr>';
        
        // Timeline row
        tableHTML += '<tr><td><strong>Timeline</strong></td>';
        selectedServicesArray.forEach(serviceId => {
            const service = serviceData[serviceId];
            tableHTML += `<td>${service.timeline}</td>`;
        });
        tableHTML += '</tr>';
        
        // Category row
        tableHTML += '<tr><td><strong>Category</strong></td>';
        selectedServicesArray.forEach(serviceId => {
            const service = serviceData[serviceId];
            const categoryName = service.category === 'design' ? 'Design & Development' :
                               service.category === 'marketing' ? 'Marketing & Strategy' :
                               'Content & Media';
            tableHTML += `<td>${categoryName}</td>`;
        });
        tableHTML += '</tr>';
        
        // Features comparison
        const allFeatures = new Set();
        selectedServicesArray.forEach(serviceId => {
            serviceData[serviceId].features.forEach(feature => allFeatures.add(feature));
        });
        
        Array.from(allFeatures).forEach(feature => {
            tableHTML += `<tr><td>${feature}</td>`;
            selectedServicesArray.forEach(serviceId => {
                const hasFeature = serviceData[serviceId].features.includes(feature);
                tableHTML += `<td class="${hasFeature ? 'feature-check' : 'feature-cross'}">
                    ${hasFeature ? '✓' : '✗'}
                </td>`;
            });
            tableHTML += '</tr>';
        });
        
        tableHTML += '</tbody></table>';
        
        return tableHTML;
    }

    // Service filtering
    function applyFilters() {
        const categoryFilter = serviceFilter.value;
        const priceFilterValue = priceFilter.value;
        
        serviceCards.forEach(card => {
            const category = card.dataset.category;
            const price = parseInt(card.dataset.price);
            
            let showCard = true;
            
            // Category filter
            if (categoryFilter !== 'all' && category !== categoryFilter) {
                showCard = false;
            }
            
            // Price filter
            if (priceFilterValue !== 'all') {
                if (priceFilterValue === 'low' && price >= 500) {
                    showCard = false;
                } else if (priceFilterValue === 'medium' && (price < 500 || price > 1500)) {
                    showCard = false;
                } else if (priceFilterValue === 'high' && price < 1500) {
                    showCard = false;
                }
            }
            
            card.classList.toggle('filtered-out', !showCard);
        });
    }

    serviceFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);

    // Service detail buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('service-details-btn') || 
            e.target.classList.contains('service-details-btn-small') ||
            e.target.closest('.service-details-btn') ||
            e.target.closest('.service-details-btn-small')) {
            
            const btn = e.target.closest('[data-service]') || e.target;
            const serviceId = btn.dataset.service;
            
            if (serviceId && serviceData[serviceId]) {
                showServiceDetailModal(serviceId);
            }
        }
    });

    function showServiceDetailModal(serviceId) {
        const service = serviceData[serviceId];
        const modalTitle = document.getElementById('service-detail-title');
        const modalBody = document.getElementById('service-detail-modal-body');
        
        modalTitle.textContent = service.name;
        
        const priceText = service.type === 'monthly' ? `$${service.price}/month` : 
                         service.type === 'project' ? `$${service.price}/project` : 
                         `$${service.price}`;
        
        modalBody.innerHTML = `
            <div class="service-detail-content">
                <div class="detail-section">
                    <h4 class="detail-section-title">Overview</h4>
                    <p class="detail-description">${service.description}</p>
                    <div class="detail-meta">
                        <div class="meta-item">
                            <strong>Price:</strong> ${priceText}
                        </div>
                        <div class="meta-item">
                            <strong>Timeline:</strong> ${service.timeline}
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4 class="detail-section-title">What's Included</h4>
                    <ul class="feature-list">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4 class="detail-section-title">Deliverables</h4>
                    <ul class="deliverable-list">
                        ${service.deliverables.map(deliverable => `<li>${deliverable}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Update add to comparison button
        const addToComparisonBtn = document.getElementById('add-to-comparison-btn');
        addToComparisonBtn.dataset.service = serviceId;
        addToComparisonBtn.textContent = selectedServices.has(serviceId) ? 
            'Remove from Comparison' : 'Add to Comparison';
        
        serviceDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Modal close handlers
    document.getElementById('close-comparison-modal').addEventListener('click', function() {
        comparisonModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.getElementById('close-service-detail-modal').addEventListener('click', function() {
        serviceDetailModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Clear comparison
    document.getElementById('clear-comparison').addEventListener('click', function() {
        selectedServices.clear();
        document.querySelectorAll('.comparison-checkbox').forEach(cb => {
            cb.checked = false;
        });
        updateComparisonCounter();
        comparisonModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Add to comparison from detail modal
    document.getElementById('add-to-comparison-btn').addEventListener('click', function() {
        const serviceId = this.dataset.service;
        const checkbox = document.getElementById(`compare-${serviceId}`);
        
        if (selectedServices.has(serviceId)) {
            selectedServices.delete(serviceId);
            checkbox.checked = false;
            this.textContent = 'Add to Comparison';
        } else {
            if (selectedServices.size < 3) {
                selectedServices.add(serviceId);
                checkbox.checked = true;
                this.textContent = 'Remove from Comparison';
                
                // Enable comparison mode if not already enabled
                if (!comparisonMode) {
                    comparisonMode = true;
                    toggleBtn.classList.add('active');
                    showComparisonMode();
                }
            } else {
                showNotification('You can compare up to 3 services at a time.');
            }
        }
        
        updateComparisonCounter();
    });

    // Close modals on backdrop click
    [comparisonModal, serviceDetailModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Utility function for notifications
    function showNotification(message) {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #004643;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}