// Enhanced JavaScript for The Cadet Store

// Menu toggle functionality
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Header scroll effect
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Add scrolled class to header when scrolling
    let header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    let scrollTop = document.querySelector('.scroll-top');
    if (window.scrollY > 500) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }

    // Animate sections on scroll
    animateOnScroll();
};

// Image slider functionality
document.querySelectorAll('.image-slider img').forEach(images => {
    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector('.main-home-image').src = src;

        // Add click animation
        images.style.transform = 'scale(0.95)';
        setTimeout(() => {
            images.style.transform = 'scale(1)';
        }, 150);
    };
});

// Swiper configuration for reviews
var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        }
    },
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-top')) {
        let scrollTopBtn = document.createElement('div');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);

        scrollTopBtn.onclick = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // Add loading animation
    let loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    // Remove loading after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 500);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate elements on page load
    animateOnLoad();
});

// Animate elements when they come into view
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollTop = window.pageYOffset;

    sections.forEach(section => {
        const offset = section.offsetTop - window.innerHeight + 100;

        if (scrollTop > offset) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initial animations on page load
function animateOnLoad() {
    // Animate sections with delay
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animate header logo
    const logo = document.querySelector('.header .logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Add click ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        let ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.offsetX - 10) + 'px';
        ripple.style.top = (e.offsetY - 10) + 'px';
        e.target.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
let style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
