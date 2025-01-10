const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark')
})

const checkbox = document.getElementById('chk');
const headerMiddleImage = document.getElementById('header-image');
const headerLeftImage = document.getElementById('header-left-image');

const lightModeMiddleImage = 'imgs/gatim.png';
const lightModeLeftImage = 'imgs/SEM FUNDO LOGO.png';

const darkModeMiddleImage = 'imgs/gatimBranco1.png';
const darkModeLeftImage = 'imgs/SEM FUNDO LOGO BRANCO.png';

function toggleImages() {
    if (checkbox.checked) {
        headerMiddleImage.src = darkModeMiddleImage;
        headerLeftImage.src = darkModeLeftImage;
    } else {
        headerMiddleImage.src = lightModeMiddleImage;
        headerLeftImage.src = lightModeLeftImage;
    }
}

toggleImages();

checkbox.addEventListener('change', toggleImages);

let currentSlide = 0;
const slidesContainer = document.querySelector('.carousel-images');
const slides = document.querySelectorAll('.carousel img');
const totalSlides = slides.length;

function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

showSlide(currentSlide);
