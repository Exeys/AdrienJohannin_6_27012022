function lightboxFactory(medias, id) {
    let index = medias.findIndex(m => m.id === id);

    function getLightboxDOM() {
        const lightbox = document.querySelector(".lightbox");
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "";

        const closeLightbox = document.createElement("i");
        closeLightbox.src = "../assets/icons/close.svg";
        closeLightbox.className = "close"

        lightbox.style.display = "block";
        if (medias[index].image) {
            const image = document.createElement("img")
            image.src = `../assets/medias/${medias[index].image}`
            image.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            })
            container.appendChild(image);
        }
        if (medias[index].video){
            const video = document.createElement("video")
            video.src = `../assets/medias/${medias[index].video}`
            video.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            })
            container.appendChild(video)
        }

        lightbox.appendChild(container);
        lightbox.appendChild(closeLightbox);
    }
    return { getLightboxDOM };
}