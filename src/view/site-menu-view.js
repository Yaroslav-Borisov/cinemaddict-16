import AbstractView from './abstract-view.js'

const createMenuTemplate = (films, active) => {

    const navFilmsCount = {
        isWatchlist: 0,
        isWatched: 0,
        isFavorite: 0,
    }

    films.forEach((film) => {
        if (film.isWatchlist) {
            navFilmsCount.isWatchlist++
        }
        if (film.isWatched) {
            navFilmsCount.isWatched++
        }
        if (film.isFavorite) {
            navFilmsCount.isFavorite++
        }
    })

    return  `<nav class="main-navigation">
                ${active === 'all-films' ? `
                <div class="main-navigation__items">
                    <a href="#all" class="main-navigation__item main-navigation__item--active" data-name="all-films">All movies</a>
                    <a href="#watchlist" class="main-navigation__item" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${navFilmsCount.isWatchlist}</span></a>
                    <a href="#history" class="main-navigation__item" data-name="isWatched">History <span class="main-navigation__item-count">${navFilmsCount.isWatched}</span></a>
                    <a href="#favorites" class="main-navigation__item" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${navFilmsCount.isFavorite}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional">Stats</a>` : ''}
                ${active === 'isWatchlist' ? `
                <div class="main-navigation__items">
                    <a href="#all" class="main-navigation__item" data-name="all-films">All movies</a>
                    <a href="#watchlist" class="main-navigation__item main-navigation__item--active" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${navFilmsCount.isWatchlist}</span></a>
                    <a href="#history" class="main-navigation__item" data-name="isWatched">History <span class="main-navigation__item-count">${navFilmsCount.isWatched}</span></a>
                    <a href="#favorites" class="main-navigation__item" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${navFilmsCount.isFavorite}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional" data-name="stats">Stats</a>` : ''}
                ${active === 'isWatched' ? `
                <div class="main-navigation__items">
                    <a href="#all" class="main-navigation__item" data-name="all-films">All movies</a>
                    <a href="#watchlist" class="main-navigation__item" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${navFilmsCount.isWatchlist}</span></a>
                    <a href="#history" class="main-navigation__item main-navigation__item--active" data-name="isWatched">History <span class="main-navigation__item-count">${navFilmsCount.isWatched}</span></a>
                    <a href="#favorites" class="main-navigation__item" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${navFilmsCount.isFavorite}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional" data-name="stats">Stats</a>` : ''}
                ${active === 'isFavorite' ? `
                <div class="main-navigation__items">
                    <a href="#all" class="main-navigation__item" data-name="all-films">All movies</a>
                    <a href="#watchlist" class="main-navigation__item" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${navFilmsCount.isWatchlist}</span></a>
                    <a href="#history" class="main-navigation__item" data-name="isWatched">History <span class="main-navigation__item-count">${navFilmsCount.isWatched}</span></a>
                    <a href="#favorites" class="main-navigation__item main-navigation__item--active" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${navFilmsCount.isFavorite}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional" data-name="stats">Stats</a>` : ''}
                ${active === 'stats' ? `
                <div class="main-navigation__items">
                    <a href="#all" class="main-navigation__item" data-name="all-films">All movies</a>
                    <a href="#watchlist" class="main-navigation__item" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${navFilmsCount.isWatchlist}</span></a>
                    <a href="#history" class="main-navigation__item" data-name="isWatched">History <span class="main-navigation__item-count">${navFilmsCount.isWatched}</span></a>
                    <a href="#favorites" class="main-navigation__item main-navigation__item" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${navFilmsCount.isFavorite}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional main-navigation__additional--active" data-name="stats">Stats</a>` : ''}
            </nav>`
}

export default class SiteMenuView extends AbstractView {
    #films = null
    #active = null
    _callback = {}

    constructor(films, active) {
        super()
        this.#films = films
        this.#active = active
    }

    get template() {
        return createMenuTemplate(this.#films, this.#active)
    }

    setEditClickHandler = (callback) => {
        this._callback.editClick = callback
        this.element.addEventListener('click', this.#editClickHandler)
    }

    #editClickHandler = (evt) => {
        evt.preventDefault()
        const menuFilters = this.element.querySelectorAll('.main-navigation__item')
        menuFilters.forEach((filter) => {
            filter.classList.remove('main-navigation__item--active')
        })

        const activeMenuFilter = evt.target.getAttribute('data-name')

        evt.target.classList.add('main-navigation__item--active')
        if (activeMenuFilter) {
            this._callback.editClick?.(activeMenuFilter)
        }

        if (evt.target.classList.contains('main-navigation__additional')) {
            this._callback.editClick?.('stats')
        }
    }
}