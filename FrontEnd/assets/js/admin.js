//Ce fichier charge le mode admin

const token = sessionStorage.getItem("token");
let selectedCategory = null;

//Change le logIn en logOut
function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

// Déconnexion 
function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function () {
        sessionStorage.clear();
    })
}

function adminInit() {

    const modal = new Modal()

    // Action si connecté
    if (token != null) {
        const categoriesUl = document.querySelector('#categories');
        const buttonEditWorks = document.querySelector('#works-modify')
        const formAddWork = document.querySelector('#add-work-form')
        const navbarAdmin = document.querySelector('.navbar-admin')
        const dltImg = document.querySelector('.dlt-img')

        function openWorkModal() {
            displayWorksModal()
            modal.show()
        }

    // Ouvre la modal avec le bouton
        buttonEditWorks.addEventListener('click', () => {
            openWorkModal()
        })

        document.getElementById("navbar").style.paddingTop = "50px";
        navbarAdmin.style.display = 'block';

        formAddWork.addEventListener('submit', (e) => {
            e.preventDefault()
            addWorkForm(e.target)
        })
        
        dltImg.addEventListener('click', deleteAllWorks)

        buttonEditWorks.style.display = 'block'
        categoriesUl.style.display = 'none';

        let login = document.querySelector("nav ul li a[href='login.html']");

        // Affiche la modal de galerie 
        async function displayWorksModal() {
            const worksListModal = document.querySelector('.gallery-modal');
            worksListModal.innerHTML = ''
            works.forEach(work => {
                const item = document.createElement('li')
                item.setAttribute('data-list-id', work.id)
                item.innerHTML = `
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <p>éditer</p>
                `
                const button = document.createElement('button')
                button.innerHTML = '<img src="assets/icons/trash.svg" alt="Icone suppression">'

                button.addEventListener('click', async () => {
                    const workGallery = document.querySelector(`.gallery figure[data-id="${work.id}"]`)

                    const res = await deleteWork(work.id)
                    if (!res.ok) {
                        alert('Erreur lors de la suppression')
                        return
                    }
                    item.remove()
                    workGallery.remove()
                    works = works.filter(w => w.id !== work.id)
                })

                item.appendChild(button)
                worksListModal.appendChild(item)
            })
        }

        // Change la catégorie du menu déroulant 
        function setCategory(categoryId) {
            selectedCategory = categoryId
        }

        // Ajoute les photos
        async function addWorkForm(form) {
            const title = form.title.value
            const category = selectedCategory
            const image = form.photo.files[0]
            const formData = new FormData()
            formData.append('title', title)
            formData.append('category', category)
            formData.append('image', image)

            const work = await addWork(formData).then(res => res.json())

            works.push(work)
            addWorkGallery(work)
            modal.hide()
            emptyForm()
        }

        function emptyForm(){
            const buttonAddWork = document.getElementById('submit-work')
            const form = document.getElementById('add-work-form');
            const photoModalAdd = document.querySelector('.photo-modal-add');

            buttonAddWork.setAttribute('disabled', '')
            form.reset()
            photoModalAdd.setAttribute('src', 'assets/icons/addImg.svg')

        }

        // Vérifie si les champs sont bien remplis
        function checkValidForm(form) {
            const buttonAddWork = document.getElementById('submit-work')
            if(
                form.title.value &&
                form.title.value.length >= 3 &&
                form.photo.files[0]
            ){
                buttonAddWork.removeAttribute('disabled')
                return
            }
            buttonAddWork.setAttribute('disabled', '')
        }

        function initEventForm(){
            const addPhoto = document.querySelector('#add-photo')
            const title = document.querySelector('#title')

            let form = document.getElementById('add-work-form');

            title.addEventListener('input', (e) => {
                checkValidForm(form)
            })

            addPhoto.addEventListener('input', (e) => {
                checkValidForm(form)
            })

        }

        // Bouton suppression galerie
        async function deleteAllWorks(){
            for(let work of works){
                const dataListId = document.querySelector(`[data-list-id="${work.id}"]`)
                const dataId = document.querySelector(`[data-id="${work.id}"]`)
                const res = await deleteWork(work.id)
                if(res.ok){
                    dataListId.remove()
                    dataId.remove()
                }
                window.location.reload();
            }
        }

        changeInnerHtml(login, "logout");
        logOut(login);
        selectedCategory = categories[0].id
        new Dropdown(categories, setCategory)
        initEventForm();
    }
}