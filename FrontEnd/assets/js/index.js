// Se fichier charge les éléments nécessaire à la page index sans connexion (Galerie, bouton trier, fonction trier)

let works = []
let categories = []

async function fetchData() {
    works = await getWorks()
    displayWorks(works)

    categories = await getCategories()
    displayCategories([{id: null, name: 'Tous'}].concat(categories))
}


function addWorkGallery(work) {
    const worksList = document.querySelector('.gallery');
    const item = document.createElement('figure')
    item.setAttribute('data-id', work.id)
    item.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `
    worksList.appendChild(item)
}


function displayWorks(works) {
    const worksList = document.querySelector('.gallery');
    worksList.innerHTML = ''
    works.forEach(addWorkGallery)
}

function displayCategories(categories) {
    const categoriesUl = document.querySelector('#categories');
    categories.forEach(category => {
        const item = document.createElement('li')
        item.classList.add('category-item')
        item.innerText = category.name
        categoriesUl.appendChild(item)
        addEventCategory(item, category.id)
    })

}

function addEventCategory(item, categoryId) {
    item.addEventListener('click', () => {
        if (!categoryId) {
            displayWorks(works)
            return
        }
        const filteredWorks = works.filter(w => w.categoryId === categoryId)
        displayWorks(filteredWorks)
    })
}

fetchData().then(() => {
    adminInit()
})