import { photographerProfile } from "../components/photographer_profile.js";
import { photographerWorks } from "../components/photographer_profile.js";
import { PhotographerService } from "../services/photographer_service.js";

const service = new PhotographerService();
let currentIndex = 0;
let images = [];

async function displayPhotographerInfo(result, works) {
    const name = result.getName().split(" ")[0];
    const worksDiv = document.querySelector(".works");

    // Clear previous content
    worksDiv.innerHTML = "";

    let contactBtn = document.querySelector(".contact_button");
    const profileContainer = contactBtn.parentElement;

    profileContainer.firstChild.remove();
    profileContainer.lastChild.remove();

    profileContainer.insertBefore(
        photographerProfile(result.photographer).getUserCardDOM(),
        contactBtn
    );

    works.photographers.forEach((work) => {
        worksDiv.appendChild(
            photographerWorks(name, work).buildWorksContainerDOM()
        );
    });
}

async function sortAndDisplay(photographerId, sortKey) {
    try {
        const infos = await service.fetchPhotographerById(photographerId);
        const works = await service.fetchMediaByPhotographerId(photographerId);

        let priceLikes = document.querySelector(".price-likes");
        let likes = document.createElement("div");
        likes.className = "likes";

        let heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";

        let likesNbr = document.createElement("p");
        likesNbr.textContent = getNbrLikes(photographerId, works.photographers);

        likes.appendChild(likesNbr);
        likes.appendChild(heart);

        priceLikes.appendChild(likes);

        // Sort data based on the sortKey
        if (sortKey === "date") {
            works.photographers.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        } else {
            // default to sort by title
            works.photographers.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Initialize the images array for lightbox navigation
        images = works.photographers.map((work) => ({
            src: `assets/photographers/${infos.getName().split(" ")[0]}/${
                work.image
            }`,
            alt: work.title,
        }));

        displayPhotographerInfo(infos, works);

        // getNbrLikes(photographerId, works.photographers);
    } catch (error) {
        console.error("Failed to fetch or display photographers:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    let options = document.querySelector(".options");

    if (photographerId) {
        sortAndDisplay(photographerId, "title");

        document.querySelector(".title").addEventListener("click", function () {
            sortAndDisplay(photographerId, "title");
            options.style.display = "none";
        });

        document.querySelector(".date").addEventListener("click", function () {
            sortAndDisplay(photographerId, "date");
            options.style.display = "none";
        });
    } else {
        console.error("Photographer ID not found in URL");
    }

    const close = document.querySelector(".lightbox-close");
    close.onclick = function () {
        const modal = document.getElementById("lightbox-modal");
        modal.style.display = "none";
    };

    document.querySelector(".left-arrow").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1;
        }
        updateLightboxImage();
    });

    document.querySelector(".right-arrow").addEventListener("click", () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateLightboxImage();
    });

    const modalImg = document.querySelector(".lightbox-content");
    const captionText = document.getElementById("caption");

    function updateLightboxImage() {
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    }
});

let menu = document.querySelector(".opt-group");
let options = document.querySelector(".options");
let i = document.querySelector(".opt-group i");

menu.addEventListener("click", function () {
    if (menu.ariaValueText === "close") {
        menu.ariaValueText = "open";
        options.style.display = "block";
        i.style.transform = "rotate(180deg)";
    } else {
        menu.ariaValueText = "close";
        options.style.display = "none";
        i.style.transform = "rotate(-180deg)";
    }
});

function getNbrLikes(photographerId, works) {
    let likes = 0;

    works.forEach((element) => {
        if (element.photographerId == photographerId) {
            likes = likes + element.likes;
        }
    });
    return likes;
}

// function buildLikes() {
// 	let priceLikes = document.querySelector(".price-likes");
// 	let likes = document.createElement("div");
// 	likes.className = "likes";

// 	let heart = document.createElement("i");
// 	heart.className = "fa-solid fa-heart";

// 	let likesNbr = document.createElement("p")
// 	likesNbr.textContent = getNbrLikes(photographerId, works.photographers);

// 	likes.appendChild(likesNbr)
// 	likes.appendChild(heart)

// 	priceLikes.appendChild(likes);
// }
