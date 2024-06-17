import { closeModal } from "../events/contactEvent.js";
import { handleInput } from "../utils/contactForm.js";

export function createContactModal(name) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    document.body.appendChild(backdrop);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-labelledby", "modal-heading");
    modal.setAttribute("aria-modal", "true");
    modal.tabIndex = -1;

    const header = document.createElement("header");
    modal.appendChild(header);

    const heading = document.createElement("h2");
    heading.innerHTML = `Contactez-moi <br/>`;
    header.appendChild(heading);

    const nameText = document.createTextNode(name);
    heading.appendChild(nameText);

    const closeImg = document.createElement("img");
    closeImg.src = "assets/icons/close.svg";
    closeImg.alt = "Close";
    closeImg.setAttribute("role", "button");
    closeImg.tabIndex = 0;
    closeImg.onclick = closeModal;
    closeImg.onkeydown = function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            closeModal();
        }
    };
    header.appendChild(closeImg);

    const form = document.createElement("form");
    form.onsubmit = function (event) {
        event.preventDefault();
        handleInput();
    };
    modal.appendChild(form);

    const div = document.createElement("div");
    form.appendChild(div);

    let firstInput = null;

    const fields = [
        { label: "Prénom", type: "text" },
        { label: "Nom", type: "text" },
        { label: "Email", type: "email" },
        { label: "Message", type: "text" },
    ];

    fields.forEach((field, index) => {
        const label = document.createElement("label");
        label.textContent = field.label;
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = `${field.label.toLowerCase()}-input`;
        input.type = field.type;
        div.appendChild(input);

        if (index === 0) {
            firstInput = input;
        }
    });

    const button = document.createElement("button");
    button.className = "contact_button";
    button.type = "submit";
    button.textContent = "Envoyer";
    form.appendChild(button);

    document.getElementById("contact_modal").appendChild(modal);

    if (firstInput) {
        setTimeout(() => {
            firstInput.focus();
        }, 50);
    }

    return { backdrop, modal };
}
