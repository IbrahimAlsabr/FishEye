import { lightboxFactory } from "../components/lightBox.js";

export function onClickImageGallery(src, title) {
    lightboxFactory(src, "img").createLightbox();

    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.querySelector(".lightbox-content");
    const captionText = document.getElementById("caption");
    modal.style.display = "block";
    // img.style.objectFit = "cover";
    modalImg.src = src;
    captionText.innerHTML = title;
}

export function onClickVideoGallery(src, title) {
    lightboxFactory(src, "video").createLightbox();

    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.querySelector(".lightbox-content");
    const captionText = document.getElementById("caption");
    modal.style.display = "block";
    // img.style.objectFit = "cover";
    modalImg.src = src;
    captionText.innerHTML = title;
}

export function updateLikesCount() {
    let likesNum = this.parentNode.querySelector("p");
    let likesNbr = document.querySelector(".price-and-likes-box p");

    if (this.hasAttribute("liked")) {
        likesNum.textContent = Number(likesNum.textContent) - 1;
        this.removeAttribute("liked");
        likesNbr.textContent = Number(likesNbr.textContent) - 1;
    } else {
        likesNum.textContent = Number(likesNum.textContent) + 1;
        this.setAttribute("liked", "true");
        likesNbr.textContent = Number(likesNbr.textContent) + 1;
    }
}
