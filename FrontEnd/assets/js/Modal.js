class Modal {

    constructor() {
        this.modalBg = document.querySelector('.modal-bg')
        this.modal = document.querySelector('.modal')
        this.cross = document.querySelector('.cross')
        this.modalContent = document.querySelector('.modal-container ul')
        this.modalArrow = document.querySelector('.modal .arrow')
        this.addImg = document.querySelector('.add-img')
        this.addPhoto = document.querySelector('#add-photo')
        this.initEvents()
    }

    initEvents() {
        this.modalBg.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(0)' // fonctionne bizarrement
            this.modalArrow.style.display = 'none'
            this.hide()
        });

        this.cross.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(0)' // fonctionne bizarrement
            this.modalArrow.style.display = 'none'
            this.hide()
        })

        this.modalArrow.addEventListener('click', (modalBg) => {
            this.modalContent.style.transform = 'translateX(0)'
            this.modalArrow.style.display = 'none'
        })

        this.addImg.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(-100%)'
            this.modalArrow.style.display = 'block'
        })

        this.addPhoto.addEventListener('change', (e) => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const photoModalAdd = document.querySelector('.photo-modal-add')
                // Pour enlever le bouton quand un élément est chargé
                // const btnPhoto = document.querySelector('.btn-photo')
                // btnPhoto.style.display = 'none'
                photoModalAdd.src = reader.result;
            }, false);

            const file = e.target.files[0]
            const formats = [
                'image/png',
                'image/jpg',
                'image/jpeg',
            ]

            if(!formats.includes(file.type)){
                alert('Format non compatible');
                e.target.value = null
                return
            }

            if(file.size > 4000000){
                alert('Image trop volumineuse');
                e.target.value = null
                return
            }
            reader.readAsDataURL(file);
        })
    }

    show() {
        this.modal.style.display = 'block'
        this.modalBg.style.display = 'block'
    }

    hide() {
        this.modal.style.display = 'none'
        this.modalBg.style.display = 'none'
    }

    

}