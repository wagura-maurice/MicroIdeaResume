// Dashboard Tour using Shepherd.js
function initializeTour() {
    // Initialize the tour
    const tour = new Shepherd.Tour({
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
                    classes: 'shepherd-button-secondary',
                    secondary: true
                },
                {
                    text: 'Next',
                    action: function() { return this.next(); },
                    classes: 'shepherd-button-primary'
                }
            ]
        }
    });
    
    return tour;
}

// Start the tour when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the tour
    const tour = initializeTour();
    
    // Function to start the tour
    function startTour() {
        if (tour.isActive()) {
            tour.complete();
        }
        tour.start();
    }

    // Add steps to the tour
    tour.addStep({
        id: 'welcome',
        title: 'Welcome to Your Dashboard',
        text: 'Welcome to your Micro-Idea Dashboard! This tour will guide you through the main features and navigation.',
        attachTo: {
            element: '.logo-header',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-primary'
            }
        ]
    });

    tour.addStep({
        id: 'main-navigation',
        title: 'Main Navigation',
        text: 'Use the left sidebar to navigate between different sections of the portal.',
        attachTo: {
            element: '.side-bar-st-1',
            on: 'right'
        }
    });

    tour.addStep({
        id: 'help-button',
        title: 'Need Help?',
        text: 'Click the question mark button anytime you need assistance.',
        attachTo: {
            element: '#triggertour',
            on: 'bottom'
        }
    });

    tour.addStep({
        id: 'user-profile',
        title: 'Your Profile',
        text: 'Access your profile settings and account information from here.',
        attachTo: {
            element: '.header-widget',
            on: 'bottom'
        }
    });

    tour.addStep({
        id: 'main-content',
        title: 'Dashboard Content',
        text: 'This is your main dashboard where you can view important information and quick actions.',
        attachTo: {
            element: '.dashboard-content',
            on: 'top'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back,
                classes: 'shepherd-button-secondary'
            },
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

    // Auto-start the tour on first visit
    if (!localStorage.getItem('dashboardTourCompleted')) {
        // Small delay to ensure all elements are rendered
        setTimeout(() => {
            startTour();
            localStorage.setItem('dashboardTourCompleted', 'true');
        }, 1000);
    }
});