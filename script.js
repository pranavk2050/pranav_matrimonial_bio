// Mobile navigation menu
const initializeMobileMenu = () => {
    const nav = document.querySelector('nav');
    const navContent = document.querySelector('.nav-content');
    
    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-button')) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.className = 'mobile-menu-button';
        
        // Toggle menu on button click
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            navContent.classList.toggle('show');
            menuButton.innerHTML = navContent.classList.contains('show') ? '✕' : '☰';
        });

        nav.insertBefore(menuButton, navContent);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navContent.classList.remove('show');
            const menuButton = document.querySelector('.mobile-menu-button');
            if (menuButton) {
                menuButton.innerHTML = '☰';
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
            menuButton.innerHTML = '☰';
        }
    });
});

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

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

// Handle window resize
window.addEventListener('resize', () => {
    const navContent = document.querySelector('.nav-content');
    const menuButton = document.querySelector('.mobile-menu-button');
    
    if (window.innerWidth > 768) {
        navContent.style.display = 'flex';
        if (menuButton) {
            menuButton.style.display = 'none';
        }
    } else {
        if (menuButton) {
            menuButton.style.display = 'block';
        }
        if (!navContent.classList.contains('show')) {
            navContent.style.display = 'none';
        }
    }
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

// Security Key Functionality
const securityKey = 'pranav2050'; // You can change this to any key you want
const unlockButton = document.getElementById('unlockButton');
const securityInput = document.getElementById('securityKey');
const maskedElements = document.querySelectorAll('.masked-info');

function revealInformation() {
    const enteredKey = securityInput.value;
    if (enteredKey === securityKey) {
        maskedElements.forEach(element => {
            element.textContent = element.dataset.real;
            element.classList.add('revealed');
        });
        // Show success message
        alert('Information unlocked successfully!');
    } else {
        // Show error message
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
});
