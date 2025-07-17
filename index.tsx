
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Sticky Header Style ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Prevent default only for internal links, allowing modal CTAs to work
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Fade-in on scroll animation ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // --- Form Submission ---
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your request! We will be in touch shortly.');
            (form as HTMLFormElement).reset();
        });
    }

    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    function openModal(title: string, content: string) {
        if (!modal || !modalTitle || !modalBody) return;
        
        modalTitle.innerHTML = title;
        modalBody.innerHTML = content;
        
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const title = (trigger as HTMLElement).dataset.modalTitle;
            const content = (trigger as HTMLElement).dataset.modalContent;
            if (title && content) {
                openModal(title, content);
            }
        });
    });

    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            // Close if clicked on the overlay, but not on the content
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle clicks inside the modal that are anchor links
    if (modalBody) {
        modalBody.addEventListener('click', (e) => {
            if (e.target instanceof HTMLAnchorElement && e.target.getAttribute('href')?.startsWith('#')) {
                closeModal();
            }
        });
    }
});
