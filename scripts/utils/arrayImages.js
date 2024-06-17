export function getPhotographerMediaSources(
    photographerMedia,
    firstNamePhotographer
) {
    return photographerMedia.map((gallery) => ({
        src: `assets/photographers/${firstNamePhotographer}/${
            gallery.image === undefined ? gallery.video : gallery.image
        }`,
        alt: gallery.title,
    }));
}
