import { showModal } from "../events/contactEvent.js";

/**
 * ProfileCardFactory function constructs a profile card with personal information.
 * It returns methods to generate individual HTML elements that make up the card.
 *
 * @param {Object} data - Contains details such as name, city, country, portrait, and tagline.
 */
export function ProfileCardFactory(data) {
    /**
     * Generates a DOM section element for the person's name and location.
     * @returns {Element} The created section element with filled content.
     */
    function createNameAndCountrySection() {
        const section = document.createElement("section");
        section.setAttribute("aria-label", `Profile of ${data.name}`);
        section.innerHTML = `
            <h1>${data.name}</h1>
            <div class="about">
                <p class="country">${data.city}, ${data.country}</p>
                <p class="tagline">${data.tagline}</p>
            </div>
        `;
        return section;
    }

    /**
     * Creates a contact button for the profile.
     * @returns {Element} A button element with the class 'contact_button'.
     */
    function createContactButton() {
        const button = document.createElement("button");
        button.className = "contact_button";
        button.textContent = "Contactez-moi";
        button.setAttribute("role", "button");
        button.setAttribute("aria-pressed", "false");
        button.setAttribute("tabindex", "0");

        button.addEventListener("click", () => showModal(data.name));
        button.addEventListener("keypress", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                showModal(name);
            }
        });
        return button;
    }

    /**
     * Generates an image element for the profile picture using a path resolved by getPicture.
     * @returns {Element} An image element representing the profile picture.
     */
    function createProfilePicture() {
        const img = document.createElement("img");
        img.src = getPicture(data.portrait);
        img.alt = `Portrait of ${data.name}`;
        img.setAttribute("role", "img");

        return img;
    }

    /**
     * Assembles the profile card by appending the generated elements to a DOM element.
     */
    return {
        createProfileCard() {
            let photographHeader = document.querySelector(".photograph-header");
            photographHeader.appendChild(createNameAndCountrySection());
            photographHeader.appendChild(createContactButton());
            photographHeader.appendChild(createProfilePicture());
        },
    };
}
/**
 * Helper function to resolve the path to the portrait image.
 * @param {string} portrait - The file name or identifier for the portrait.
 * @returns {string} The complete path to the portrait image.
 */

function getPicture(portrait) {
    return `assets/photographers/Photographers ID Photos/${portrait}`;
}
