/**
 * Multi-Page Portfolio Website JavaScript
 * Handles navigation, animations, and interactions
 */

// ========================================
// Navigation Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // Typing Animation for Name
    // ========================================
    
    const nameElement = document.querySelector('.hero-title .highlight');
    if (nameElement) {
        const fullName = 'Ayush Tyagi';
        nameElement.textContent = '';
        nameElement.style.borderRight = '3px solid var(--accent-primary)';
        nameElement.style.paddingRight = '5px';
        
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < fullName.length) {
                nameElement.textContent += fullName.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    nameElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .education-card, .timeline-item, .contact-method'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // Projects Filter Functionality
    // ========================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ========================================
    // ========================================
    // Contact Form Validation
    // ========================================
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('has-error');
            });
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - show success message
                showSuccessMessage();
                contactForm.reset();
            }
        });
        
        // Real-time validation on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    showError(this, this.getAttribute('placeholder') + ' is required');
                } else {
                    hideError(this);
                    if (this.type === 'email' && !isValidEmail(this.value)) {
                        showError(this, 'Please enter a valid email');
                    }
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    hideError(this);
                }
            });
        });
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('has-error');
        const errorElement = formGroup.querySelector('.error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function hideError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('has-error');
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 217, 255, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        successDiv.innerHTML = `
            <strong>Success!</strong><br>
            Your message has been sent. I'll get back to you soon!
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 5000);
    }
    
    // ========================================
    // Smooth Scrolling (for in-page anchors)
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Typing Effect for Hero Subtitle (Home Page)
    // ========================================
    
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text');
        typingElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // ========================================
    // Console Easter Egg
    // ========================================
    
    console.log('%c👋 Welcome to My Portfolio!', 'color: #00d9ff; font-size: 24px; font-weight: bold;');
    console.log('%c🚀 Interested in working together?', 'color: #7c3aed; font-size: 16px;');
    console.log('%c📧 Let\'s connect!', 'color: #06b6d4; font-size: 14px;');
});

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        if (!timeout) {
            timeout = setTimeout(() => {
                func(...args);
                timeout = null;
            }, wait);
        }
    };
}

// ========================================
// Contact Form Handler
// ========================================

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formStatus = document.getElementById('form-status');
        
        // Validation
        let isValid = true;
        const errors = {
            name: '',
            email: '',
            subject: '',
            message: ''
        };
        
        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
        }
        
        if (!email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }
        
        if (!subject) {
            errors.subject = 'Subject is required';
            isValid = false;
        }
        
        if (!message) {
            errors.message = 'Message is required';
            isValid = false;
        } else if (message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        // Display error messages
        document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
        
        Object.keys(errors).forEach(field => {
            if (errors[field]) {
                const errorEl = document.querySelector(`input[name="${field}"], textarea[name="${field}"]`).nextElementSibling;
                if (errorEl) {
                    errorEl.textContent = errors[field];
                    errorEl.style.display = 'block';
                }
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        formStatus.style.display = 'block';
        formStatus.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        formStatus.style.borderLeft = '4px solid #3b82f6';
        formStatus.style.color = '#3b82f6';
        formStatus.textContent = 'Sending your message...';
        
        try {
            // Send email via Web3Forms
            const formData = new FormData();
            formData.append('access_key', 'ab3b8a38-b832-4b51-b378-15b3af5ee9c2');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                formStatus.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
                formStatus.style.borderLeft = '4px solid #22c55e';
                formStatus.style.color = '#22c55e';
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
                document.querySelectorAll('.error').forEach(el => el.textContent = '');
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                throw new Error(result.message || 'Form submission failed');
            }
        } catch (error) {
            formStatus.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            formStatus.style.borderLeft = '4px solid #ef4444';
            formStatus.style.color = '#ef4444';
            formStatus.textContent = '✗ Error sending message. Please email me directly at ayushtyagi1337@gmail.com';
        }
    });
}
