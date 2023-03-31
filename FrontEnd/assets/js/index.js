/**
 * 1. Enlever les filtres si connecté
 * 2. Afficher les travaux dans la modal
 * 3. Ajouter un évènement permettant de supprimer un "work"
 * 4. Faire l'appel api pour supprimer le "work" + mettre à jour le DOM
 *
 */




let works = []
const buttonEditWorks = document.querySelector('#works-modify')
const modalBg = document.querySelector('.modal-bg')
const modal = document.querySelector('.modal')

buttonEditWorks.addEventListener('click', () => {
    modal.style.display = 'block'
})

modalBg.addEventListener('click', () => {
    modal.style.display = 'none'
})

async function fetchData() {
    works = await getWorks()
    displayWorks(works)

    const categories = await getCategories()
    displayCategories([{id: null, name: 'Tous'}].concat(categories))
}


function displayWorks(works) {
    const worksList = document.querySelector('.gallery');
    worksList.innerHTML = ''
    works.forEach(work => {
        const item = document.createElement('figure')
        item.setAttribute('data-id', work.id)
        item.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        `
        worksList.appendChild(item)
    })

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

fetchData();