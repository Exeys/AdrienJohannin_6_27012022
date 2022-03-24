function lightboxFactory(medias, id) {
    let index = medias.findIndex(m => m.id === id);

    function getLightboxDOM() {

        const lightbox = document.querySelector(".lightbox");
        lightbox.setAttribute("tabindex", "0");
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = "";
        container.setAttribute("aria-label", "Aperçu du média")

        const closeLightbox = document.createElement("img");
        closeLightbox.src = "../assets/icons/close.svg";
        closeLightbox.className = "close"
        closeLightbox.setAttribute("alt", "Fermer l'apperçu")


        const nextLightbox = document.createElement("img");
        nextLightbox.src = "../assets/icons/next.svg";
        nextLightbox.className = "next";
        nextLightbox.setAttribute("alt", "Media suivant")

        const previousLightbox = document.createElement("img");
        previousLightbox.src = "../assets/icons/previous.svg";
        previousLightbox.className = "previous";
        previousLightbox.setAttribute("alt", "Media précédent")

        // Fonction de fermeture de la lightbox
        function closeLightboxFunction() {
            const lightbox = document.querySelector(".lightbox");
            lightbox.innerHTML = ""
        }

        // Au clic sur l'element de fermeture, appel de la fonction de fermeture de la lightbox
        closeLightbox.addEventListener('click', () => {
            closeLightboxFunction();
        })

        // Écoute des instructions au clavier (touches fléchées)
        lightbox.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowLeft':
                    if (index > 0) {
                        index--
                    } else {
                        index = medias.length - 1;
                    }
                    getLightboxDOM();
                    break;
                case 'ArrowRight':
                    if (index < medias.length - 1) {
                        index++
                    } else {
                        index = 0;
                    }
                    getLightboxDOM();
                    break;
                case 'Escape':
                    closeLightboxFunction();
                    break;
            }
            event.preventDefault();
        }, true);

        lightbox.style.display = "block";

        if (medias[index].image) {
            const ctner = document.createElement("div");
            ctner.innerHTML = `
            <img alt="${medias[index].title}" class="media" src="../assets/medias/${medias[index].image}"/>
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