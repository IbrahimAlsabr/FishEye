import { images } from "../initiators/photographer_profile_init.js";
import { lightboxFactory } from "../components/lightBox.js";

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
    let type;

    document
        .querySelector(".lightbox-modal")
        .removeChild(document.querySelector(".lightbox-content"));

    images[currentIndex].src.slice(-3) === "mp4"
        ? (type = "video")
        : (type = "image");

    lightboxFactory(images[currentIndex].src, type).createLightbox();
}
