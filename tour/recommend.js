// Initialize Shepherd.js tour for the recommendations page
function initializeTour() {
    return new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepherd-theme-custom',
            scrollTo: { behavior: 'smooth', block: 'center' },
            cancelIcon: {
                enabled: true
            },
            buttons: [
                {
                    text: 'Back',
                    action: function() { return this.back(); },
                    secondary: true
                },
                {
                    text: 'Next',
                    action: function() { return this.next(); }
                }
            ]
        }
    });
}

// Helper function to check if element exists and handle the promise
function createCheckElementExists(tour) {
    return function(selector, scrollToElement = false) {
        return new Promise((resolve) => {
            const el = document.querySelector(selector);
            if (!el) {
                console.warn(`Element not found: ${selector}`);
                // Skip to next step if element not found
                tour.next();
                return resolve();
            }
            
            if (scrollToElement) {
                // Add highlight class
                el.classList.add('shepherd-highlight');
                // Remove highlight after delay
                setTimeout(() => el.classList.remove('shepherd-highlight'), 1500);
                
                // Smooth scroll to element with offset for header
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
            
            resolve();
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait for jQuery to be loaded
    const waitForJQuery = (callback) => {
        if (window.jQuery) {
            callback();
        } else {
            setTimeout(() => waitForJQuery(callback), 100);
        }
    };

    waitForJQuery(function() {
        const tour = initializeTour();
        const checkElementExists = createCheckElementExists(tour);
        
        // Function to start the tour
        const startTour = () => {
            if (tour.isActive()) {
                tour.complete();
            }
            tour.start();
        };

        // Welcome Step
        tour.addStep({
            id: 'welcome',
            title: 'Job Recommendations',
            text: 'Welcome to the job recommendations page. This tour will guide you through finding your next career opportunity.',
            attachTo: {
                element: '.logo-header',
                on: 'bottom'
            },
            scrollTo: true,
            buttons: [
                {
                    text: 'Next',
                    action: tour.next,
                    classes: 'shepherd-button-primary'
                }
            ]
        });

        // Main Navigation
        tour.addStep({
            id: 'main-navigation',
            title: 'Main Navigation',
            text: 'Use the left sidebar to navigate between different sections of the portal.',
            attachTo: {
                element: '.side-bar-st-1',
                on: 'right'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.side-bar-st-1', true)
        });

        // Help Button
        tour.addStep({
            id: 'help-button',
            title: 'Need Help?',
            text: 'Click the help button (?) anytime to restart this tour.',
            attachTo: {
                element: '#triggertour',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#triggertour', true)
        });

        // Recommendations Section
        tour.addStep({
            id: 'recommendations-section',
            title: 'Recommendations',
            text: 'This section shows job recommendations based on your profile and preferences.',
            attachTo: {
                element: '.content-admin-main',
                on: 'top'
            },
            scrollTo: true
        });

        // Search and Filters
        tour.addStep({
            id: 'search-filters',
            title: 'Search & Filters',
            text: 'Use these options to filter and search for specific job recommendations.',
            attachTo: {
                element: '.filter-section, .search-container',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.filter-section, .search-container', true)
        });

        // Job Listings
        tour.addStep({
            id: 'job-listings',
            title: 'Job Listings',
            text: 'Browse through the list of recommended jobs that match your profile.',
            attachTo: {
                element: '.job-listings, .recommendations-list',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.job-listings, .recommendations-list', true)
        });

        // Job Details
        tour.addStep({
            id: 'job-details',
            title: 'Job Details',
            text: 'Click on a job to view more information and apply.',
            attachTo: {
                element: '.job-details, .recommendation-item',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.job-details, .recommendation-item', true)
        });

        // Action Buttons
        tour.addStep({
            id: 'action-buttons',
            title: 'Actions',
            text: 'Use these buttons to save jobs or apply directly.',
            attachTo: {
                element: '.action-buttons, .btn-apply',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.action-buttons, .btn-apply', true)
        });

        // Final Step
        tour.addStep({
            id: 'complete',
            title: 'Tour Complete!',
            text: 'You now know how to use the recommendations page. Start exploring job opportunities that match your skills!',
            buttons: [
                {
                    text: 'Finish',
                    action: tour.complete,
                    classes: 'shepherd-button-primary'
                }
            ]
        });

        // Add click handler for the tour trigger button
        const tourTrigger = document.getElementById('triggertour');
        if (tourTrigger) {
            tourTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                startTour();
            });
        }

        // Auto-start the tour if it's the user's first visit to this page
        const startTourIfNeeded = () => {
            if (!sessionStorage.getItem('recommendTourShown')) {
                setTimeout(() => {
                    startTour();
                    sessionStorage.setItem('recommendTourShown', 'true');
                }, 1000);
            }
        };

        // Start the tour when the page is fully loaded
        if (document.readyState === 'complete') {
            startTourIfNeeded();
        } else {
            window.addEventListener('load', startTourIfNeeded);
        }
    });
});