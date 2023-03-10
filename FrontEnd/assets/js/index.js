async function fetchData() {
    let works = await fetch('http://localhost:5678/api/works')
    works = await works.json()
    displayWorks(works)


    fetch('http://localhost:5678/api/categories')
        .then(res => res.json())
        .then(categories => {
            displayCategories(categories)
        })
}


function displayWorks(works) {
    const worksList = document.querySelector('.gallery');
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
    })

}

fetchData();