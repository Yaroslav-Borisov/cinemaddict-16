import AbstractView from './abstract-view.js'

const createFilmCardTemplate = (film) => {

    const { title, rating, releaseYear, duration, genres, image, description, commentsNumber, isWatchlist, isWatched, isFavorite } = film
    const durationHours = Math.trunc(duration / 60)
    const minutes = duration - 60 * durationHours
    const shortDescription = (description.length > 140) ? `${description.slice(0, 139)}...` : description;

    return `<article class="film-card">
                <a class="film-card__link">
                <h3 class="film-card__title">${title}</h3>
                <p class="film-card__rating">${rating}</p>
                <p class="film-card__info">
                    <span class="film-card__year">${releaseYear.getFullYear()}</span>
                    <span class="film-card__duration">${durationHours}h ${minutes}m</span>
                    <span class="film-card__genre">${genres[0]}</span>
                </p>
                <img src="./${image}" alt="" class="film-card__poster">
                <p class="film-card__description">${shortDescription}..</p>
                <span class="film-card__comments">${commentsNumber} comments</span>
                </a>
                <div class="film-card__controls">
                <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" data-name="isWatchlist" type="button">Add to watchlist</button>
                <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" data-name="isWatched" type="button">Mark as watched</button>
                <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" data-name="isFavorite" type="button">Mark as favorite</button>
                </div>
            </article>`
}

export default class SiteFilmCardView extends AbstractView {
    #film = null
    _callback = {}

    constructor(film) {
        super()
        this.#film = film
    }

    get template() {
        return createFilmCardTemplate(this.#film)
    }

    setLinkClickHandler = (callback) => {
        this._callback.linkClick = callback
        this.element.querySelector('.film-card__link').addEventListener('click', this.#linkClickHandler)
    }

    setWatchListClickHandler = (callback) => {
        this._callback.watchListClick = callback
        this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler)
    }

    setWatchedClickHandler = (callback) => {
        this._callback.watchedClick = callback
        this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler)
    }

    setFavoriteClickHandler = (callback) => {
        this._callback.favoriteClick = callback
        this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler)
    }

    #linkClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.linkClick()
    }

    #watchListClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.watchListClick()
    }

    #watchedClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.watchedClick()
    }

    #favoriteClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.favoriteClick()
    }
}