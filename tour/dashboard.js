/**
 * Dashboard Tour using Shepherd.js
 * Provides an interactive tour of the dashboard features
 */

// Tour configuration
const TOUR_CONFIG = {
    useModalOverlay: true,
    defaultStepOptions: {
        classes: 'shepherd-theme-custom',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: { enabled: true },
        buttons: [
            {
                text: 'Back',
                action() { return this.back(); },
                classes: 'shepherd-button-secondary',
                secondary: true
            },
            {
                text: 'Next',
                action() { return this.next(); },
                classes: 'shepherd-button-primary'
            },
            {
                text: 'Skip for now',
                action() { return this.complete(); },
                classes: 'shepherd-button-secondary',
                secondary: true
            }
        ]
    }
};

/**
 * Initialize and configure the tour
 * @returns {Shepherd.Tour} Configured tour instance
 */
function initializeTour() {
    return new Shepherd.Tour(TOUR_CONFIG);
}

// Start the tour when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const tour = initializeTour();
    
    const startTour = () => {
        if (tour.isActive()) tour.complete();
        tour.start();
    };

    // Add steps to the tour
    tour.addStep({
        id: 'welcome',
        title: 'Welcome to Your Dashboard',
        buttons: [
            {
                text: 'Skip for now',
                action() { return this.complete(); },
                classes: 'shepherd-button-secondary',
                secondary: true
            },
            {
                text: 'Next',
                action() { return this.next(); },
                classes: 'shepherd-button-primary'
            }
        ],
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

    // Navigation Help
    tour.addStep({
        id: 'help-button',
        title: 'Need Help?',
        text: 'Click the help button (?) anytime to restart this tour.',
        attachTo: {
            element: '#triggertour',
            on: 'left'
        }
    });

    // Dashboard Stats Section - Overview
    tour.addStep({
        id: 'dashboard-stats-overview',
        title: 'Your Dashboard Overview',
        text: 'Here are your key metrics at a glance:',
        attachTo: {
            element: '.twm-right-section-panel.site-bg-gray, .twm-right-section-panel, .site-bg-gray',
            on: 'left-start'
        },
        beforeShowPromise: function() {
            // Try to find the right panel
            const rightPanel = document.querySelector('.twm-right-section-panel.site-bg-gray, .twm-right-section-panel, .site-bg-gray');
            if (!rightPanel) {
                return Promise.resolve().then(() => {
                    tour.next();
                    return { hide: true };
                });
            }
            // Scroll the panel into view
            rightPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return Promise.resolve();
        }
    });

    // Posted Jobs Card
    tour.addStep({
        id: 'posted-jobs-card',
        title: 'Posted Jobs',
        text: 'Track all the job positions you have posted.',
        attachTo: {
            element: '.dashboard-card-2.block-gradient',
            on: 'top'
        }
    });

    // Generated CVs Card
    tour.addStep({
        id: 'generated-cvs-card',
        title: 'Generated CVs',
        text: 'View the number of CVs generated through the platform.',
        attachTo: {
            element: '.dashboard-card-2.block-gradient-2',
            on: 'top'
        }
    });

    // Assigned Tokens Card
    tour.addStep({
        id: 'assigned-tokens-card',
        title: 'Assigned Tokens',
        text: 'Check your available tokens for platform services.',
        attachTo: {
            element: '.dashboard-card-2.block-gradient-3',
            on: 'top'
        }
    });

    // Tokens Consumed Card
    tour.addStep({
        id: 'tokens-consumed-card',
        title: 'Tokens Consumed',
        text: 'Monitor your token usage and expenses.',
        attachTo: {
            element: '.dashboard-card-2.block-gradient-4',
            on: 'top'
        }
    });

    // How It Works Section - Overview
    tour.addStep({
        id: 'how-it-works-intro',
        title: 'How It Works',
        text: 'Follow these simple steps to get the most out of our platform:',
        attachTo: {
            element: '.section-head.left.wt-small-separator-outer',
            on: 'top'
        }
    });

    // Step 1: Register Your Account
    tour.addStep({
        id: 'register-account',
        title: '1. Register Your Account',
        text: 'Create an account to access the best job matching and CV generation features.',
        attachTo: {
            element: '.bg-clr-sky-light',
            on: 'top'
        }
    });

    // Step 2: Match Your Job
    tour.addStep({
        id: 'match-job',
        title: '2. Match Your Job',
        text: 'Our system will analyze and match your profile with the most relevant job opportunities.',
        attachTo: {
            element: '.bg-clr-yellow-light',
            on: 'top'
        }
    });

    // Step 3: Career Recommendations
    tour.addStep({
        id: 'career-recommendations',
        title: '3. Career Recommendations',
        text: 'Receive personalized career recommendations based on your profile and skills.',
        attachTo: {
            element: '.bg-clr-pink-light',
            on: 'top'
        }
    });

    // Step 4: Generate Your Resume
    tour.addStep({
        id: 'generate-resume',
        title: '4. Generate Your Resume',
        text: 'Let us create a professional CV tailored to your profile and career goals.',
        attachTo: {
            element: '.bg-clr-green-light',
            on: 'top'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back,
                classes: 'shepherd-button-secondary'
            },
            {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-primary'
            }
        ]
    });

    // Final Step
    tour.addStep({
        id: 'complete',
        title: 'Tour Complete!',
        text: 'You now know how to navigate and use the dashboard.',
        buttons: [
            {
                text: 'Finish',
                action: tour.complete,
                classes: 'shepherd-button-primary'
            }
        ]
    });

    // Auto-start the tour if it's the user's first visit to this page
    const startTourIfNeeded = () => {
        try {
            const tourShown = localStorage.getItem('dashboardTourShown');
            if (tourShown !== 'true') {
                setTimeout(() => {
                    startTour();
                    // Set the flag when the tour is manually started or completed
                    localStorage.setItem('dashboardTourShown', 'true');
                }, 1000);
            }
        } catch (e) {
            console.error('Error accessing localStorage:', e);
        }
    };

    // Only auto-start the tour on page load if it hasn't been shown before
    if (document.readyState === 'complete') {
        startTourIfNeeded();
    } else {
        window.addEventListener('load', startTourIfNeeded);
    }

    // Update the tour trigger to set the flag when manually started
    const tourTrigger = document.getElementById('triggertour');
    if (tourTrigger) {
        tourTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            localStorage.setItem('dashboardTourShown', 'true');
            startTour();
        });
    }
});