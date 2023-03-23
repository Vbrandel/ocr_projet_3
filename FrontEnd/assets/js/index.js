let works = []

async function fetchData() {
    works = await fetch('http://localhost:5678/api/works')
    works = await works.json()
    displayWorks(works)


    fetch('http://localhost:5678/api/categories')
        .then(res => res.json())
        .then(categories => {
            displayCategories([{id: null, name: 'Tous'}].concat(categories))
        })
}


function displayWorks(works) {
    const worksList = document.querySelector('.gallery');
    worksList.innerHTML = ''
    works.forEach(work => {
        const item = document.createElement('figure')
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