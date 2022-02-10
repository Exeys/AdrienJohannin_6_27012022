function photographerPageFactory(data) {
    const { name, portrait, city, country, tagline} = data;

    const picture = `assets/photographers/${portrait}`;

    function getPageUserCardDOM() {
        const container = document.querySelector('.infosContainer')

        container.innerHTML = ` 
        <div class="infos__infos">
            <div class="infos__infos-title">
                <h2>${name}</h2>
            </div>
            <div class="infos__infos-subtitle">
                <p class="localisation">${city}, ${country}</p>
                <p class="tagline">${tagline}</p>
            </div>
        </div>
        <div class="infos__contact">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div class="infos__picture">
            <img src="${picture}" alt="${name}"/>
        </div>
        `
        return (container);
    }
    return { name, portrait, getPageUserCardDOM }
}