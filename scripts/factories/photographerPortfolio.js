function photographerPortfolioFactory(data) {
    const { photographerId, title, image, video, likes } = data;

    function getPortfolioCardDOM() {
        const media = document.createElement('div')
        media.className = "portfolio__media";

        if (image) {
            media.innerHTML = `
        <img class="portfolio__media-img" src="../assets/medias/${image}"/>
        <p class="portfolio__media-text">${title}</p>
        `
        }

        if (video){
            media.innerHTML = `
        <video class="portfolio__media-img" src="../assets/medias/${video}" type=video/mp4></video>
        <p class="portfolio__media-text">${title}</p>
        `
        }
        return (media);
    }
    return { photographerId, title, image, video, likes, getPortfolioCardDOM }
}

