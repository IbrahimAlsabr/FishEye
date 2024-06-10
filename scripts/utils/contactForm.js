import { closeModal } from "../events/contactEvent.js";

function cleanInputContetnt() {
    document.getElementById("prénom-input").value = "";
    document.getElementById("nom-input").value = "";
    document.getElementById("email-input").value = "";
    document.getElementById("message-input").value = "";
}

function getInputsContent() {
    const prenom = document.getElementById("prénom-input").value;
    const nom = document.getElementById("nom-input").value;
    const email = document.getElementById("email-input").value;
    const message = document.getElementById("message-input").value;

    return { prenom, nom, email, message };
}

function isEmptyInput() {
    let data = getInputsContent();
    if (
        (data.prenom !== "") &
        (data.nom !== "") &
        (data.email !== "") &
        (data.message !== "")
    ) {
        return false;
    }

    return true;
}

export function handleInput() {
    if (!isEmptyInput()) {
        let data = getInputsContent();
        console.log("Prénom:", data.prenom);
        console.log("Nom:", data.nom);
        console.log("Email:", data.email);
        console.log("Message:", data.message);

        cleanInputContetnt();
        closeModal();
    } else {
        showRejectedInput();
    }
}

function showRejectedInput() {
    let data = getInputsContent();
    if (data.prenom === "") {
        document.getElementById("prénom-input").style.cssText =
            "border: 4px solid red;";
    } else {
        document.getElementById("prénom-input").style.cssText =
            "border: 0px solid red;";
    }
    if (data.nom === "") {
        document.getElementById("nom-input").style.cssText =
            "border: 4px solid red;";
    } else {
        document.getElementById("nom-input").style.cssText =
            "border: 0px solid red;";
    }
    if (data.email === "") {
        document.getElementById("email-input").style.cssText =
            "border: 4px solid red;";
    } else {
        document.getElementById("email-input").style.cssText =
            "border: 0px solid red;";
    }
    if (data.message === "") {
        document.getElementById("message-input").style.cssText =
            "border: 4px solid red;";
    } else {
        document.getElementById("message-input").style.cssText =
            "border: 0px solid red;";
    }
    console.log("ERROR: Enter your data");
}

export function renderInputElementsNormal() {
    const prenom = document.getElementById("prénom-input");
    prenom.style.cssText = "border: 0px solid red;";
    prenom.value = "";

    const nom = document.getElementById("nom-input");
    nom.style.cssText = "border: 0px solid red;";
    nom.value = "";

    const email = document.getElementById("email-input");
    email.style.cssText = "border: 0px solid red;";
    email.value = "";

    const message = document.getElementById("message-input");
    message.style.cssText = "border: 0px solid red;";
    message.value = "";
}
