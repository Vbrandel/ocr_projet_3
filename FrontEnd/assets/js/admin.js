//Ce fichier charge le mode admin
const token = sessionStorage.getItem("token");
let selectedCategory = null;

//Change le logIn en logOut
function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function () {
        sessionStorage.clear();
    })
}

function adminInit() {

    const modal = new Modal()

    if (token != null) {
        const categoriesUl = document.querySelector('#categories');
        const buttonEditWorks = document.querySelector('#works-modify')
        const formAddWork = document.querySelector('#add-work-form')
        const navbarAdmin = document.querySelector('.navbar-admin')

        function openWorkModal() {
            displayWorksModal()
            modal.show()
        }

        buttonEditWorks.addEventListener('click', () => {
            openWorkModal()
        })

        document.getElementById("navbar").style.paddingTop = "50px";
        navbarAdmin.style.display = 'block';

        formAddWork.addEventListener('submit', (e) => {
            e.preventDefault()
            addWorkForm(e.target)
        })

        buttonEditWorks.style.display = 'block'
        categoriesUl.style.display = 'none';

        let login = document.querySelector("nav ul li a[href='login.html']");

        async function displayWorksModal() {
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

                //const move = document.createElement('move')
                //move.innerHTML = '<img src="assets/icons/deplacer.svg" alt="Icone move">'

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

        // Change la catégorie du menu //
        function setCategory(categoryId) {
            selectedCategory = categoryId
        }

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


        }

        function checkValidForm() {
            let buttonAddWork = document.getElementById('submit-work')
            let form = document.getElementById('add-work-form');
            form.addEventListener('input', function() {
                if ((form["title"].value !== "") && (form["add-photo"].value !== "")) {
                    buttonAddWork.style.backgroundColor = '#1D6154'
                    buttonAddWork.style.cursor = 'pointer'


                    // J'aimerais que tant que les 2 conditions ne sont pas réunis, les fonctionnalités JS du submit du form ne se déclenche pas
                    // Problème : Il pense que le form à toujours un fichier de charger (peut-être récuperer la fonction reader de l'autre page ?)
                //     buttonAddWork.classList.add('grey-btn');
                //     buttonAddWork.remove('submit-modal-add')
                // } else {
                //     buttonAddWork.classList.add('submit-modal-add');
                }
            })
        }

        changeInnerHtml(login, "logout");
        logOut(login);
        selectedCategory = categories[0].id
        new Dropdown(categories, setCategory)
        checkValidForm();
    }
}