const mobileMenuBtn = document.getElementById('mobile-menu');
const closeOverlayBtn = document.getElementById('close-overlay');
const mobileOverlay = document.getElementById('mobile-overlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileOverlay.classList.add('overlay--visible');
    document.body.style.overflow = 'hidden';
});

closeOverlayBtn.addEventListener('click', () => {
    mobileOverlay.classList.remove('overlay--visible');
    document.body.style.overflow = 'auto';
});

const overlayLinks = document.querySelectorAll('.overlay__link');
overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileOverlay.classList.remove('overlay--visible');
        document.body.style.overflow = 'auto';
    });
});