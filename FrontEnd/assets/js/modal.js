class Modal {

    constructor() {
        this.modalBg = document.querySelector('.modal-bg')
        this.modal = document.querySelector('.modal')
        this.cross = document.querySelector('.cross')
        this.modalContent = document.querySelector('.modal-container ul')
        this.modalArrow = document.querySelector('.modal .arrow')
        this.addImg = document.querySelector('.add-img')
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