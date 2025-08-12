/**
 * Change Password Page Tour using Shepherd.js
 * Provides an interactive tour of the change password page features
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
function createCheckElementExists(tour) {
    return function(selector, highlight = false, textContent = '') {
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
                    if (tour) tour.next();
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
    };
}

document.addEventListener('DOMContentLoaded', () => {
    waitForJQuery(function() {
        const tour = initializeTour();
        const checkElementExists = createCheckElementExists(tour);
        
        const startTour = () => {
            if (tour.isActive()) tour.complete();
            tour.start();
        };

        // Welcome Step
        tour.addStep({
            id: 'welcome',
            title: 'Change Your Password',
            text: 'Welcome to the password change page. This tour will guide you through updating your password.',
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

        // Change Password Section
        tour.addStep({
            id: 'change-password-section',
            title: 'Change Password',
            text: 'This section contains your change password form.',
            attachTo: {
                element: '.twm-right-section-panel .site-bg-gray',
                on: 'top'
            },
            scrollTo: true
        });

        // Current Password Field
        // tour.addStep({
        //     id: 'current-password',
        //     title: 'Current Password',
        //     text: 'Enter your current password here.',
        //     attachTo: {
        //         element: '#id_old_password',
        //         on: 'top'
        //     },
        //     scrollTo: { behavior: 'smooth', block: 'center' },
        //     beforeShowPromise: checkElementExists('#id_old_password', true)
        // });

        // New Password Field
        // tour.addStep({
        //     id: 'new-password',
        //     title: 'New Password',
        //     text: 'Enter your new password here. Make sure it\'s strong and secure!',
        //     attachTo: {
        //         element: '#id_new_password1',
        //         on: 'top'
        //     },
        //     scrollTo: { behavior: 'smooth', block: 'center' },
        //     beforeShowPromise: checkElementExists('#id_new_password1', true)
        // });

        // Confirm New Password Field
        // tour.addStep({
        //     id: 'confirm-password',
        //     title: 'Confirm New Password',
        //     text: 'Re-enter your new password to confirm it matches.',
        //     attachTo: {
        //         element: '#id_new_password2',
        //         on: 'top'
        //     },
        //     scrollTo: { behavior: 'smooth', block: 'center' },
        //     beforeShowPromise: checkElementExists('#id_new_password2', true)
        // });

        // Save Button - Look for submit button in the form
        tour.addStep({
            id: 'save-changes',
            title: 'Save Changes',
            text: 'Click this button to update your password.',
            attachTo: {
                element: 'form[action*="password/change/"] button[type="submit"], form[action*="password/change/"] input[type="submit"], .change-password-form .btn-primary',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('form[action*="password/change/"] button[type="submit"], form[action*="password/change/"] input[type="submit"], .change-password-form .btn-primary', true)
        });

        // Final Step
        tour.addStep({
            id: 'complete',
            title: 'Tour Complete!',
            text: 'You now know how to change your password. Remember to keep your password secure and never share it with anyone.',
            buttons: [
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

        // Auto-start the tour if it's the user's first visit
        const startTourIfNeeded = () => {
            if (!sessionStorage.getItem('changepasswordTourShown')) {
                setTimeout(() => {
                    startTour();
                    sessionStorage.setItem('changepasswordTourShown', 'true');
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