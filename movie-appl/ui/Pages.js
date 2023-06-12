const MAX_PAGES = 500;
const FIRST_PAGE = 1;

export default class Pages {
    #URL;
    #URL_key;
    #page;
    #maxPage;
    actualPage;

    constructor(URL, URL_key) {
        this.#URL = URL;
        this.#URL_key = URL_key;
        this.#page = FIRST_PAGE;
        this.getMax();
    }

    getPage(isNext, amount) {
        const value = isNext ? (this.#page + amount) : (this.#page - amount);
        const checker = isNext ? (value <= this.#maxPage) : (value >= FIRST_PAGE);
        if (checker) {
            this.#page = value;
        } else {
            alert(`${isNext ? `Error: page must be less than or equal to 500` : `Error: page must be more than 0`}`)
        }
        return checker ? this.getURL() : null;
    }

    async #getMaxFromURL() {
        const response = await fetch(this.#URL.concat(this.#URL_key)).then(response => response.json());
        return response.total_pages;
    }

    async getMax() {
        const maxPage = await this.#getMaxFromURL();
        this.#maxPage = maxPage < MAX_PAGES ? maxPage : MAX_PAGES;
    }

    getActualPage() {
        return this.actualPage;
    }

    getURL() {
        return this.#URL.concat(this.#page).concat(this.#URL_key);
    }
} 