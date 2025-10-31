// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Menu Slider Touch Support
const menuSlider = document.querySelector('.menu-slider');
if (menuSlider) { // Check if menuSlider exists
    let isDown = false;
    let startX;
    let scrollLeft;

    menuSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - menuSlider.offsetLeft;
        scrollLeft = menuSlider.scrollLeft;
    });

    menuSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    menuSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    menuSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - menuSlider.offsetLeft;
        const walk = (x - startX) * 2;
        menuSlider.scrollLeft = scrollLeft - walk;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const menuContentContainer = document.getElementById('menu-content-container');
    const detailedMenuContent = document.getElementById('detailed-menu-content');
    const closeButton = document.querySelector('.menu-close');

    // Check if elements exist before adding event listeners
    if (menuItems && menuContentContainer && detailedMenuContent && closeButton) {
        // Open and load detailed menu when a menu item is clicked
        menuItems.forEach(item => {
            item.addEventListener('click', async function() {
                const targetFile = this.getAttribute('data-target');
                try {
                    const response = await fetch(targetFile);
                    if (!response.ok) {
                        throw new Error(`Failed to load ${targetFile}`);
                    }
                    const content = await response.text();
                    detailedMenuContent.innerHTML = content;
                    menuContentContainer.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                } catch (error) {
                    console.error('Error loading menu:', error);
                    detailedMenuContent.innerHTML = `<p>Failed to load menu content. Please try again later.</p>`;
                }
            });
        });

        // Close detailed menu when close button is clicked
        closeButton.addEventListener('click', function() {
            menuContentContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close detailed menu when clicking outside of it
        menuContentContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    } else {
        console.warn('One or more menu elements not found.');
    }
});