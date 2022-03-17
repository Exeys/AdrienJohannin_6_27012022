
// Fonction de récupération des photographes
async function getPhotographers() {
    const response = await fetch("../data/photographers.json")
    const data = await response.json();
    // Retourne un objet photographers contenant l'ensemble des données des photographes
    return ({
        photographers: data.photographers
    })
}

// Fonction d'affichage des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographersContainer");
    // Pour chaque photographe, est crée un nouvel élément dans le DOM
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Fonction d'initialisation
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    // Affiche les photographes
    displayData(photographers);
};

// Appel de la fonction d'initialisation
init();
