document.querySelector(".contact_button").addEventListener("click", () => {
    const modal = document.getElementById("contact_modal");
	console.log(modal);
    modal.style.display = "block";
});

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


