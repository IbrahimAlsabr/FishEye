import { dropdownExpandCollapse } from "../events/dropdownEvents.js";
import { displayPhotographerInfo } from "../initiators/photographer_profile_init.js";
import { updateSortTypeDisplay } from "../events/dropdownEvents.js";

/**
 * Factory function to construct a dropdown box with sorting options for a photographer's portfolio.
 */
export function dropdownBoxFactory() {
    /**
     * Creates and returns a div with clickable sorting options.
     */
    function creatAllOptions() {
        const options = document.createElement("div");
        options.className = "options";
        options.setAttribute("role", "menu");
        options.innerHTML = `
			<p class="popularity" tabindex="0" role="menuitem">Popularité</p>
			<p class="title" tabindex="0" role="menuitem">Title</p>
			<p class="date" style="display: none;" tabindex="0" role="menuitem">Date</p>
		`;
		
        options
            .querySelectorAll(".popularity, .title, .date")
            .forEach((option) => {
                option.addEventListener("click", (event) => {
                    handleOptionSelect(event.target);
                });

                option.addEventListener("keydown", (event) => {
                    switch (event.key) {
                        case "Enter":
                        case " ":
                            event.preventDefault(); 
                            handleOptionSelect(event.target);
                            break;
                        case "ArrowDown":
                            event.preventDefault();
                            moveFocus(option, 1);
                            break;
                        case "ArrowUp":
                            event.preventDefault();
                            moveFocus(option, -1);
                            break;
                    }
                });
            }); 

        function handleOptionSelect(target) {
            const sortType = target.className;
            displayPhotographerInfo(sortType).then(() => {
                updateSortTypeDisplay(target.textContent);
            });
        }

        function moveFocus(current, delta) {
            const items = Array.from(
                options.querySelectorAll(".popularity, .title, .date")
            );
            let newIndex = items.indexOf(current) + delta;
            if (newIndex >= items.length) newIndex = 0;
            if (newIndex < 0) newIndex = items.length - 1;
            items[newIndex].focus();
        }

        return options;
    }

    /**
     * Creates and returns a paragraph element used as the dropdown menu's title.
     */
    function createDropdownTitle() {
        const p = document.createElement("p");
        p.className = "menu-title";
        p.textContent = "Trier par";
        p.ariaLevel = "2";
        p.setAttribute("role", "heading");

        return p;
    }

    /**
     * Creates and returns a div that displays the currently chosen sort value.
     */
    function createChosenValue(chosenValue) {
        const chosen = document.createElement("div");
        chosen.className = "opt-group";
        chosen.id = "close";
        chosen.innerHTML = `
		    <p class='date'>${chosenValue}</p>
            <i 
				class="fa-solid fa-caret-down" 
				role="button"  
				tabindex="0" 
				aria-label="Expand or collapse options"></i>
		`;

        const icon = chosen.querySelector(".fa-caret-down");
        icon.addEventListener("click", dropdownExpandCollapse);

        icon.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                dropdownExpandCollapse();
            }
        });

        return chosen;
    }

    /**
     * Creates and returns a span containing the initial dropdown box setup with the default selected value and options.
     */
    function creatInitialDropdownBox() {
        const span = document.createElement("span");
        span.className = "values";
        // span.setAttribute("aria-valuetext", "date");
        span.appendChild(createChosenValue("Date"));
        span.appendChild(creatAllOptions());

        return span;
    }

    return {
        /**
         * Constructs and appends the complete dropdown box to the designated container in the DOM.
         */
        createDropdownBox() {
            const temp = document.querySelector(".sort-menu");
            temp.appendChild(createDropdownTitle());
            temp.appendChild(creatInitialDropdownBox());
        },
    };
}
