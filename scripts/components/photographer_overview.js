// import { initPhotographerProfile } from "../services/photographerService.js";

export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const h2 = document.createElement("h2");
        h2.textContent = name;
		
		const link = document.createElement("a");
        link.href = `../../photographer.html?id=${id}`;
        link.appendChild(img);
        link.appendChild(h2);

        const infoDev = document.createElement("div");
        infoDev.className = "info";

        const countryParag = document.createElement("p");
        countryParag.className = "country";
        countryParag.textContent = `${city}, ${country}`;

        const taglineParag = document.createElement("p");
        taglineParag.className = "tagline";
        taglineParag.textContent = `${tagline}`;

        const priceParag = document.createElement("p");
        priceParag.className = "price";
        priceParag.textContent = `${price}€/jour`;

        infoDev.appendChild(countryParag);
        infoDev.appendChild(taglineParag);
        infoDev.appendChild(priceParag);

        article.appendChild(link);
        article.appendChild(infoDev);

        return article;
    }
    return { data, picture, getUserCardDOM };
}
