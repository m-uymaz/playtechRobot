//selectors
const nextBtn = document.querySelector("next");
const prevBtn = document.querySelector('prev');
let widthToMove = 0;

// event listeners
const nextSlide = (widthToMove) => {
    if (widthToMove > 0) {
        return
    }
    const carousel = document.querySelector(".carousel");
    carousel.style.transform = `translateX(${widthToMove}px)`;
    console.log(widthToMove);
}

const prevSlide = (widthToMove) => {
    const carousel = document.querySelector(".carousel");
    const factorySection = carousel.querySelectorAll("section");
    slideIndex = factorySection.length;
    if (widthToMove + 900 > slideIndex * 900) {
        return
    }
    carousel.style.transform = `translateX(${widthToMove}px)`;
    console.log(widthToMove)
}