
// Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id');
let mediaArray = [];
let likesCounter = 0;

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

    const portfolio = medias.filter((e) => e.photographerId == id);
    portfolio.forEach((media) => {
        const portfolio = photographerPortfolioFactory(media);
        const portfolioCardDOM = portfolio.getPortfolioCardDOM();
        photographersMedias.append(portfolioCardDOM);
    })
}

function openLightbox(id) {
    const lightbox = lightboxFactory(mediaArray, id)
    lightbox.getLightboxDOM();
}

function displayTotalLikes(medias) {
    const container = document.querySelector('.pricing')
    const likes = document.createElement('p')
    likes.className = "pricing__likes"
    medias.forEach((media) => {
        if (media.photographerId == id) {
            likesCounter += media.likes
        }
        likes.innerHTML = `
            ${likesCounter} <img src="../assets/icons/heart.svg"/>
        `
        container.prepend(likes);
    })
    // p innerhtml total likes mediaArray[]
}



async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const { medias } = await getMedias();
    displayMedia(medias);
    displayTotalLikes(medias);
};

init();
