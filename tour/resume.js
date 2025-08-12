// Initialize Shepherd.js tour for the resume page
function initializeTour() {
    return new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            classes: 'shepherd-theme-custom',
            scrollTo: { behavior: 'smooth', block: 'center' },
            cancelIcon: { enabled: true }
        }
    });
}

// Helper function to check if element exists
function createCheckElementExists(tour) {
    return function(selector) {
        return new Promise((resolve) => {
            const el = document.querySelector(selector);
            if (!el) {
                console.warn(`Element not found: ${selector}`);
                tour.next();
                return resolve();
            }
            el.classList.add('shepherd-highlight');
            setTimeout(() => el.classList.remove('shepherd-highlight'), 1500);
            resolve();
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const waitForJQuery = (callback) => window.jQuery ? callback() : setTimeout(() => waitForJQuery(callback), 100);

    waitForJQuery(function() {
        const tour = initializeTour();
        const checkElementExists = createCheckElementExists(tour);
        
        // Welcome Step
        tour.addStep({
            id: 'welcome',
            title: 'Resume Management',
            text: 'Welcome to your resume management page. This tour will guide you through managing your resumes and CVs.',
            attachTo: { element: '.logo-header', on: 'bottom' },
            scrollTo: true
        });

        // Main Navigation
        tour.addStep({
            id: 'main-navigation',
            title: 'Navigation',
            text: 'Use the left sidebar to navigate between different sections.',
            attachTo: { element: '.side-bar-st-1', on: 'right' },
            beforeShowPromise: checkElementExists('.side-bar-st-1')
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
            beforeShowPromise: checkElementExists('a[href*="upload"], .btn-primary')
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
                if (tour.isActive()) tour.complete();
                tour.start();
            });
        }

        // Auto-start the tour if it's the user's first visit
        if (!sessionStorage.getItem('resumeTourShown')) {
            setTimeout(() => {
                tour.start();
                sessionStorage.setItem('resumeTourShown', 'true');
            }, 1000);
        }
    });
});