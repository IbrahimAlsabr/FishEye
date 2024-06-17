import { PhotographerService } from "../services/photographer_service.js";
import { ProfileCardFactory } from "../components/profileCard.js";
import { PhotographerGalleryFactory } from "../components/photographerGallery.js";
import { photographerRevenueAndLikesFactory } from "../components/likesAndEarnings.js";
import { dropdownBoxFactory } from "../components/dropdown.js";
import { getPhotographerMediaSources } from "../utils/arrayImages.js";
import { sorting } from "../utils/sorting.js";
import { clearPageContent } from "../utils/clearPhotogPage.js";

const service = new PhotographerService();
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

export let images = [];



/**
 * Displays photographer information by fetching data, sorting works, and updating the UI.
 * @param {string} sortKey - Key used for sorting photographer's media.
 *
 */
export async function displayPhotographerInfo(sortKey) {
    try {
        // Clear existing content in the UI.
        clearPageContent();

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*              Fetch photographer data and media.            */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        const infos = await service.fetchPhotographerById(photographerId);
        let works = await service.fetchMediaByPhotographerId(photographerId);

        const name = infos.getName().split(" ")[0];
        const worksDiv = document.querySelector(".works");

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*          Sort works based on the provided sort key.       */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        works = sorting(works, sortKey);

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*   Generate and display the profile card and dropdown box  */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        ProfileCardFactory(infos.photographer).createProfileCard();
        dropdownBoxFactory().createDropdownBox();

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*    Initialize the images array for lightbox navigation    */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        images = getPhotographerMediaSources(works, name);

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*            Setup the likes and earnings section.          */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        photographerRevenueAndLikesFactory(
            photographerId,
            works,
            infos.getPrice()
        ).createLikesAndPriceSection();

        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        /*          Populate the gallery with sorted works.          */
        /*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*/
        works.forEach((work) => {
            worksDiv.appendChild(
                PhotographerGalleryFactory(
                    name,
                    work
                ).createPhotographerGallery()
            );
        });
    } catch (error) {
        console.error("Failed to fetch or display photographers:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (photographerId) {
        displayPhotographerInfo("data");
    }
});
