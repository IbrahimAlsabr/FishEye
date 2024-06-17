import { showModal } from "./contactEvent.js";

export function handleSpaceAndEnterKey(name) {
	if (event.key === "Enter" || event.key === " ") {
		showModal(name);
	}
}