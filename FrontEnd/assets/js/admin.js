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
    const modalContent = document.querySelector('.modal-container ul')
    const cross = document.querySelector('.cross')
    const addImg = document.querySelector('.add-img')
    const modalAdd = document.querySelector('.modal-add')
    const modalArrow = document.querySelector('.modal .arrow')

    buttonEditWorks.addEventListener('click', () => {
        modal.style.display = 'block'
        modalBg.style.display = 'block'
    })
    
    modalBg.addEventListener('click', () => {
        modal.style.display = 'none'
        modalBg.style.display = 'none'
    })

    cross.addEventListener('click', () => {
        modal.style.display = 'none'
        modalBg.style.display = 'none'
    })

    modalArrow.addEventListener('click', (modalBg) => {
        modalContent.style.transform = 'translateX(0)'
        modalArrow.style.display = 'none'
    })

    addImg.addEventListener('click', () => {
        modalContent.style.transform = 'translateX(-100%)'
        modalArrow.style.display = 'block'
    })

    cross.addEventListener('click', (modalAdd) => {
        modalAdd.style.display = 'none'
    })

    buttonEditWorks.style.display = 'block'
    categoriesUl.style.display = 'none';
        
    let login = document.querySelector("nav ul li a[href='login.html']");

    async function displayWorksModal(){
        const works = await getWorks()
        const worksListModal = document.querySelector('.gallery-modal');
        worksListModal.innerHTML = ''
        works.forEach(work => {
            const item = document.createElement('li')
            item.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
                <p>éditer</p>
            `
            const button = document.createElement('button')
            button.innerHTML = '<img src="assets/icons/trash.svg" alt="Icone suppression">'

            button.addEventListener('click', async () => {
                const workGallery = document.querySelector(`.gallery figure[data-id="${work.id}"]`)

                const res = await deleteWork(work.id)
                if(!res.ok){
                    alert('Erreur lors de la suppression')
                    return
                }
                item.remove()
                workGallery.remove()
            })

            item.appendChild(button)
            worksListModal.appendChild(item)
        })
    }

    changeInnerHtml(login, "logout");
    logOut(login);
    displayWorksModal()
};