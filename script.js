// Mobile Navigation Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu Slider Touch Support
const menuSlider = document.querySelector('.menu-slider');
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
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://your-backend-api-endpoint.com/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            alert('Booking submitted successfully!');
            e.target.reset();
        } else {
            alert('Failed to submit booking. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please check the console.');
    }
});