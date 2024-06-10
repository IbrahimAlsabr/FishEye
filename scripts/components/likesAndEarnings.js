/**
 * Factory function to compute and display the total number of likes and daily price for a specific photographer.
 * @param {string} photographerId - The unique identifier for the photographer.
 * @param {Array} works - An array of works or projects by photographers, including likes and photographer IDs.
 * @param {number} price - Daily price charged by the photographer.
 */
export function photographerRevenueAndLikesFactory(
    photographerId,
    works,
    price
) {
    /**
     * Calculates the total number of likes across all works attributed to the specified photographer.
     * @returns {number} The total number of likes.
     */
    function calculateTotalNbrOfLikes() {
        let likesNbr = 0;

        works.forEach((element) => {
            if (element.photographerId == photographerId) {
                likesNbr = likesNbr + element.likes;
            }
        });
        return likesNbr;
    }

    /**
     * Creates a DOM element displaying the total number of likes.
     * @returns {Element} A div element containing the number of likes and a heart icon.
     */
    function createTotalNbrOfLikes() {
        const likes = document.createElement("div");
        const nbr = calculateTotalNbrOfLikes();

        likes.className = "likes";
        likes.innerHTML = `
			<p>${nbr}</p>
			<i class="fa-solid fa-heart" aria-label="likes icon" role="button"></i>
		`;

        return likes;
    }

    /**
     * Creates a DOM element displaying the daily price of the photographer.
     * @returns {Element} A paragraph element with the price formatted as "XX€/jour".
     */
    function createPriceByDay() {
        const p = document.createElement("p");
        p.className = "price";
        p.textContent = `${price}€/jour`;
        p.setAttribute("aria-label", "Daily rate: " + price + " euros per day");

        return p;
    }

    /**
     * Appends the total number of likes and daily price to a parent DOM element.
     * Typically used to update the UI with the latest data.
     */
    return {
        createLikesAndPriceSection() {
            const likes = document.querySelector(".price-and-likes-box");
            likes.appendChild(createTotalNbrOfLikes());
            likes.appendChild(createPriceByDay());
        },
    };
}
