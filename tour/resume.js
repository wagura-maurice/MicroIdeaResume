// Initialize Shepherd.js tour for the resume page
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
                tour.next();
                return resolve();
            }
            
            if (scrollToElement) {
                el.classList.add('shepherd-highlight');
                setTimeout(() => el.classList.remove('shepherd-highlight'), 1500);
                
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
            title: 'Resume Management',
            text: 'Welcome to your resume management page. This tour will guide you through managing your resumes and CVs.',
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

        // Resume List Section
        tour.addStep({
            id: 'resume-list',
            title: 'Your Resumes',
            text: 'View and manage all your uploaded resumes in this section.',
            attachTo: {
                element: '.content-admin-main',
                on: 'top'
            },
            scrollTo: true
        });

        // Upload Button
        tour.addStep({
            id: 'upload-button',
            title: 'Upload Resume',
            text: 'Click the "Upload New CV" button to add a new resume to your profile.',
            attachTo: {
                element: 'a[href*="upload"], .btn-primary',
                on: 'top'
            },
            beforeShowPromise: checkElementExists('a[href*="upload"], .btn-primary', true)
        });

        // Final Step
        tour.addStep({
            id: 'complete',
            title: 'Tour Complete!',
            text: 'You now know how to manage your resumes. Start uploading and organizing your CVs!',
            buttons: [{
                text: 'Finish',
                action: tour.complete,
                classes: 'shepherd-button-primary'
            }]
        });

        // Add click handler for the tour trigger button
        const tourTrigger = document.getElementById('triggertour');
        if (tourTrigger) {
            tourTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                startTour();
            });
        }

        // Auto-start the tour if it's the user's first visit to this page
        const startTourIfNeeded = () => {
            if (!sessionStorage.getItem('resumeTourShown')) {
                setTimeout(() => {
                    startTour();
                    sessionStorage.setItem('resumeTourShown', 'true');
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