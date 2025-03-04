function photographerPageFactory(data) {
    const { name, portrait, city, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;

    function getPageUserCardDOM() {

        const innerHTML = ` 
        <div class="infos__infos">
            <div class="infos__infos-title">
                <h2 tabindex="0">${name}</h2>
            </div>
            <div class="infos__infos-subtitle">
                <p  class="location" 
                    role="text" 
                    aria-label="Localisation du photographe" 
                    tabindex="0">${city}, ${country}</p>
                <p  class="tagline" 
                    role="text" 
                    aria-label="Devise du photographe"
                    tabindex="0">${tagline}</p>
            </div>
        </div>
        <div class="infos__contact">
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div class="infos__picture">
            <img    src="${picture}" 
                    alt="Photo de ${name}"
                    tabindex="0"/>
        </div>
        `

        const modal = document.querySelector('.modal__subtitle-text')
        modal.innerHTML = `
        ${name}
        `
        return (innerHTML);
    }
    return { name, portrait, getPageUserCardDOM }
}