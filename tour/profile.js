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

    // Basic Information Section
    tour.addStep({
        id: 'basic-information',
        title: 'Basic Information',
        text: 'This section contains your basic personal information such as name, email, and contact details.',
        attachTo: {
            element: 'form[role="form"]',
            on: 'top'
        }
    });

    // Save Changes Button (Basic Info)
    tour.addStep({
        id: 'save-changes-basic',
        title: 'Save Your Changes',
        text: 'After updating your basic information, click this button to save your changes.',
        attachTo: {
            element: 'button[type="submit"]',
            on: 'top'
        },
        scrollTo: true
    });

    // Social Network Section
    tour.addStep({
        id: 'social-network',
        title: 'Social Network',
        text: 'Connect your social media profiles to enhance your professional network.',
        attachTo: {
            element: 'h4:contains("Social Network")',
            on: 'top'
        },
        scrollTo: true
    });

    // Save Changes Button (Social Network)
    tour.addStep({
        id: 'save-changes-social',
        title: 'Save Social Media Links',
        text: 'Remember to save any changes made to your social media links.',
        attachTo: {
            element: 'button[type="submit"]',
            on: 'top'
        },
        scrollTo: true
    });

    // Attach Resume Section
    tour.addStep({
        id: 'attach-resume',
        title: 'Attach Resume',
        text: 'Upload your resume/CV to make it easier to apply for jobs and share your professional background.',
        attachTo: {
            element: 'h4:contains("Attach Resume")',
            on: 'top'
        },
        scrollTo: true
    });

    // Select CV File Button
    tour.addStep({
        id: 'select-cv',
        title: 'Upload Your CV',
        text: 'Click here to select and upload your CV file from your device.',
        attachTo: {
            element: 'input[type="file"]',
            on: 'top'
        },
        scrollTo: true
    });

    // Final Step
    tour.addStep({
        id: 'complete',
        title: 'Tour Complete!',
        text: 'You now know how to navigate and update your profile. Remember to save any changes you make!',
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