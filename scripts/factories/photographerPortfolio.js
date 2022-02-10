function photographerPortfolioFactory(data) {
    const { photographerId, title, image, video, likes, price, id } = data;

    function getPortfolioCardDOM() {
        const media = document.createElement('div')
        media.className = "portfolio__media";
        if (image) {
            media.innerHTML = `
        <img class="portfolio__media-img" src="../assets/medias/${image}" onclick="openLightbox(${id})"/>
        <div class="portfolio__media-text">
        <p class="portfolio__media-text-title"> ${title}</p>
        <div class="portfolio__media-text-icon"><p>${likes}</p><img src="../assets/icons/heart.svg"/></div>
        </div>
        `
        }

        if (video){
            media.innerHTML = `
        <video class="portfolio__media-img" src="../assets/medias/${video}" type=video/mp4></video>
        <div class="portfolio__media-text">
        <p class="portfolio__media-text-title"> ${title}</p>
        <div class="portfolio__media-text-icon"><p>${likes}</p><img src="../assets/icons/heart.svg"/></div>
        </div>
        `
        }
        const pricing = document.querySelector('.pricing');
        pricing.innerHTML = `
        <p class="pricing-likes">${likes}<img src="../assets/icons/heart.svg"/></p>
        <p class="pricing-price">${price}€ / jour</p>
        `
        return (media);
    }
    return { photographerId, title, image, video, price, likes, getPortfolioCardDOM }
}

