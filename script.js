// Mobile navigation menu
const initializeMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navContent = document.querySelector('.nav-content');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-button')) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '&#9776;';
        menuButton.className = 'mobile-menu-button';
        
        // Toggle menu on button click
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navContent.classList.toggle('show');
            menuButton.innerHTML = navContent.classList.contains('show') ? '&#10006;' : '&#9776;';
        });

        nav.insertBefore(menuButton, navContent);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navContent.classList.remove('show');
            const menuButton = document.querySelector('.mobile-menu-button');
            if (menuButton) {
                menuButton.innerHTML = '&#9776;';
            }
        }
    });
};

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const navContent = document.querySelector('.nav-content');
        const menuButton = document.querySelector('.mobile-menu-button');
        navContent.classList.remove('show');
        if (menuButton) {
            menuButton.innerHTML = '&#9776;';
        }
    });
});

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Mobile Menu Functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navContent = document.querySelector('.nav-content');
const navItems = document.querySelectorAll('.nav-item');

function toggleMobileMenu(forceClose = false) {
    if (forceClose) {
        mobileMenuButton.classList.remove('active');
        navContent.classList.remove('show');
        document.body.classList.remove('menu-open');
        return;
    }
    mobileMenuButton.classList.toggle('active');
    navContent.classList.toggle('show');
    document.body.classList.toggle('menu-open');
}

// Toggle menu on button click
mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navContent.classList.contains('show')) {
        toggleMobileMenu(true);
    }
});

// Close menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent default to handle scroll manually
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Close menu first
            toggleMobileMenu(true);
            
            // Then scroll to section after a small delay
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL without triggering scroll
                history.pushState(null, '', targetId);
                
                // Update active state
                navItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
            }, 300); // Match this with your CSS transition time
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        toggleMobileMenu(true);
    }
});

// Update active nav item on scroll
function updateActiveNavItem() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const offset = 100; // Offset to trigger active state earlier

    sections.forEach(section => {
        const sectionTop = section.offsetTop - offset;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navItems.forEach(item => item.classList.remove('active'));
            navItem?.classList.add('active');
        }
    });
}

// Update active nav item on scroll with throttling
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveNavItem();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initialize active nav item on page load
document.addEventListener('DOMContentLoaded', updateActiveNavItem);

// Update active nav item on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        const navItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            navItem?.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Security Key Functionality
const securityKey = 'pranav2050';
const modal = document.getElementById('securityModal');
const closeModal = document.querySelector('.close-modal');
const unlockButton = document.getElementById('unlockButton');
const securityInput = document.getElementById('securityKey');
const maskedElements = document.querySelectorAll('.masked-info');
let isUnlocked = false;

// Show modal when clicking on masked info
maskedElements.forEach(element => {
    element.addEventListener('click', () => {
        if (!isUnlocked) {
            modal.style.display = 'block';
            securityInput.focus();
        }
    });
});

// Close modal when clicking on X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    securityInput.value = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        securityInput.value = '';
    }
});

function revealInformation() {
    const enteredKey = securityInput.value;
    if (enteredKey === securityKey) {
        maskedElements.forEach(element => {
            element.textContent = element.dataset.real;
            element.classList.add('revealed');
            element.style.cursor = 'text';
        });
        isUnlocked = true;
        modal.style.display = 'none';
        // Remove the modal from DOM since it's no longer needed
        setTimeout(() => {
            modal.remove();
        }, 300);
    } else {
        alert('Incorrect security key. Please try again.');
        securityInput.value = '';
    }
}

unlockButton.addEventListener('click', revealInformation);
securityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        revealInformation();
    }
});

// Clear security input when page loads
window.addEventListener('load', () => {
    securityInput.value = '';
    isUnlocked = false;
});

// Form validation for contact form (if added later)
function validateForm(event) {
    const form = event.target;
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    let isValid = true;

    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        isValid = false;
    }

    if (message && message.value.length < 10) {
        alert('Message must be at least 10 characters long');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
}

// Add this to any contact forms you create later
// document.querySelector('form').addEventListener('submit', validateForm);
