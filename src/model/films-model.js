import AbstractObservable from '../utils/abstract-observable.js';

export default class FilmsModel extends AbstractObservable {
  #apiService = null
  #films = []

  constructor(apiService) {
    super()
    this.#apiService = apiService
  }

  set films(value) {
    this.#films = value
  }

  get films() {
    return this.#films
  }

  init = async () => {
    const films = await this.#apiService.films
    console.log(films)
    this.#films = films.map(this.#adaptToClient)
    console.log(this.#films)
  }

  updateFilm = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id)

    if (index === -1) {
      throw new Error('Can\'t update unexisting task')
    }

    this.#films = [
      ...this.#films.slice(0, index), update, ...this.#films.slice(index + 1)
    ]

    this._notify(updateType, update)
  }

  #adaptToClient = (film) => {
    const adaptedFilm = {
      ...film,
      isWatchlist: film.user_details.watchlist,
      isWatched: film.user_details.already_watched,
      isFavorite: film.user_details.favorite,
      watchingDate: new Date(film.user_details.watching_date),
      image: film.film_info.poster,
      title: film.film_info.title,
      originalTitle: film.film_info.alternative_title,
      rating: film.film_info.total_rating,
      director: film.film_info.director,
      screenwriters: film.film_info.writers,
      cast: film.film_info.actors,
      releaseYear: new Date(film.film_info.release.date),
      duration: film.film_info.runtime,
      genres: film.film_info.genre,
      description: film.film_info.description,
      country: film.film_info.release.release_country,
      ageRating: film.film_info.age_rating,
      commentsNumber: film.comments.length,
      comments: ``,
    }

    delete adaptedFilm['user_details']
    delete adaptedFilm['film_info']
    delete adaptedFilm['comments']

    return adaptedFilm
  }
}