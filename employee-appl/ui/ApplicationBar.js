const ACTIVE = 'active';
export default class ApplicationBar{
    #buttons;
    #sectionElements;
    #activeIndex;
    #callBackFunction;

    constructor(parentId, sections, callBackFunction){
        //sections - array of objects
        //each object {title: string, id: string}
        this.#callBackFunction = callBackFunction;
        this.#fillButtons(parentId, sections.map(s=>s.title));
        this.#setSectionsElements(sections.map(s=>s.id));
        this.#addListeners();
    }
  
    #fillButtons(parentId, titles){
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t=>
            `<button class="main-buttons"> ${t}</button>`).join("");
        this.#buttons = parentElement.childNodes;
    }

    #setSectionsElements(sectionIds){
        this.#sectionElements = sectionIds.map(id =>
            document.getElementById(id));
    }

    #addListeners(){
        this.#buttons.forEach((b,index) => b.addEventListener('click', this.#handler.bind(this,index)));
    }

    async #handler(index){
        if(this.#activeIndex == undefined || index != this.#activeIndex){

            if(this.#activeIndex != undefined ){
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }
            this.#buttons[index].classList.add(ACTIVE);
            await this.#callBackFunction(index);

            this.#sectionElements[index].hidden = false;

            this.#activeIndex = index;
        }
    }
}

