function lightboxFactory(medias, id) {
    let index = medias.findIndex(m => m.id === id);
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
            const ctner = document.createElement("div");
            ctner.innerHTML = `
            <img class="media" src="../assets/medias/${medias[index].image}"/>
            `
            /**const image = document.createElement("img")
            image.className = "media"
            image.src = `../assets/medias/${medias[index].image}`**/
            nextLightbox.addEventListener('click', () => {
                if (index < medias.length - 1) {
                    index++
                } else {
                    index = 0;
                }
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                if (index > 0) {
                    index--
                } else {
                    index = medias.length - 1;
                }
                getLightboxDOM();
            });
            container.appendChild(ctner);
        }
        if (medias[index].video) {
            const ctner = document.createElement("div");
            ctner.innerHTML = `
            <video controls class="media" src="../assets/medias/${medias[index].video}"/>
            `
            /**const video = document.createElement("video")
            video.className = "media"
            video.src = `../assets/medias/${medias[index].video}`**/
            nextLightbox.addEventListener('click', () => {
                index++;
                getLightboxDOM();
            });
            previousLightbox.addEventListener('click', () => {
                index--;
                getLightboxDOM();
            });
            container.appendChild(ctner)
        }
        container.appendChild(closeLightbox)
        container.appendChild(nextLightbox)
        container.appendChild(previousLightbox)
        lightbox.appendChild(container);
    }
    return { getLightboxDOM };
}