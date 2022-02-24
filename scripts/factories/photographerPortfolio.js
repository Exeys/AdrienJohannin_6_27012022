function photographerPortfolioFactory(data) {
    let { photographerId, title, image, video, likes, price, id } = data;
    let alreadyLiked = false;
    function getPortfolioCardDOM() {
        const media = document.createElement('div')
        media.className = "portfolio__media";
        if (image) {
            media.innerHTML = `
        <img class="portfolio__media-img" src="../assets/medias/${image}" onclick="openLightbox(${id})"/>
        <div class="portfolio__media-text">
        <p class="portfolio__media-text-title"> ${title}</p>
        <div class="portfolio__media-text-icon">
        <p class="like" id="nbLike_${id}" onclick="likeMedia(${id})">${likes}</p>
        <img src="../assets/icons/heart.svg"/>
        </div>
        </div>
        `
        }

        if (video) {
            media.innerHTML = `
        <video class="portfolio__media-video" src="../assets/medias/${video}" type=video/mp4 onclick="openLightbox(${id})"></video>
        <div class="portfolio__media-text">
        <p class="portfolio__media-text-title"> ${title}</p>
        <div class="portfolio__media-text-icon">
        <p class="like" onclick="likeMedia()">${likes}</p>
        <img src="../assets/icons/heart.svg"/>
        </div>
        </div>
        `
        }
        const pricing = document.querySelector('.pricing');
        pricing.innerHTML = `
        <p class="pricing__price">${price}€ / jour</p>
        `
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

