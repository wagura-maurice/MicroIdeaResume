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

    // Save Button
    tour.addStep({
        id: 'save-button',
        title: 'Save Your Changes',
        text: 'After making any updates to your profile, click this button to save your changes.',
        attachTo: {
            element: 'button[type="submit"], .btn-primary',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: function() {
            // If we can't find the submit button, skip this step
            if (!document.querySelector('button[type="submit"], .btn-primary')) {
                return Promise.resolve().then(() => {
                    tour.next();
                    return { hide: true };
                });
            }
            return Promise.resolve();
        }
    });

    // Social Media Section (if exists)
    tour.addStep({
        id: 'social-media',
        title: 'Social Media',
        text: 'Connect your social media profiles to enhance your professional network.',
        attachTo: {
            element: '.social-media-section, .social-links, .social-profiles',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: function() {
            // Skip this step if social media section is not found
            if (!document.querySelector('.social-media-section, .social-links, .social-profiles')) {
                return Promise.resolve().then(() => {
                    tour.next();
                    return { hide: true };
                });
            }
            return Promise.resolve();
        }
    });

    // Resume Upload Section (if exists)
    tour.addStep({
        id: 'resume-upload',
        title: 'Upload Resume',
        text: 'You can upload your resume/CV here to make it easier to apply for jobs.',
        attachTo: {
            element: '.resume-upload, .file-upload, .upload-section',
            on: 'top'
        },
        scrollTo: true,
        beforeShowPromise: function() {
            // Skip this step if resume upload section is not found
            if (!document.querySelector('.resume-upload, .file-upload, .upload-section')) {
                return Promise.resolve().then(() => {
                    tour.next();
                    return { hide: true };
                });
            }
            return Promise.resolve();
        }
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