import serviceConfig from "../config/service-config.json" assert{type: 'json'}

export default class APIGenerator {

    constructor() {
    }

    generateURL(values, genres, countries, languages) {
        const { baseUrlNowPlaying, baseUrlUpcoming, discover_movie } = serviceConfig;
        const { isReleased, includeAdult, withGenres, withoutGenres, country, language, sort } = values;
        const genresArray = Object.values(genres)[0];
        const date = new Date().toISOString().split('T')[0];
        let res = null;

        if (includeAdult === null && this.isEmpty(withGenres) && this.isEmpty(withoutGenres) && country === ""
            && language === "" && sort === "") {
            res = isReleased == "true" ? baseUrlNowPlaying : baseUrlUpcoming;
        } else {
            res = discover_movie;
            res = res.concat(isReleased == "true" ? `&release_date.lte=${date}` : `&release_date.gte=${date}`);
            if (includeAdult != null) {
                res = res.concat(`include_adult=${includeAdult}`)
            }
            if (language != "") {
                const languageValue = languages.filter(l => l.english_name == language).map(l => l.iso_639_1)[0];
                res = res.concat(`&language=${languageValue}`);
            }
            res = res.concat(`&sort_by=${sort != "" ? sort : "popularity.desc"}`);
            if (!this.isEmpty(withGenres)) {
                const genreWithIds = this.convertArray(genresArray, withGenres);
                res = res.concat(`&with_genres=${genreWithIds}`)
            }
            if (country != "") {
                const countryValue = countries.filter(c => c.english_name == country).map(c => c.iso_3166_1)[0];
                res = res.concat(`&with_origin_country=${countryValue}`);
            }
            if (!this.isEmpty(withoutGenres)) {
                const genreWithoutIds = this.convertArray(genresArray, withoutGenres);
                res = res.concat(`&without_genres=${genreWithoutIds}`)
            }
            res = res.concat("&page=");
        }
        return res;
    }

    isEmpty(array) {
        return array.length === 1 && array[0] === '';
    }

    convertArray(array1, array2) {
        if (array2[0] === '') {
            array2 = array2.slice(1);
        }
        const newArray = array2.map((myGenre) => {
            const obj = array1.filter((g) => g.name == myGenre);
            if (obj != undefined) {
                myGenre = obj;
            }
            return myGenre;
        });
        const res = newArray.map((g) => g = g[0].id).join("&");
        return res;
    }
}

 