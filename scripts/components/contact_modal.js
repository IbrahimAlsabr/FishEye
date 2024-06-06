import { handleInput, closeModal } from "../utils/contactForm.js";

export function createContactModal(name) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    document.body.appendChild(backdrop);

    const modal = document.createElement("div");
    modal.className = "modal";

    const header = document.createElement("header");
    modal.appendChild(header);

    const heading = document.createElement("h2");
    heading.textContent = "Contactez-moi"; // Set the static text
    header.appendChild(heading);

    // Create a break line element
    const breakLine = document.createElement("br");
    heading.appendChild(breakLine);

    // Create a text node for the name to ensure clean text manipulation
    const nameText = document.createTextNode(name);
    heading.appendChild(nameText);

    const closeImg = document.createElement("img");
    closeImg.src = "assets/icons/close.svg";
    closeImg.onclick = function () {
        closeModal();
    };
    header.appendChild(closeImg);

    const form = document.createElement("form");
    modal.appendChild(form);

    const div = document.createElement("div");
    form.appendChild(div);

    const fields = [
        { label: "Prénom", type: "text" },
        { label: "Nom", type: "text" },
        { label: "Email", type: "email" },
        { label: "Message", type: "text" },
    ];

    fields.forEach((field) => {
        const label = document.createElement("label");
        label.textContent = field.label;
        div.appendChild(label);

        const input = document.createElement("input");
        input.id = `${field.label.toLowerCase()}-input`;
        input.type = field.type;
        div.appendChild(input);
    });

    const button = document.createElement("button");
    button.className = "contact_button";
    button.type = "button";
    button.textContent = "Envoyer";

    button.onclick = function (event) {
        event.preventDefault();
        handleInput();
    };

    form.appendChild(button);

    document.getElementById("contact_modal").appendChild(modal);

    return { backdrop, modal };
}
