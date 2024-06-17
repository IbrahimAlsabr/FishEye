import { closeLightbox } from "../events/lightBoxEvents.js";
import { navigateToLeftImage } from "../events/lightBoxEvents.js";
import { navigateToRightImage } from "../events/lightBoxEvents.js";
import { navigateToLeftImageByKey } from "../events/lightBoxEvents.js";
import { navigateToRightImageByKey } from "../events/lightBoxEvents.js";

/**
 * Factory function to create lightbox elements and configure them based on the media type.
 * @param {string} src - Source URL for the media.
 * @param {string} type - Type of the media ('video' or 'image').
 */
export function lightboxFactory(src, type) {
    /**
     * Creates and returns a close button for the lightbox.
     */
    function createCloseButton() {
        const closeButton = document.createElement("span");
        closeButton.className = "lightbox-close";
        closeButton.setAttribute("aria-label", "Close lightbox");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => closeLightbox());

        return closeButton;
    }

    /**
     * Creates and returns a left arrow navigation button for the lightbox.
     */
    function createLeftArrow() {
        const leftArrowButton = document.createElement("span");
        leftArrowButton.className = "lightbox-nav left-arrow";
        leftArrowButton.setAttribute("aria-label", "Previous image");
        leftArrowButton.innerHTML = "&lt;";
        leftArrowButton.addEventListener("click", () => navigateToLeftImage());
        document.addEventListener("keydown", () => navigateToLeftImageByKey());

        return leftArrowButton;
    }

    /**
     * Creates and returns a right arrow navigation button for the lightbox.
     */
    function createRightArrow() {
        const rightArrowButton = document.createElement("span");
        rightArrowButton.className = "lightbox-nav right-arrow";
        rightArrowButton.setAttribute("aria-label", "Next image");
        rightArrowButton.innerHTML = "&gt;";
        rightArrowButton.addEventListener("click", () =>
            navigateToRightImage()
        );
        document.addEventListener("keydown", () => navigateToRightImageByKey());

        return rightArrowButton;
    }

    /**
     * Creates and returns a caption section for the lightbox.
     */
    function createCaptionSection() {
        let caption = document.createElement("div");
        caption.id = "caption";

        return caption;
    }

    /**
     * Creates and returns an image element configured for display within the lightbox.
     */
    function createImageLightbox() {
        const img = document.createElement("img");
        img.className = "lightbox-content";
        img.alt = "Displayed image";
        img.src = src;

        return img;
    }

    /**
     * Creates and returns a video element configured for display within the lightbox.
     */
    function createVideoLightbox() {
        const video = document.createElement("video");
        video.className = "lightbox-content";
        video.setAttribute("aria-label", "Displayed video");
        video.controls = "true";
        video.innerHTML = `<source src="${src}" type="video/mp4">`;

        return video;
    }

    /**
     * Constructs the lightbox modal with all components depending on the media type.
     */
    return {
        createLightbox() {
            const lightboxModal = document.getElementById("lightbox-modal");
            lightboxModal.appendChild(createCloseButton());
            lightboxModal.appendChild(createLeftArrow());

            if (type === "video") {
                lightboxModal.appendChild(createVideoLightbox());
            } else {
                lightboxModal.appendChild(createImageLightbox());
            }

            lightboxModal.appendChild(createRightArrow());
            lightboxModal.appendChild(createCaptionSection());
        },
    };
}
