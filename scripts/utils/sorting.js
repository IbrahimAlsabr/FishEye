export function sortByDate(gallery) {
    return gallery.photographers.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
}

export function sortByTitle(gallery) {
    return gallery.photographers.sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByPopularity(gallery) {
    return gallery.photographers.slice().sort((a, b) => b.likes - a.likes);
}

export function sorting(gallery, key) {
    switch (key) {
        case "date":
            return sortByDate(gallery);

        case "title":
            return sortByTitle(gallery);

        default:
            return sortByPopularity(gallery);
    }
}
