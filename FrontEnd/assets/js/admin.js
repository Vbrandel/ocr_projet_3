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
        let dropDownMenu = document.getElementById('js-dropdown');
        const formAddWork = document.querySelector('#add-work-form')

        function closeWorkModal() {
            modal.style.display = 'none'
            modalBg.style.display = 'none'
        }

        function openWorkModal(){
            displayWorksModal()
            modal.style.display = 'block'
            modalBg.style.display = 'block'
        }

        buttonEditWorks.addEventListener('click', () => {
            openWorkModal()
        })

        modalBg.addEventListener('click', () => {
            closeWorkModal()
        })

        cross.addEventListener('click', () => {
            modalContent.style.transform = 'translateX(0)' // fonctionne bizarrement
            closeWorkModal()
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
            modalAdd.style.display = 'none';
        })

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

        // Ouverture menu //
        function openDropdownBtn(dropDownMenu) {
            let dropDownBtn = document.querySelector('.input-field.dropbtn');
            dropDownBtn.addEventListener('click', function (event) {
                dropDownMenu.style.display = "block";
            })
        }

        // Fermeture menu //
        const closeDropDown = function (e) {
            let dropDownMenu = document.getElementById('js-dropdown');
            if (dropDownMenu.style.display === "none") return;
            e.preventDefault();
            dropDownMenu.style.display = 'none';
        }

        // Ajoute les catégories au menu déroulant //
        function dropDownCategories(dropDownMenu) {
            selectedCategory = categories[0].id
            categories.forEach(category => {
                let listElement = document.createElement('li');
                dropDownMenu.appendChild(listElement);
                listElement.dataset.id = category.id;
                listElement.innerHTML = category.name;
                listElement.addEventListener('click', closeDropDown);
            });
            setCategory(dropDownMenu);
        }

        // Change la catégorie du menu //
        function setCategory(dropDownMenu) {
            dropDownMenu.addEventListener('click', function (event) {
                let dropbtn = document.querySelector('.input-field.dropbtn');
                let icon = "<i class='fa-solid fa-chevron-down'></i>"
                dropbtn.innerHTML = event.target.textContent + icon;
                dropbtn.dataset.id = event.target.dataset.id;
                selectedCategory = event.target.dataset.id
            });
        }

        // Test mignature ?
        //function changeFile() {
        //    const inputFile = document.querySelector('.photo-modal-add')
        //    const imgUploaded = document.createElement('img');
        //                
        //        image.src = URL.createObjectURL(inputFile.files[0]);
        //        image.className = 'img-uploaded';
        //        document.querySelector('.add-block').appendChild(imgUploaded); //je créer la visualisation de l'image
        //            
        //    }

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
            closeWorkModal()


        }

        changeInnerHtml(login, "logout");
        logOut(login);
        dropDownMenu.style.display = "none";
        openDropdownBtn(dropDownMenu);
        dropDownCategories(dropDownMenu);
    }
}