const POLLING_INTERVAL = 5000;
 
export default class MovieServiceRest {
  #URL;
  #pictureUrl;

  constructor(baseURL, pictureUrl) {
    this.#URL = baseURL;
    this.#pictureUrl = pictureUrl;
  }

  async getAllMovies() {
    const response = await fetch(this.#URL).then(response => response.json());
    return response.results;
  }

  async getObjectsById(id, key) {
    const thisURL = key ? `${this.#URL}${id}${key}` : `${this.#URL}/${id}`;
    const response = await fetch(thisURL);
    return await response.json();
  }

  async updateObject(objectId, newValue) {
    const objectURL = `${this.#URL}/${objectId}`;
    const response = await fetch(objectURL, {
      method: 'PUT',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(newValue)
    });
    return response.json();
  }

  async getFoundObjects(key, objectsId) {
    const array = objectsId ? await Promise.all(objectsId.map(o => o = this.getObjectsById(o, key))) : await this.getAllMovies();
    const objectsMap = array.length > 0 ? await Promise.all(array.map(async movie => {
      const imageUrl = this.#pictureUrl.concat(movie.poster_path);
      if (movie.poster_path == null) {
        console.log(`${movie.title}: no data with poster_path`);
      }
      return {
        id: movie.id,
        image: imageUrl,
        title: movie.title,
        release: `Release Date: ${movie.release_date}`,
        voteAverage: `Average Vote: ${movie.vote_average}`,
      };
    })) : null;
    return objectsMap;
  }

  async getDetailsPage() {
    const response = await fetch(this.#URL);
    const data = await response.json();
    return data;
  }

  async getDetailsPageObjects() {
    const movie = await this.getDetailsPage();
    const imageUrl = this.#pictureUrl.concat(movie.backdrop_path);
    if (movie.backdrop_path == null) {
      console.log(`${movie.title}: no data with backdrop_path`);
    }
    return {
      id: movie.id,
      image: imageUrl,
      title: movie.title,
      status: `Status: ${movie.status}`,
      release: `Release Date: ${movie.release_date}`,
      voteAverage: `Average Vote: ${movie.vote_average}`,
      overview: `Overview: ${movie.overview}`,
      genres: `Genres: ${movie.genres.map(genre => genre.name)}`
    };
  };
}