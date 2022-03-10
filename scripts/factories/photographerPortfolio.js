function photographerPortfolioFactory(data) {
    let { photographerId, title, image, video, likes, price, id } = data;
    let alreadyLiked = false;
    function getPortfolioCardDOM() {
        const media = document.createElement('figure')
        media.tabIndex = -1;
        media.className = "portfolio__media";
        if (image) {
            media.innerHTML = `
        <img    alt="${title}" 
                class="portfolio__media-img" 
                src="../assets/medias/${image}" 
                onclick="openLightbox(${id})"
                tabindex="0"
                aria-label="Photographie intitulé${title}"/>
        <div class="portfolio__media-text"">
            <p class="portfolio__media-text-title"> ${title}</p>
            <div class="portfolio__media-text-icon">
                <p  class="like" 
                    id="nbLike_${id}" 
                    onclick="likeMedia(${id})"
                    aria-label="Nombre de likes de la photo ${likes}"
                    tabindex="0">${likes}</p>
                <img    src="../assets/icons/heart.svg"
                        alt="likes"
                        tabindex="0"/>
            </div>
        </div>
        `
        }

        if (video) {
            media.innerHTML = `
        <video  class="portfolio__media-video" 
                src="../assets/medias/${video}" 
                type="video/mp4" 
                onclick="openLightbox(${id})"
                tabindex="0"
                aria-label="Vidéographie intitulé ${title}"></video>
        <div class="portfolio__media-text">
            <p class="portfolio__media-text-title"> ${title}</p>
            <div class="portfolio__media-text-icon">
                <p  class="like" 
                    id="nbLike_${id}" 
                    onclick="likeMedia(${id})"
                    aria-label="Nombre de likes de la vidéo ${likes}"
                    tabindex="0">${likes}</p>
                <img    src="../assets/icons/heart.svg"
                        alt="likes"
                        tabindex="0"/>
            </div>
        </div>
        `
        }
        return (media);
    }

    function like() {
        if (alreadyLiked) {
            likes--
            alreadyLiked = false;
        } else {
            likes++;
            alreadyLiked = true;
        }
        document.getElementById('nbLike_' + id).innerText = likes;
        return alreadyLiked;
    }
    return { id, photographerId, title, image, video, price, likes, getPortfolioCardDOM, like }
}

