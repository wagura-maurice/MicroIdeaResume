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

// Helper function to check if element exists and highlight it
function checkElementExists(selector, highlight = false, textContent = '') {
    return function() {
        // Get all matching elements
        const elements = Array.from(document.querySelectorAll(selector));
        let el = elements[0]; // Default to first match
        
        // If we're looking for specific text content
        if (textContent) {
            const found = elements.find(el => 
                el.textContent && 
                el.textContent.trim().toLowerCase().includes(textContent.toLowerCase())
            );
            if (found) el = found;
        }
        
        if (!el) {
            return Promise.resolve().then(() => {
                tour.next();
                return { hide: true };
            });
        }
        
        if (highlight) {
            el.classList.add('shepherd-highlight');
            setTimeout(() => el.classList.remove('shepherd-highlight'), 1500);
        }
        
        // Smooth scroll to element with offset
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
        
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
        text: 'This section contains your basic information, your social network and attach resume sections.',
        attachTo: {
            element: '.twm-right-section-panel.site-bg-gray',
            on: 'top'
        },
        scrollTo: true
    });

    // Form Fields Section
    // tour.addStep({
    //     id: 'form-fields',
    //     title: 'Update Your Details',
    //     text: 'You can update your personal information in these form fields. Make sure to fill in all required fields marked with an asterisk (*).',
    //     attachTo: {
    //         element: 'form[role="form"]',
    //         on: 'top'
    //     },
    //     scrollTo: true
    // });

    // Basic Information Section
    tour.addStep({
        id: 'basic-info-section',
        title: 'Basic Information',
        text: 'Update your personal details in this section. All required fields must be filled in correctly.',
        attachTo: {
            element: '.panel-body wt-panel-body p-a20 m-b30',
            on: 'top'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        beforeShowPromise: checkElementExists('.panel-body wt-panel-body p-a20 m-b30', true, 'Basic Information')
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
        scrollTo: { behavior: 'smooth', block: 'center' },
        beforeShowPromise: checkElementExists('#SaveData', true)
    });

    // Social Media Section
    tour.addStep({
        id: 'social-media-section',
        title: 'Social Media',
        text: 'Connect your social media profiles to enhance your professional network.',
        attachTo: {
            element: '[id*="social"], [id*="Social"], h4',
            on: 'top'
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        beforeShowPromise: checkElementExists('[id*="social"], [id*="Social"], h4', true, 'Social Network')
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
        scrollTo: { behavior: 'smooth', block: 'center' },
        beforeShowPromise: checkElementExists('#SaveSocial', true)
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
        scrollTo: { behavior: 'smooth', block: 'center' },
        beforeShowPromise: checkElementExists('#uploadButton', true)
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