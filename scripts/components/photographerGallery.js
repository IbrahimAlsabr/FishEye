import { onClickImageGallery } from "../events/galleryEvents.js";
import { onClickVideoGallery } from "../events/galleryEvents.js";
import { updateLikesCount } from "../events/galleryEvents.js";

/**
 * Factory function to create components of a photographer's gallery.
 * Handles different media types like images and videos.
 *
 * @param {string} photographerName - Name of the photographer.
 * @param {Object} media - Media details such as image, video, title, likes.
 */
export function PhotographerGalleryFactory(photographerName, media) {
    /**
     * Creates an image section with event handler.
     * @param {string} imgSrc - Source URL of the image.
     * @returns {Element} - A div element containing the image.
     */
    function createImageSection(imgSrc) {
        const img = document.createElement("div");
        img.className = "img-container";
        img.innerHTML = `
			<img
				src="${imgSrc}"
				alt="${media.title}"
				width="350px"
				height="325px"
				role="button"
                tabindex="0">
			</img>`;

        img.onclick = () => onClickImageGallery(imgSrc, media.title);
        img.querySelector("img").onkeydown = (event) => {
            if (event.key === "Enter") {
                onClickImageGallery(imgSrc, media.title);
            }
        };
        return img;
    }

    /**
     * Creates a video section with controls and event handler.
     * @param {string} videoSrc - Source URL of the video.
     * @returns {Element} - A div element containing the video.
     */
    function createVideoSection(videoSrc) {
        const video = document.createElement("div");
        video.className = "video-container";
        video.innerHTML = `
			<video width="350px" height="325px" controls="" aria-label="${media.title}">
				<source src="${videoSrc}" type="video/mp4">
			</video>`;
        video.onclick = () => onClickVideoGallery(videoSrc, media.title);
        return video;
    }

    /**
     * Creates an information section for media displaying title and likes.
     * @returns {Element} - A div element with media information.
     */
    function createMediaInfoSection() {
        const info = document.createElement("div");
        info.className = "work-info";
        info.innerHTML = `
			<p>${media.title}</p>
			<span   >
				<p>${media.likes}</p>
				<i 
					tabindex="0" 
					role="button" 
					class="fa-solid fa-heart" 
					aria-label="Like this photo, currently ${media.likes} likes"></i>
			</span>
		`;

        const heartIcon = info.querySelector(".fa-solid.fa-heart");
        heartIcon.addEventListener("click", updateLikesCount.bind(heartIcon));
        heartIcon.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                updateLikesCount.call(heartIcon);
            }
        });

        return info;
    }

    /**
     * Assembles the complete gallery for the photographer based on media type.
     * @returns {Element} - A div element containing the gallery.
     */
    return {
        createPhotographerGallery() {
            let work = document.createElement("div");
            work.className = "work";

            media.image === undefined
                ? work.appendChild(
                      createVideoSection(
                          getPicture(photographerName, media.video)
                      )
                  )
                : work.appendChild(
                      createImageSection(
                          getPicture(photographerName, media.image)
                      )
                  );

            work.appendChild(createMediaInfoSection());

            return work;
        },
    };
}

/**
 * Helper function to generate the path for media based on the photographer's name and source.
 * @param {string} photographerName - Name of the photographer.
 * @param {string} srcMedia - Source file name of the media.
 * @returns {string} - Full path to the media file.
 */

function getPicture(photographerName, srcMedia) {
    return `assets/photographers/${photographerName}/${srcMedia}`;
}
