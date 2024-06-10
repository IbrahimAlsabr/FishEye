export function getPhotographerMediaSources(
    photographerMedia,
    firstNamePhotographer
) {
    return photographerMedia.map((gallery) => ({
        src: `assets/photographers/${firstNamePhotographer}/${gallery.image}`,
        alt: gallery.title,
    }));
}
