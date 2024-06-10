/**
 * Clears the inner HTML of specified elements in the DOM to reset their content.
 */
export function clearPageContent() {
    const elementsToClear = [
        ".photograph-header",
        ".sort-menu",
        ".works",
        ".price-and-likes-box",
    ];

    elementsToClear.forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = "";
        } else {
            console.warn(`Element not found for selector: ${selector}`);
        }
    });
}
