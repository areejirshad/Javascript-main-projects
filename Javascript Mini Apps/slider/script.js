const slides = document.querySelectorAll('.slide');
let counter = 0;

slides.forEach((slide, index) => {
    slide.style.top = `${index * 100}%`;
});

const goprev = () => {
    // If the counter is at the first image, wrap around to the last image
    if (counter === 0) {
        counter = slides.length - 1;
    } else {
        counter--;
    }
    slideChange();
}

const goNext = () => {
    // If the counter is at the last image, wrap around to the first image
    if (counter === slides.length - 1) {
        counter = 0;
    } else {
        counter++;
    }
    slideChange();
}

const slideChange = () => {
    slides.forEach((slide) => {
        slide.style.transform = `translateY(-${counter * 100}%)`;
    });
}
