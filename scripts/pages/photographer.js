//Mettre le code JavaScript lié à la page photographer.html

// Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id');
let mediaArray = [];

async function getPhotographers() {
    const response = await fetch("../data/photographers.json")
    const data = await response.json();
    return ({
        photographers: data.photographers
    })
}

async function getMedias() {
    const response = await fetch("../data/photographers.json")
    const data = await response.json();
    mediaArray = data.media;
    return ({
        medias: data.media
    })
}

async function displayData(photographers) {
    const photographersHeader = document.querySelector(".infosContainer");

    const photograph = photographers.find((e) => e.id == id);
    const photographPage = photographerPageFactory(photograph);
    const pageUserCardDOM = photographPage.getPageUserCardDOM();
    photographersHeader.append(pageUserCardDOM);
}

async function displayMedia(medias) {
    const photographersMedias = document.querySelector(".portfolioContainer");

    const portfolio = medias.filter((e) => e.photographerId = id);

    portfolio.forEach((media) => {
        const portfolio = photographerPortfolioFactory(media);
        const portfolioCardDOM = portfolio.getPortfolioCardDOM();
        photographersMedias.append(portfolioCardDOM);
    })
}

function openLightbox(id){
    console.log('coucou')
    const lightbox = lightboxFactory(mediaArray, id)
    lightbox.getLightboxDOM();
}

function displayTotalLikes(){
    // p innerhtml total likes mediaArray[]
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const { medias } = await getMedias();
    displayMedia(medias);
};

init();
