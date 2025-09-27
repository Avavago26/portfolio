gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".image-top-left",
    { x: 0, opacity: 1 },
    {
        x: -200,
        opacity: 0,
        duration: 1,
        force3D: true,
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
        force3D: true,
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
        force3D: true,
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
    'Welcome', 'Hoş geldin', 'Welkom', 'Bienvenue', 'Willkommen',
    '¡Bienvenido!', 'Karibu', '欢迎', 'ようこそ', '환영', 'مرحباً',
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

            if (currentText.parentNode === textContainer) {
                textContainer.removeChild(currentText);
            }
        }, 50);

    }, 500);
}

rotateText();
setInterval(rotateText, 3000);


const gdesignCardsContainer = document.querySelector('.gdesign__cards--container');
const assetsCardsContainer = document.querySelector('.assets__cards--container');

const gd = 'gdesign';
const assets = 'assets';

let gameDesignData = [];
let assetsData = [];
let gdesignCardIndex = 0;
let assetsCardIndex = 0;
let gdesignCards, assetsCards, gdesignDescriptionBoxes, assetsDescriptionBoxes;

const gdesignPrevBtn = document.querySelector('#gdesignPrevBtn');
const gdesignNextBtn = document.querySelector('#gdesignNextBtn');
const assetsPrevBtn = document.querySelector('#assetsPrevBtn');
const assetsNextBtn = document.querySelector('#assetsNextBtn');


const createCarousel = (preparedData, container, cardName) => {
    preparedData.forEach(cardData => {
        const cardLink = document.createElement('a');
        cardLink.classList.add('carousel__card', `${cardName}__card`);
        cardLink.href = cardData.url;

        cardLink.style.backgroundImage = `url('${cardData.img}')`;
        cardLink.style.backgroundPosition = 'center';
        cardLink.style.backgroundSize = 'cover';

        const textContainer = document.createElement('div');
        textContainer.classList.add('carousel__card-description-box', `${cardName}__description-box`);

        const header = document.createElement('div');
        header.classList.add('description-box__header');

        const title = document.createElement('h3');
        title.textContent = cardData.title;
        title.classList.add('carousel__card-title');
        header.appendChild(title);

        const badge = document.createElement('span');
        badge.textContent = cardData.badge;
        badge.classList.add('carousel__card-badge');
        header.appendChild(badge);

        textContainer.appendChild(header);

        const ul = document.createElement('ul');
        ul.classList.add('carousel__card-details');

        cardData.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            ul.appendChild(li);
        });

        textContainer.appendChild(ul);

        container.appendChild(cardLink);
        container.appendChild(textContainer);
    });
}

const updateCarousel = (cards, descriptionBoxes, index, dataLength) => {
    cards.forEach((card, i) => {
        const descriptionBox = descriptionBoxes[i];
        let xPos, scaleSize, opacityValue, zIndex, rotation, descOpacity;

        if (i === index) {
            // Active card
            xPos = '0%';
            scaleSize = 1;
            opacityValue = 1;
            zIndex = 10;
            rotation = 0;
            descOpacity = 1;
        } else if (i === (index - 1 + dataLength) % dataLength) {
            // Prev card
            xPos = '-50%';
            scaleSize = 0.8;
            opacityValue = 0.5;
            zIndex = 5;
            rotation = 10;
            descOpacity = 0;
        } else if (i === (index + 1) % dataLength) {
            // Next card
            xPos = '50%';
            scaleSize = 0.8;
            opacityValue = 0.5;
            zIndex = 5;
            rotation = -10;
            descOpacity = 0;
        } else {
            // Hidden cards
            xPos = i < index ? '-100%' : '100%';
            scaleSize = 0.5;
            opacityValue = 0;
            zIndex = 1;
            rotation = i < index ? 10 : -10;
            descOpacity = 0;
        }

        gsap.to(card, {
            x: xPos,
            scale: scaleSize,
            opacity: opacityValue,
            rotationY: rotation,
            zIndex: zIndex,
            duration: 0.6,
            ease: "power2.inOut",
            force3D: true,
        });

        gsap.to(descriptionBox, {
            x: xPos,
            opacity: descOpacity,
            scale: scaleSize,
            zIndex: zIndex,
            duration: 0.6,
            ease: "power2.inOut",
            force3D: true,
            delay: i === index ? 0.2 : 0,
            pointerEvents: i === index ? 'auto' : 'none',
        });
    });
}

const attachEventListeners = () => {
    gdesignPrevBtn.addEventListener('click', () => {
        gdesignCardIndex = (gdesignCardIndex - 1 + gameDesignData.length) % gameDesignData.length;
        updateCarousel(gdesignCards, gdesignDescriptionBoxes, gdesignCardIndex, gameDesignData.length);
    });

    gdesignNextBtn.addEventListener('click', () => {
        gdesignCardIndex = (gdesignCardIndex + 1) % gameDesignData.length;
        updateCarousel(gdesignCards, gdesignDescriptionBoxes, gdesignCardIndex, gameDesignData.length);
    });

    assetsPrevBtn.addEventListener('click', () => {
        assetsCardIndex = (assetsCardIndex - 1 + assetsData.length) % assetsData.length;
        updateCarousel(assetsCards, assetsDescriptionBoxes, assetsCardIndex, assetsData.length);
    });

    assetsNextBtn.addEventListener('click', () => {
        assetsCardIndex = (assetsCardIndex + 1) % assetsData.length;
        updateCarousel(assetsCards, assetsDescriptionBoxes, assetsCardIndex, assetsData.length);
    });
}

const initializeCarousels = () => {
    createCarousel(gameDesignData, gdesignCardsContainer, gd);
    createCarousel(assetsData, assetsCardsContainer, assets);

    gdesignCards = gsap.utils.toArray(`.${gd}__card`);
    assetsCards = gsap.utils.toArray(`.${assets}__card`);
    gdesignDescriptionBoxes = gsap.utils.toArray(`.${gd}__description-box`);
    assetsDescriptionBoxes = gsap.utils.toArray(`.${assets}__description-box`);


    if (gameDesignData.length > 0) {
        updateCarousel(gdesignCards, gdesignDescriptionBoxes, gdesignCardIndex, gameDesignData.length);
    }
    if (assetsData.length > 0) {
        updateCarousel(assetsCards, assetsDescriptionBoxes, assetsCardIndex, assetsData.length);
    }
}


fetch('./assets/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        gameDesignData = data.gameDesign; // Assuming the JSON has a 'gameDesign' key
        assetsData = data.assets;         // Assuming the JSON has an 'assets' key
        initializeCarousels();            // Initialize carousels with fetched data
    })
    .catch(error => {
        console.error('There was a problem fetching the carousel data:', error);
        // Fallback or display an error message on the page if needed
    });