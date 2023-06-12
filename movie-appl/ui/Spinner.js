export default class Spinner {
    #parentId;
    #spinnerElement; 

    constructor(parentId) {
        this.#parentId = parentId;
        this.#buildSpinner();
    }

        #buildSpinner(){
            const tableSectionElement = document.getElementById(this.#parentId);
            tableSectionElement.innerHTML =
                `<div id="spinner-id" class="spinner-place" hidden>
                </div>`;
            this.#spinnerElement = document.getElementById("spinner-id");
        }

        start() {
            this.#spinnerElement.hidden = false;
        }

        stop() {
            this.#spinnerElement.hidden = true;
        }
    } 