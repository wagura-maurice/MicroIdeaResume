/**
 * Recommendations Page Tour using Shepherd.js
 * Provides an interactive tour of the recommendations page features
 */

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
            scrollTo: { behavior: 'smooth', block: 'center' },,
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

        // Main Content Area
        tour.addStep({
            id: 'main-content',
            title: 'Recommendations',
            text: 'Here you can view and manage your job recommendations.',
            attachTo: {
                element: '.panel .panel-default',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('.panel .panel-default', true)
        });

        // Action Buttons
        tour.addStep({
            id: 'action-buttons',
            title: 'Generate recommendations',
            text: 'Click this button to generate job recommendations based on your profile and preferences.',
            attachTo: {
                element: '#start-task-btn',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#start-task-btn', true)
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