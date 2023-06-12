const ACTIVE = 'active';
export default class ApplicationBar {
    #buttons;
    #sectionElements;
    #activeIndex;
    #callBackFunction;

    constructor(parentId, sections, callBackFunction) {
        this.#callBackFunction = callBackFunction;
        this.#fillButtons(parentId, sections.map(s => s.title));
        this.#setSectionsElements(sections.map(s => s.id));
        this.#addListeners();
    }

    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t =>
            `<button class="${'main-buttons'}"> ${t}</button>`).join("");
        this.#buttons = parentElement.childNodes;
    }

    #setSectionsElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id =>
            document.getElementById(id));
    }

    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)));
    }

    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            await this.#callBackFunction(index);
        }
        this.setUnhiddenPages(index);
    }

    getActiveIndex() {
        return this.#activeIndex;
    }

    logInSetName(userName) {
        return this.#buttons[6].innerHTML = userName;
    }

    hideButtons(setter, indexes) {
        indexes.forEach(index => {
            if (index >= 0 && index < this.#buttons.length) {
                this.#buttons[index].style.display = setter ? 'none' : 'inline';
            }
        });
    }

    inActivateButtons(setter, indexes) {
        indexes.forEach(index => {
            if (index >= 0 && index < this.#buttons.length) {
                this.#buttons[index].disabled = setter ? true : false;
                this.#buttons[index].style.backgroundColor = setter ? '#EDE7E7' : '#F66C13';
                this.#buttons[index].style.borderColor = setter ? '#EDE7E7' : '#F66C13';
                this.#buttons[index].style.color = setter ? '#262626' : '#EDE7E7';
            }
        });
    }

    setUnhiddenPages(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            if (this.#activeIndex != undefined) {
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            } else if (this.#activeIndex == undefined) {
                this.#sectionElements[0].hidden = true;
                this.#buttons[0].classList.remove(ACTIVE);
            }
            this.#buttons[index].classList.add(ACTIVE);
            this.#sectionElements[index].hidden = false;
            this.#activeIndex = index;
        } else {
            this.#sectionElements[index].hidden = false;
        }
    }
} 