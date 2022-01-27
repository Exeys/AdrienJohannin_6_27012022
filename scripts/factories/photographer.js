function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const articleFocusable = document.createElement('div')
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p = document.createElement('p');
        p.innerHTML = city + ', ' + country + '<br>' + tagline + '<br>' + price + '€/jour';
        article.appendChild(articleFocusable)
        articleFocusable.appendChild(img);
        articleFocusable.appendChild(h2);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}