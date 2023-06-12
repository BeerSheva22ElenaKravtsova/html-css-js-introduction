const IS_RELEASED_ID = 'nowPlaying';
const NOW_PLAYING_ID = 'nowPlaying';
const UPCOMING_ID = 'upcoming';
const WITH_GENRES_ID = 'withGenre';
const WITHOUT_GENRES_ID = 'withoutGenre';
const COUNTRIES_ID = 'countries';
const INCLUDE_ADULT = 'include_adult';
const LANGUAGES_ID = 'languages';
const SORT_ID = 'sort';
const FORM_ID = 'form-id';

export default class SearchForm {
    #dataObj;
    #formElement;
    #withGenresElement;
    #withoutGenresElement;
    #countriesElement;
    #languagesElement;
    #sortElement;

    #parentId;
    #genres;
    #countries; 
    #languages;
    #sortValues;

    constructor(parentId, genres, countries, languages, sortValues) {
        this.#parentId = parentId;
        this.#genres = genres.genres.map(g => g.name);
        this.#genres.sort((a, b) => a.localeCompare(b));
        this.#countries = countries.map(c => c.english_name);
        this.#countries.sort((a, b) => a.localeCompare(b));
        this.#languages = languages.map(l => l.english_name);
        this.#languages.sort((a, b) => a.localeCompare(b));
        this.#sortValues = sortValues;
        this.#dataObj = {};
        this.#fillForm();
        this.#setElements();
        this.#setSelectOptions();
    }

    #setSelectOptions() {
        setOptionItems(this.#withGenresElement, this.#genres, 'Include genres');
        setOptionItems(this.#withoutGenresElement, this.#genres, 'Exclude genres');
        setOptionItems(this.#countriesElement, this.#countries, 'Select countries');
        setOptionItems(this.#languagesElement, this.#languages, 'Select languages');
        setOptionItems(this.#sortElement, this.#sortValues, 'Sort by');
    }

    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#withGenresElement = document.getElementById(`${this.#parentId}-${WITH_GENRES_ID}`);
        this.#withoutGenresElement = document.getElementById(`${this.#parentId}-${WITHOUT_GENRES_ID}`);
        this.#countriesElement = document.getElementById(`${this.#parentId}-${COUNTRIES_ID}`);
        this.#languagesElement = document.getElementById(`${this.#parentId}-${LANGUAGES_ID}`);
        this.#sortElement = document.getElementById(`${this.#parentId}-${SORT_ID}`);
    }

    #fillForm() {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = `
        <form class="form-control" id="${this.#parentId}-${FORM_ID}" method="post">
            <div class="header">Please fill out this form:</div>

            <div class="radio-form-control" id="${this.#parentId}-${IS_RELEASED_ID}">
                <div class = "radio-group">
                    <div class = "radio-released-control">
                        <label for="${NOW_PLAYING_ID}">Now Playing: </label>
                        <input id="${NOW_PLAYING_ID}" type ="radio" name= "isReleased" class="input-control" required value="true" unchecked>
                    </div>

                    <div class = "radio-released-control">
                        <label for="${UPCOMING_ID}">Upcoming: </label>
                        <input id="${UPCOMING_ID}" type ="radio" name= "isReleased" class="input-control" required value="false" unchecked>
                    </div>
                </div>
            </div>

            <div class="row-input">
                <label class="label-input" for="${this.#parentId}-${WITH_GENRES_ID}">Included Genres: </label>
                <select id="${this.#parentId}-${WITH_GENRES_ID}" name="withGenres" class="select-control" class="input-control" multiple></select>
                <label class="label-input" for="${this.#parentId}-${WITHOUT_GENRES_ID}">Excluded Genres: </label>
                <select id="${this.#parentId}-${WITHOUT_GENRES_ID}" name="withoutGenres" class="select-control" class="input-control" multiple>Select Excluded Genres:</select>
            </div>

            <div class="row-input">
            <label class="label-input" for="${this.#parentId}-${COUNTRIES_ID}">Select origin country: </label>
            <select id="${this.#parentId}-${COUNTRIES_ID}" name="country" class="select-control" class="input-control"></select>
            </div>

            <div class="row-input">
            <label class="label-input" for="${this.#parentId}-${LANGUAGES_ID}">Select Language: </label>
            <select id="${this.#parentId}-${LANGUAGES_ID}" name="language" class="select-control" class="input-control"></select>
            </div>

            <div class="radio-form-control" id="${this.#parentId}-${INCLUDE_ADULT}">
            <div class = "radio-group">
                <div class = "radio-released-control">
                    <label for="include-adult">Include Adult: </label>
                    <input id="include-adult" type="radio" name="includeAdult" class="input-control" value="true" unchecked>
                </div>

                <div class = "radio-released-control">
                    <label for="exclude-adult">Exclude Adult: </label>
                    <input id="exclude-adult" type="radio" name="includeAdult" class="input-control" value="false" unchecked>
                </div>
            </div>
            </div>

            <div class="row-input">
            <label class="label-input" for="${this.#parentId}-${SORT_ID}">Sort by: </label>
            <select id="${this.#parentId}-${SORT_ID}" name="sort" class="select-control" class="input-control"></select>
            </div>

            <button type="submit" class="search-buttons">Submit</button>
            <button type="reset" class="search-buttons">Reset</button>
        </form>
        `
    }

    addHandler(submitFunction) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.isReleased = formData.get('isReleased');
            this.#dataObj.includeAdult = formData.get('includeAdult');
            this.#dataObj.withGenres = formData.getAll('withGenres');
            this.#dataObj.withoutGenres = formData.getAll('withoutGenres');
            this.#dataObj.country = formData.get('country');
            this.#dataObj.language = formData.get('language');
            this.#dataObj.sort = formData.get('sort');
            await submitFunction(this.#dataObj);
            this.#formElement.reset();
        }
        this.#formElement.onreset = () => {
            this.#dataObj = {};
            this.#setSelectOptions();
        }
    }

    hideForm(setter) {
        const formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        formElement.hidden = setter;
    }
}

function setOptionItems(element, options, placeHolder) {
    element.innerHTML = `<option value hidden selected>--${placeHolder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('');
}