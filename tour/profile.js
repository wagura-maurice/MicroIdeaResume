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
// Wait for jQuery to be loaded
function waitForJQuery(callback) {
    if (window.jQuery) {
        callback();
    } else {
        setTimeout(function() {
            waitForJQuery(callback);
        }, 100);
    }
}

// Helper function to check if element exists
function checkElementExists(selector) {
    return function() {
        if (!document.querySelector(selector)) {
            return Promise.resolve().then(() => {
                tour.next();
                return { hide: true };
            });
        }
        return Promise.resolve();
    };
}

document.addEventListener('DOMContentLoaded', () => {
    waitForJQuery(function() {
        // Check if multiselect is available, if not, define a dummy function to prevent errors
        if (typeof $.fn.multiselect === 'undefined') {
            $.fn.multiselect = function() {
                return this;
            };
        }
        
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
        title: 'Profile Information',
        text: 'This section contains your basic personal information such as name, email, and contact details.',
        attachTo: {
            element: '.page-content',
            on: 'top'
        },
        scrollTo: true
    });

    // Form Fields Section
    tour.addStep({
        id: 'form-fields',
        title: 'Update Your Details',
        text: 'You can update your personal information in these form fields. Make sure to fill in all required fields marked with an asterisk (*).',
        attachTo: {
            element: 'form[role="form"]',
            on: 'top'
        },
        scrollTo: true
    });

    // Basic Information Section
    tour.addStep({
        id: 'basic-info-section',
        title: 'Basic Information',
        text: 'Update your personal details in this section. Make sure all required fields are filled in correctly.',
        attachTo: {
            element: 'form[role="form"]',
            on: 'top'
        },
        scrollTo: true
    });

    // Basic Info Save Button
    tour.addStep({
        id: 'save-basic-info',
        title: 'Save Basic Information',
        text: 'Click this button to save your basic information after making any changes.',
        attachTo: {
            element: '#SaveData',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: checkElementExists('#SaveData')
    });

    // Social Media Section
    tour.addStep({
        id: 'social-media-section',
        title: 'Social Media',
        text: 'Connect your social media profiles to enhance your professional network.',
        attachTo: {
            element: '#SaveSocial',
            on: 'left'
        },
        scrollTo: true,
        beforeShowPromise: checkElementExists('#SaveSocial')
    });

    // Social Media Save Button
    tour.addStep({
        id: 'save-social-media',
        title: 'Save Social Media',
        text: 'Click this button to save your social media links.',
        attachTo: {
            element: '#SaveSocial',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: checkElementExists('#SaveSocial')
    });

    // CV Upload Section
    tour.addStep({
        id: 'cv-upload-section',
        title: 'Upload Your CV',
        text: 'Click this button to select and upload your CV file from your device.',
        attachTo: {
            element: '#uploadButton',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: checkElementExists('#uploadButton')
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
            // Wait a bit longer to ensure all elements are loaded
            setTimeout(() => {
                startTour();
                localStorage.setItem('profileTourCompleted', 'true');
            }, 1500);
        }
    }); // End of waitForJQuery callback
});