// Récupère l'id du photographe dans l'URL
const id = (new URL(document.location)).searchParams.get('id');
let mediaArray = [];
let likesCounter = 0;
let portfolioArray = [];

// Fonction d'obtention des photographes
async function getPhotographers() {
    const response = await fetch("../data/photographers.json")
    const data = await response.json();
    return ({
        photographers: data.photographers
    })
}

// Fonction d'obtention des médias
async function getMedias() {
    const response = await fetch("../data/photographers.json")
    const data = await response.json();
    mediaArray = data.media.filter((e) => e.photographerId == id);
    return ({
        medias: mediaArray
    })
}

// Fonction d'affichage des photographes
// pour le photographe concerné par la page, une page contenant ses informations est crée
async function displayData(photographers) {
    const photographersHeader = document.querySelector(".infosContainer");

    const photograph = photographers.find((e) => e.id == id);
    const photographPage = photographerPageFactory(photograph);
    const pageUserCardDOM = photographPage.getPageUserCardDOM();
    photographersHeader.append(pageUserCardDOM);
}

// Fonction d'affichage des medias, 
// pour chaque media correspondant à la page du photographe concerné, 
// un élément du DOM est crée contenant une miniature du média
async function displayMedia(medias) {
    const photographersMedias = document.querySelector(".portfolioContainer");
    medias.forEach((media) => {
        console.log(media);
        const portfolio = photographerPortfolioFactory(media);
        portfolioArray.push(portfolio);
        const portfolioCardDOM = portfolio.getPortfolioCardDOM();
        photographersMedias.append(portfolioCardDOM);
    })
}

// Fonction d'affichage du nombre total de likes
function displayTotalLikes(medias) {
    likesCounter = 0;
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

// Fonction d'affichage du prix du photographe, pour chaque photographe, celui-ci est s'affiche dans l'élément du DOM adéquat
function displayPrice(photographers){
    priceText = ""
     const container = document.querySelector('.pricing')
     const price = document.createElement('p')
     price.className = "pricing__price"
     photographers.forEach((photographer) =>{
         if (photographer.id == id){
            priceText += photographer.price
         }
         price.innerHTML = `
            <span   aria-label="Tarif du photographe ${priceText}"
                    tabindex="0">${priceText}€ / jour</span>
         `
         container.prepend(price)
     })
}

// Fonction de tri des médias, lorsque un tri est selectionné, celui-ci est appliqué sur le tableau des médias 
function sortMedia() {
    const menu = document.querySelector('.filterContainer__filter');
    menu.addEventListener('change', function (evt) {
        var expression = evt.target.value;
        document.querySelector('.portfolioContainer').innerHTML = "";
        switch (expression) {
            case 'title':
                portfolioArray.sort((a, b) => {
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
                portfolioArray.sort((a, b) => b.likes - a.likes);
                break;
            case 'date':
                portfolioArray.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }
        const photographersMedias = document.querySelector(".portfolioContainer");
        portfolioArray.forEach((portfolio) => {
            const portfolioCardDOM = portfolio.getPortfolioCardDOM();
            photographersMedias.append(portfolioCardDOM);
        });
        
    })
};

// Fonction d'ouverture et d'affichage de la lightbox (l'apperçu d'un média)
function openLightbox(id) {
    const lightbox = lightboxFactory(mediaArray, id)
    lightbox.getLightboxDOM();
}

// Fonction de like d'un media, lorsque le nombre de like est cliqué pour un média donné, alors celui-ci est incrémenté de 1
function likeMedia(id) {
    const portfolioToLike = portfolioArray.find(p => p.id === id)
    likeCount = document.getElementById('likeCount');
    if (portfolioToLike.like()) {
        likeCount.innerText = +likeCount.innerText + 1;
    } else {
        likeCount.innerText = +likeCount.innerText - 1;
    }

}

//  Fonction d'initialisation
async function init() {
    // Récupère les données des photographes
    const { photographers } = await getPhotographers();
    // Affiche les données des photographes
    displayData(photographers);
    // Récupère les données des médias
    const { medias } = await getMedias();
    // Affiche les données des médias
    displayMedia(medias);
    // Affiche le tarif journalier du photographe
    displayPrice(photographers);
    // Affiche le nombre total des "likes" des médias du photographe
    displayTotalLikes(medias);
    // Fonction de tri des médias 
    sortMedia(medias);
};

// Appel de la fonction d'initialisation
init();
