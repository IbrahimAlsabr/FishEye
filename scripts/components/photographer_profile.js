export function photographerProfile(data) {
    const { name, portrait, city, country, price, tagline } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const section = document.createElement("section");

        const h1 = document.createElement("h1");
        h1.textContent = name;

        const aboutDev = document.createElement("div");
        aboutDev.className = "about";

        const countryParag = document.createElement("p");
        countryParag.className = "country";
        countryParag.textContent = `${city}, ${country}`;

        const taglineParag = document.createElement("p");
        taglineParag.className = "tagline";
        taglineParag.textContent = `${tagline}`;

        aboutDev.appendChild(countryParag);
        aboutDev.appendChild(taglineParag);

        section.appendChild(h1);
        section.appendChild(aboutDev);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        let photographHeader = document.querySelector(".photograph-header");
        photographHeader.appendChild(img);

        const priceParag = document.createElement("p");
        priceParag.className = "price";
        priceParag.textContent = `${price}€/jour`;

        let priceLikes = document.querySelector(".price-likes");

        priceLikes.appendChild(priceParag);

        return section;
    }

    return { getUserCardDOM };
}

export function photographerWorks(photographerName, media) {
    const { title, image, video, likes, date, price } = media;
    let mediaType;
    let img;

    image === undefined ? (mediaType = video) : (mediaType = image);

    const picture = `assets/photographers/${photographerName}/${mediaType}`;

    function buildWorksContainerDOM() {
        let work = document.createElement("div");
        work.className = "work";

        if (mediaType === video) {
            img = document.createElement("video");
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");
            img.setAttribute("width", "350px");
            img.setAttribute("height", "325px");
        } else {
            img = document.createElement("img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", "");
            img.setAttribute("width", "350px");
            img.setAttribute("height", "325px");
        }

        img.onclick = function () {
            const modal = document.getElementById("lightbox-modal");
            const modalImg = document.querySelector(".lightbox-content");
            const captionText = document.getElementById("caption");
            modal.style.display = "block";
            img.style.objectFit = "cover";
            modalImg.src = this.src;
            captionText.innerHTML = title;
        };

        let divImg = document.createElement("div");
        divImg.className = "div-img";

        divImg.appendChild(img);

        let nameImg = document.createElement("p");
        nameImg.textContent = title;

        let likesContent = document.createElement("span");

        let likesNum = document.createElement("p");
        likesNum.textContent = likes;

        likesContent.appendChild(likesNum);

        let heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";

        likesContent.appendChild(heart);

        let workInfo = document.createElement("div");
        workInfo.className = "work-info";

        workInfo.appendChild(nameImg);
        workInfo.appendChild(likesContent);

        work.appendChild(divImg);
        work.appendChild(workInfo);

        return work;
    }

    return { buildWorksContainerDOM };
}
