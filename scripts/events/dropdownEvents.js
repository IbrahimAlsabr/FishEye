/**
 * Toggles the visibility of the dropdown menu and rotates the icon to indicate the state.
 * The function checks the current state of the dropdown (open or closed) by reading the id.
 * It then toggles the state, updates the display of the dropdown menu, and rotates the icon accordingly.
 */
export function dropdownExpandCollapse() {
    let menu = document.querySelector(".opt-group");
    let options = document.querySelector(".options");
    let i = document.querySelector(".opt-group i");

    if (menu.id === "close") {
        menu.id = "open";
        options.style.display = "block";
        i.style.transform = "rotate(360deg)";
    } else {
        menu.id = "close";
        options.style.display = "none";
        i.style.transform = "rotate(180deg)";
    }
}

/**
 * Updates the display of the current sorting type and adjusts the visibility of the related sorting option in the dropdown.
 * This function switches the displayed sort type in the dropdown and hides the previously active sorting option,
 * making it unavailable for selection until another option is selected.
 * @param {string} newValue - The new sorting type to display and activate.
 */
export function updateSortTypeDisplay(newValue) {
    let currValueElem = document.querySelector(".opt-group p");

    document.querySelector(
        `.options .${currValueElem.className}`
    ).style.display = "block";

    let temp;
    switch (newValue.toLowerCase()) {
        case "popularité":
            currValueElem.textContent = newValue;
            currValueElem.className = "popularity";
            temp = "popularity";
            break;

        case "date":
            currValueElem.textContent = newValue;
            currValueElem.className = "date";
            temp = "date";
            break;

        case "title":
            currValueElem.textContent = newValue;
            currValueElem.className = "title";
            temp = "title";
            break;
    }

    document.querySelector(`.options .${temp}`).style.display = "none";
}


