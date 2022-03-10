
// Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id');
let mediaArray = [];
let likesCounter = 0;
let portfolioArray = [];

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
    mediaArray = data.media.filter((e) => e.photographerId == id);
    return ({
        medias: mediaArray
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
    medias.forEach((media) => {
        const portfolio = photographerPortfolioFactory(media);
        portfolioArray.push(portfolio);
        const portfolioCardDOM = portfolio.getPortfolioCardDOM();
        photographersMedias.append(portfolioCardDOM);
    })
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
            <span   id="likeCount"
                    aria-label="Nombre de likes total du photographe ${likesCounter}"
                    tabindex="0">${likesCounter}</span>
                    <img src="../assets/icons/heart.svg"/>
        `
        container.prepend(likes);
    })
}

function sortMedia(medias) {
    const menu = document.querySelector('.filterContainer__filter');
    menu.addEventListener('change', function (evt) {
        var expression = evt.target.value;
        // affichage?
        document.querySelector('.portfolioContainer').innerHTML = "";
        switch (expression) {
            case 'title':
                medias.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                })
                break;
            case 'popularity':
                medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
        displayMedia(medias);
    })
};


function openLightbox(id) {
    const lightbox = lightboxFactory(mediaArray, id)
    lightbox.getLightboxDOM();
}

function likeMedia(id) {
    const portfolioToLike = portfolioArray.find(p => p.id === id)
    likeCount = document.getElementById('likeCount');
    if (portfolioToLike.like()) {
        likeCount.innerText = +likeCount.innerText + 1;
    } else {
        likeCount.innerText = +likeCount.innerText - 1;
    }

}



// 
async function init() {
    // Récupère les données des photographes
    const { photographers } = await getPhotographers();
    // Affiche les données des photographes
    displayData(photographers);
    // Récupère les données des médias
    const { medias } = await getMedias();
    // Affiche les données des médias
    displayMedia(medias);
    // Affiche le nombre total des "likes" des médias
    displayTotalLikes(medias);
    sortMedia(medias);
};

// Appel de la fonction 
init();
