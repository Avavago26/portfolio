gsap.registerPlugin(ScrollTrigger);
gsap.fromTo(".image-top-left",
    { x: 0, opacity: 1 },
    {
        x: -200,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".image-top-left",
            start: "top left",
            end: "bottom top",
            scrub: true,
        }
    }
);

gsap.fromTo(".image-bottom-right",
    { x: 0, opacity: 1 },
    {
        x: 300,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".image-bottom-right",
            start: "bottom right",
            end: "bottom top",
            scrub: true,
        }
    }
);
gsap.fromTo(".about__container",
    {
        y: 250,
        opacity: 1,
        scale: 0.4
    },
    {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".about__container",
            start: "top bottom",
            end: "top center",
            scrub: true,
            toggleActions: "play reverse play reverse",
        }
    }
);

const textContainer = document.querySelector('.rotating-container');
const languages = [
    'Welcome',
    'Hoş geldin',
    'Welkom',
    'Bienvenue',
    'Willkommen',
    '¡Bienvenido!',
    'Karibu',
    '欢迎',
    'ようこそ',
    '환영',
    'مرحباً',
];

let currentIndex = 0;

function rotateText() {
    const currentText = document.querySelector('.rotating__welcome');

    currentText.style.transform = 'translateY(100%)';
    currentText.style.opacity = '0';

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % languages.length;
        const newText = document.createElement('p');
        newText.classList.add('rotating__welcome');
        newText.textContent = languages[currentIndex];

        newText.style.transform = 'translateY(-100%)';
        newText.style.opacity = '0';
        textContainer.appendChild(newText);

        setTimeout(() => {
            newText.style.transform = 'translateY(0)';
            newText.style.opacity = '1';

            textContainer.removeChild(currentText);
        }, 50);

    }, 500);
}
const cardsContainer = document.querySelector('.carousel__cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentCardIndex = 0;
let project = 0;
const cardsData = [
    {
        title: "Missie Maatje",
        description: "A fun and engaging game about being a good buddy.",
        url: 'https://kaspervdv125.itch.io/missie-maatje',
        img: './assets/img/project1.png'
    },
    {
        title: "Paw-ism",
        description: "An adventurous platformer where a cat saves the day.",
        url: 'https://va-vahit-sh.itch.io/paw-ism',
        img: './assets/img/project2.png'
    },
];

cardsData.forEach(cardData => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('carousel__card');
    cardLink.href = cardData.url;

    cardLink.style.backgroundImage = `url('${cardData.img}')`;
    cardLink.style.backgroundPosition = 'center';
    cardLink.style.backgroundSize = 'cover';

    const textContainer = document.createElement('div');
    textContainer.classList.add('carousel__card-text');

    const title = document.createElement('h3');
    title.textContent = cardData.title;
    title.classList.add('carousel__card-title');
    textContainer.appendChild(title);

    const description = document.createElement('p');
    description.textContent = cardData.description;
    description.classList.add('carousel__card-description');
    textContainer.appendChild(description);

    cardLink.appendChild(textContainer);

    cardsContainer.appendChild(cardLink);
});

const cards = gsap.utils.toArray('.carousel__card');

function updateCarousel() {
    cards.forEach((card, index) => {
        let xPos, scaleSize, opacityValue, zIndex;

        if (index === currentCardIndex) {
            xPos = '0%';
            scaleSize = 1;
            opacityValue = 1;
            zIndex = 10;
        } else if (index === (currentCardIndex - 1 + cardsData.length) % cardsData.length) {
            xPos = '-50%';
            scaleSize = 0.8;
            opacityValue = 0.5;
            zIndex = 5;
        } else if (index === (currentCardIndex + 1) % cardsData.length) {
            xPos = '50%';
            scaleSize = 0.8;
            opacityValue = 0.5;
            zIndex = 5;
        } else {
            xPos = index < currentCardIndex ? '-100%' : '100%';
            scaleSize = 0.5;
            opacityValue = 0;
            zIndex = 1;
        }

        gsap.to(card, {
            x: xPos,
            scale: scaleSize,
            opacity: opacityValue,
            rotationY: index === currentCardIndex ? 0 : (index === (currentCardIndex - 1 + cardsData.length) % cardsData.length ? 10 : -10),
            zIndex: zIndex,
            duration: 0.6,
            ease: "power2.inOut"
        });
    });
}

prevBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cardsData.length) % cardsData.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cardsData.length;
    updateCarousel();
});



updateCarousel();
rotateText();
setInterval(rotateText, 3000);