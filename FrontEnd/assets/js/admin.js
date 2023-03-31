//Ce fichier charge le mode admin
const token = sessionStorage.getItem("token");

//Change le logIn en logOut
function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function() {
        sessionStorage.clear();
    })   
}


if (token != null) {
    const categoriesUl = document.querySelector('#categories');
    const buttonEditWorks = document.querySelector('#works-modify')
    const modalBg = document.querySelector('.modal-bg')
    const modal = document.querySelector('.modal')

    buttonEditWorks.addEventListener('click', () => {
        modal.style.display = 'block'
    })
    
    modalBg.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    buttonEditWorks.style.display = 'block'
    categoriesUl.style.display = 'none';
        
    let login = document.querySelector("nav ul li a[href='login.html']");

    /*function displayWorksModal(works){
        const worksListModal = document.querySelector('.gallery-modal');
        worksList.innerHTML = ''
        works.forEach(work => {
            const item = document.createElement('figure')
            item.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
            `
            worksList.appendChild(item)
        })
    }*/

    changeInnerHtml(login, "logout");
    logOut(login);
};