// Y-Center Nepal - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNavigation = document.querySelector('.main-navigation');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNavigation.classList.toggle('active');
        });
    }
    
    // User Dropdown (for dashboard)
    const userButton = document.querySelector('.user-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (userButton && dropdownMenu) {
        userButton.addEventListener('click', function() {
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }
    
    // FAQ Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.toggle-icon i');
                
                // Toggle answer visibility
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    
    if (testimonialSlider && testimonialItems.length > 0) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Next slide function
        function nextSlide() {
            testimonialItems[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            testimonialItems[currentSlide].style.display = 'block';
        }
        
        // Previous slide function
        function prevSlide() {
            testimonialItems[currentSlide].style.display = 'none';
            currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
            testimonialItems[currentSlide].style.display = 'block';
        }
        
        // Add event listeners to navigation buttons
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Accessibility Features
    const highContrastToggle = document.querySelector('.high-contrast-toggle');
    const textResizeSmaller = document.querySelector('.text-resize-smaller');
    const textResizeReset = document.querySelector('.text-resize-reset');
    const textResizeLarger = document.querySelector('.text-resize-larger');
    
    // High contrast mode
    if (highContrastToggle) {
        highContrastToggle.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            
            // Save preference to localStorage
            if (document.body.classList.contains('high-contrast')) {
                localStorage.setItem('highContrast', 'true');
            } else {
                localStorage.setItem('highContrast', 'false');
            }
        });
        
        // Check for saved preference
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
    }
    
    // Text resizing
    let currentFontSize = 100;
    
    if (textResizeSmaller) {
        textResizeSmaller.addEventListener('click', function() {
            if (currentFontSize > 80) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
    }
    
    if (textResizeReset) {
        textResizeReset.addEventListener('click', function() {
            currentFontSize = 100;
            document.body.style.fontSize = '100%';
            localStorage.setItem('fontSize', currentFontSize);
        });
    }
    
    if (textResizeLarger) {
        textResizeLarger.addEventListener('click', function() {
            if (currentFontSize < 130) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
                localStorage.setItem('fontSize', currentFontSize);
            }
        });
    }
    
    // Check for saved font size preference
    if (localStorage.getItem('fontSize')) {
        currentFontSize = parseInt(localStorage.getItem('fontSize'));
        document.body.style.fontSize = currentFontSize + '%';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
