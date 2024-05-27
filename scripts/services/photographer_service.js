export class PhotographerService {
    constructor(baseUrl = "http://localhost:3000/api") {
        this.baseUrl = baseUrl;
    }

    async fetchAllPhotographers() {
        try {
            const response = await fetch(`${this.baseUrl}/photographers`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const photographers = await response.json();
            return { photographers };
        } catch (error) {
            console.error("Failed to fetch photographers:", error);
            return { photographers: [] };
        }
    }

    async fetchPhotographerById(id) {
        let photographer = null;

        try {
            const { photographers } = await this.fetchAllPhotographers();
            photographer = photographers.find((p) => p.id.toString() === id);
        } catch (error) {
            console.error("Failed to fetch photographer by ID:", error);
            return null;
        }

        if (!photographer) {
            return null;
        }

        function getName() {
            return photographer.name;
        }

        function getCity() {
            return photographer.city;
        }

        return {
            photographer,
            getName,
            getCity,
        };
    }

    async fetchMediaByPhotographerId(photographerId) {
        const request = `${this.baseUrl}/photographerMedia/${photographerId}`;
        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const photographers = await response.json();

            return { photographers };
        } catch (error) {
            console.error("Failed to fetch photographers:", error);
            return { photographers: [] };
        }
    }
}
