/**
 * Profile Page Tour using Shepherd.js
 * Provides an interactive tour of the profile page features
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

    // Welcome step
    tour.addStep({
        id: 'welcome',
        title: 'Welcome to Your Profile',
        text: 'This tour will guide you through your profile page and its features.',
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

    // Main Content Area
    tour.addStep({
        id: 'main-content',
        title: 'Your Profile',
        text: 'This is where you can view and edit your profile information.',
        attachTo: {
            element: '.page-content',
            on: 'top'
        }
    });

    // Profile Form
    tour.addStep({
        id: 'profile-form',
        title: 'Profile Information',
        text: 'Update your personal details, contact information, and professional summary here.',
        attachTo: {
            element: 'form[role="form"]',
            on: 'top'
        }
    });

    // Final Step
    tour.addStep({
        id: 'complete',
        title: 'Tour Complete!',
        text: 'You now know how to navigate your profile. Remember to save any changes you make!',
        buttons: [
            {
                text: 'Finish',
                action: tour.complete,
                classes: 'shepherd-button-primary'
            }
        ]
    });

    // Add event listener for the tour trigger button
    const tourTrigger = document.getElementById('triggertour');
    if (tourTrigger) {
        tourTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startTour();
        });
    }

    // Auto-start tour on first visit
    if (!localStorage.getItem('profileTourCompleted')) {
        setTimeout(() => {
            startTour();
            localStorage.setItem('profileTourCompleted', 'true');
        }, 1000);
    }
});
        title: 'Work Experience',
        text: 'Add and manage your work history to showcase your professional background.',
        attachTo: {
            element: '.twm-dash-my-resume',
            on: 'top'
        }
    });

    // Education
    tour.addStep({
        id: 'education',
        title: 'Education',
        text: 'Add your educational background to complete your professional profile.',
        attachTo: {
            element: '.twm-dash-my-education',
            on: 'top'
        }
    });

    // Account Settings
    tour.addStep({
        id: 'account-settings',
        title: 'Account Settings',
        text: 'Update your account settings, password, and notification preferences.',
        attachTo: {
            element: '.twm-dash-account-settings',
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

    // Add event listener for the tour trigger button
    const tourTrigger = document.getElementById('triggertour');
    if (tourTrigger) {
        tourTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            startTour();
        });
    }

    // Auto-start tour on first visit
    if (!localStorage.getItem('profileTourCompleted')) {
        setTimeout(() => {
            startTour();
            localStorage.setItem('profileTourCompleted', 'true');
        }, 1000);
    }
});