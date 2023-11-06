import AbstractView from './abstract-view.js'

const createFilmCardTemplate = (film) => {

    const {title, rating, releaseYear, duration, genres, image, description, commentsNumber, isWatchlist, isWatched, isFavorite } = film

    return `<article class="film-card">
                <a class="film-card__link">
                <h3 class="film-card__title">${title}</h3>
                <p class="film-card__rating">${rating}</p>
                <p class="film-card__info">
                    <span class="film-card__year">${releaseYear}</span>
                    <span class="film-card__duration">${duration}</span>
                    <span class="film-card__genre">${genres[0]}</span>
                </p>
                <img src="./images/posters/${image}" alt="" class="film-card__poster">
                <p class="film-card__description">${description}</p>
                <span class="film-card__comments">${commentsNumber} comments</span>
                </a>
                <div class="film-card__controls">
                <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
                <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
                <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
                </div>
            </article>`
}

export default class SiteFilmCardView extends AbstractView {
    #film = null

    constructor(film) {
        super()
        this.#film = film
    }
  
    get template() {
        return createFilmCardTemplate(this.#film)
    }

    setEditClickHandler = (callback) => {
        this._callback.editClick = callback
        this.element.addEventListener('click', this.#editClickHandler)
    }

    #editClickHandler = (evt) => {
        evt.preventDefault()
        
        this._callback.editClick()
    }
  }