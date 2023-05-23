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
        //Ferme la modal si on clique en dehors
        this.modalBg.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(0)'
            this.modalArrow.style.display = 'none'
            this.hide()
        });

        // Croix pour close la modal
        this.cross.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(0)'
            this.modalArrow.style.display = 'none'
            this.hide()
        })

        // Arrow pour revenir à la modal précedente
        this.modalArrow.addEventListener('click', (modalBg) => {
            this.modalContent.style.transform = 'translateX(0)'
            this.modalArrow.style.display = 'none'
        })

        // Bouton première modal avec effet slide vers la deuxième
        this.addImg.addEventListener('click', () => {
            this.modalContent.style.transform = 'translateX(-100%)'
            this.modalArrow.style.display = 'block'
        })

        // Reader de photo
        this.addPhoto.addEventListener('change', (e) => {
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                const photoModalAdd = document.querySelector('.photo-modal-add')
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