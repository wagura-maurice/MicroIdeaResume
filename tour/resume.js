// Initialize Shepherd.js tour for the resume page
function initializeTour() {
    return new Shepherd.Tour({
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
                    secondary: true
                },
                {
                    text: 'Next',
                    action: function() { return this.next(); }
                }
            ]
        }
    });
}

// Helper function to check if element exists and handle the promise
function createCheckElementExists(tour) {
    return function(selector, scrollToElement = false) {
        return new Promise((resolve) => {
            const el = document.querySelector(selector);
            if (!el) {
                console.warn(`Element not found: ${selector}`);
                tour.next();
                return resolve();
            }
            
            if (scrollToElement) {
                el.classList.add('shepherd-highlight');
                setTimeout(() => el.classList.remove('shepherd-highlight'), 1500);
                
                const yOffset = -80;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
            
            resolve();
        });
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait for jQuery to be loaded
    const waitForJQuery = (callback) => {
        if (window.jQuery) {
            callback();
        } else {
            setTimeout(() => waitForJQuery(callback), 100);
        }
    };

    waitForJQuery(function() {
        const tour = initializeTour();
        const checkElementExists = createCheckElementExists(tour);
        
        // Function to start the tour
        const startTour = () => {
            if (tour.isActive()) {
                tour.complete();
            }
            tour.start();
        };

        // Welcome Step
        tour.addStep({
            id: 'welcome',
            title: 'Resume Management',
            text: 'Welcome to your resume management page. This tour will guide you through managing your resumes and CVs.',
            attachTo: {
                element: '.logo-header',
                on: 'bottom'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
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

        // Resume Headline Section
        tour.addStep({
            id: 'resume-headline',
            title: 'Resume Headline',
            text: 'This is your professional headline that appears at the top of your resume. Make it catchy and relevant to your career goals.',
            attachTo: {
                element: '#resume_headline_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#resume_headline_div', true)
        });

        // Resume Headline Edit Button
        tour.addStep({
            id: 'resume-headline-edit',
            title: 'Edit Headline',
            text: 'Click the edit button to update your professional headline.',
            attachTo: {
                element: '#resume_headline_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#resume_headline_edit', true)
        });

        // Key Skills Section
        tour.addStep({
            id: 'key-skills',
            title: 'Key Skills',
            text: 'List your core competencies and technical skills here. These help employers quickly identify your areas of expertise.',
            attachTo: {
                element: '#key_skills_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#key_skills_div', true)
        });

        // Key Skills Edit Button
        tour.addStep({
            id: 'key-skills-edit',
            title: 'Edit Skills',
            text: 'Click here to add, remove, or update your key skills.',
            attachTo: {
                element: '#key_skills_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#key_skills_edit', true)
        });

        // Employment Section
        tour.addStep({
            id: 'employment',
            title: 'Work Experience',
            text: 'Detail your professional work history, including company names, positions, and key achievements.',
            attachTo: {
                element: '#employment_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#employment_div', true)
        });

        // Employment Edit Button
        tour.addStep({
            id: 'employment-edit',
            title: 'Edit Work Experience',
            text: 'Click here to add or update your work experience details.',
            attachTo: {
                element: '#employment_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#employment_edit', true)
        });

        // Education Section
        tour.addStep({
            id: 'education',
            title: 'Education',
            text: 'Add your academic qualifications, including degrees, institutions, and graduation dates.',
            attachTo: {
                element: '#education_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#education_div', true)
        });

        // Education Edit Button
        tour.addStep({
            id: 'education-edit',
            title: 'Edit Education',
            text: 'Click here to update your educational background and qualifications.',
            attachTo: {
                element: '#education_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#education_edit', true)
        });

        // Accomplishments Section
        tour.addStep({
            id: 'accomplishments',
            title: 'Accomplishments',
            text: 'Highlight your professional achievements, awards, and significant contributions.',
            attachTo: {
                element: '#accomplishment_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#accomplishment_div', true)
        });

        // Work Samples Section
        tour.addStep({
            id: 'work-samples',
            title: 'Work Samples',
            text: 'Showcase examples of your work, projects, or portfolio pieces to demonstrate your skills.',
            attachTo: {
                element: '#work_sample_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#work_sample_div', true)
        });

        // Work Samples Edit Button
        tour.addStep({
            id: 'work-samples-edit',
            title: 'Edit Work Samples',
            text: 'Click here to add or update your work samples and portfolio items.',
            attachTo: {
                element: '#work_sample_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#work_sample_edit', true)
        });

        // Papers / Research Publications / Journals Section
        tour.addStep({
            id: 'papers',
            title: 'Papers / Research Publications / Journals',
            text: 'List any papers, research publications, or journals you\'ve obtained.',
            attachTo: {
                element: '#research_publication_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#research_publication_div', true)
        });

        // Papers / Research Publications / Journals Edit Button
        tour.addStep({
            id: 'papers-edit',
            title: 'Edit Papers / Research Publications / Journals',
            text: 'Click here to add or update your papers, research publications, or journals. For deletion press on thew red button when you hoaver on the listed item.',
            attachTo: {
                element: '#research_publication_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#research_publication_edit', true)
        });

        // Certifications Section
        tour.addStep({
            id: 'certifications',
            title: 'Certifications',
            text: 'List any professional certifications or licenses you\'ve obtained.',
            attachTo: {
                element: '#certification_div',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#certification_div', true)
        });

        // Certifications Edit Button
        tour.addStep({
            id: 'certifications-edit',
            title: 'Edit Certifications',
            text: 'Click here to add or update your professional certifications and licenses.',
            attachTo: {
                element: '#certification_edit',
                on: 'left'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            beforeShowPromise: checkElementExists('#certification_edit', true)
        });

        // Edit Buttons Information
        tour.addStep({
            id: 'edit-buttons',
            title: 'Editing Your Information',
            text: 'Look for the edit icons next to each section to update your information at any time.',
            attachTo: {
                element: '.content-admin-main',
                on: 'top'
            },
            scrollTo: { behavior: 'smooth', block: 'center' },
            when: {
                show: function() {
                    const step = this;
                    // Add a small delay to ensure the step is fully rendered
                    setTimeout(() => {
                        const textElement = step.el.querySelector('.shepherd-text');
                        if (textElement) {
                            textElement.innerHTML = 
                                'Look for the edit icons (<i class="fas fa-edit"></i>) next to each section to update your information at any time.';
                        }
                    }, 100);
                }
            }
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
                startTour();
            });
        }

        // Auto-start the tour if it's the user's first visit to this page
        const startTourIfNeeded = () => {
            if (!sessionStorage.getItem('resumeTourShown')) {
                setTimeout(() => {
                    startTour();
                    sessionStorage.setItem('resumeTourShown', 'true');
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