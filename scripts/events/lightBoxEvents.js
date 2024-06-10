import { images } from "../initiators/photographer_profile_init.js";

let currentIndex = 0;

export function closeLightbox() {
    const modal = document.getElementById("lightbox-modal");
    modal.style.display = "none";
}

export function navigateToLeftImage() {
    document
        .querySelector(".left-arrow")
        .addEventListener("click", handleLeftArrowClick());
}

export function navigateToLeftImageByKey() {
    if (event.keyCode === 37) {
        handleLeftArrowClick();
    }
}

function handleLeftArrowClick() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    updateLightboxImage();
}

export function navigateToRightImage() {
    document
        .querySelector(".right-arrow")
        .addEventListener("click", handleRightArrowClick());
}

export function navigateToRightImageByKey() {
    if (event.keyCode === 39) {
        handleLeftArrowClick();
    }
}

function handleRightArrowClick() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const modalImg = document.querySelector(".lightbox-content");
    const captionText = document.getElementById("caption");

    modalImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
}
