function lightboxFactory(medias, id) {
    let index = medias.findIndex(m => m.id === id);
    console.log(medias);
    function getLightboxDOM() {
        const lightbox = document.querySelector(".lightbox");
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "";

        const closeLightbox = document.createElement("img");
        closeLightbox.src = "../assets/icons/close.svg";
        closeLightbox.className = "close"

        const nextLightbox = document.createElement("img");
        nextLightbox.src = "../assets/icons/next.svg";
        nextLightbox.className = "next";
        const previousLightbox = document.createElement("img");
        previousLightbox.src = "../assets/icons/previous.svg";
        previousLightbox.className = "previous";


        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = "none"
        })

        lightbox.style.display = "block";
        if (medias[index].image) {
            const image = document.createElement("img")
            image.className = "media"
            image.src = `../assets/medias/${medias[index].image}`
            nextLightbox.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                index--;
                getLightboxDOM();
            });
            container.appendChild(image);
        }
        if (medias[index].video) {
            const video = document.createElement("video")
            video.className = "media"
            video.src = `../assets/medias/${medias[index].video}`
            nextLightbox.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                index--;
                getLightboxDOM();
            });
            container.appendChild(video)
        }
        container.appendChild(closeLightbox)
        container.appendChild(nextLightbox)
        container.appendChild(previousLightbox)
        lightbox.appendChild(container);
    }
    return { getLightboxDOM };
}