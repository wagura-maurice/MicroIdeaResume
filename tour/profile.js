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

    // Profile Navigation
    tour.addStep({
        id: 'profile-navigation',
        title: 'Profile Navigation',
        text: 'Use the left sidebar to navigate between different sections of your profile.',
        attachTo: {
            element: '.side-bar-st-1',
            on: 'right'
        }
    });

    // Profile Overview Section
    tour.addStep({
        id: 'profile-overview',
        title: 'Profile Overview',
        text: 'This section shows your basic profile information and statistics.',
        attachTo: {
            element: '.twm-dash-candidates-profile',
            on: 'top'
        }
    });

    // Personal Information
    tour.addStep({
        id: 'personal-info',
        title: 'Personal Information',
        text: 'View and edit your personal details, contact information, and professional summary.',
        attachTo: {
            element: '.twm-dashboard-account-detail',
            on: 'top'
        }
    });

    // Profile Completion
    tour.addStep({
        id: 'profile-completion',
        title: 'Profile Completion',
        text: 'Track your profile completion status and see what information you can add to improve your profile.',
        attachTo: {
            element: '.twm-dash-profile-complete',
            on: 'top'
        }
    });

    // Skills & Expertise
    tour.addStep({
        id: 'skills-expertise',
        title: 'Skills & Expertise',
        text: 'Manage your skills and expertise to help match with relevant opportunities.',
        attachTo: {
            element: '.twm-dash-my-skills',
            on: 'top'
        }
    });

    // Work Experience
    tour.addStep({
        id: 'work-experience',
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