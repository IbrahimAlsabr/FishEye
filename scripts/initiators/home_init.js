import { photographerTemplate } from "../components/photographer_overview.js";
import { PhotographerService } from "../services/photographer_service.js";

const service = new PhotographerService();

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await service.fetchAllPhotographers();
    displayData(photographers);
}

init();
