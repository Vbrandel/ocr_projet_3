class Dropdown {

    constructor(categories, setCategory) {
        this.categories = categories
        this.dropDownMenu = document.getElementById('js-dropdown');
        this.setCategory = setCategory
        this.createDOM()
        this.initEvent()
    }

    initEvent() {
        let dropDownBtn = document.querySelector('.input-field.dropbtn');
        dropDownBtn.addEventListener('click', () => {
            this.open()
        })

        dropDownBtn.addEventListener('click', () => {
            this.close()
        })

        this.dropDownMenu.addEventListener('click', (event) => {
            let dropbtn = document.querySelector('.input-field.dropbtn');
            let icon = "<i class='fa-solid fa-chevron-down'></i>"
            dropbtn.innerHTML = event.target.textContent + icon;
            dropbtn.dataset.id = event.target.dataset.id;
            this.setCategory(event.target.dataset.id)
        });
    }

    createDOM() {
        this.categories.forEach(category => {
            let listElement = document.createElement('li');
            this.dropDownMenu.appendChild(listElement);
            listElement.dataset.id = category.id;
            listElement.innerHTML = category.name;
            listElement.addEventListener('click', (e) => this.close(e));
        });
    }

    open() {
        this.dropDownMenu.style.display = "block";
    }

    close(e) {
        e.preventDefault();
        let dropDownMenu = document.getElementById('js-dropdown');
        if (dropDownMenu.style.display === "none") return;
        dropDownMenu.style.display = 'none';
    }


}