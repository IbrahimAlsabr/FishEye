import { renderInputElementsNormal } from "../utils/contactForm.js";
import { createContactModal } from "../components/contact_modal.js";

export function showModal(name) {
    let modal = document.querySelector(".modal");
    let backdrop = document.querySelector(".modal-backdrop");

    if (!modal || !backdrop) {
        const elements = createContactModal(name);
        backdrop = elements.backdrop;
        modal = elements.modal;
    }

    backdrop.style.display = "block";
    modal.style.display = "block";

    document.getElementById("main").style.opacity = 0.5;
}

export function closeModal() {
    const modal = document.querySelector(".modal");
    const backdrop = document.querySelector(".modal-backdrop");
    if (modal.style.display != "none") {
        modal.style.display = "none";
        renderInputElementsNormal();
    }
    if (backdrop) {
        backdrop.style.display = "none";
    }
    document.getElementById("main").style.opacity = 1;
}


