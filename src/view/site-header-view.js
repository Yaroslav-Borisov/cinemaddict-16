import { watchedFilmCountToUserRank } from '../utils/utils.js'
import AbstractView from './abstract-view.js'

const createHeaderTemplate = (userRank) => {
    return `<header class="header" id="header">
                <h1 class="header__logo logo">Cinemaddict</h1>
                <section class="header__profile profile">
                    <p class="profile__rating">${userRank}</p>
                    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                </section>
            </header>`
}

export default class SiteHeaderView extends AbstractView {
    #films = null
    #userRank = null

    constructor(films) {
        super()
        this.#films = films.filter((film) => film.isWatched)
        this.#userRank = watchedFilmCountToUserRank(this.#films.length)
    }

    get template() {
        return createHeaderTemplate(this.#userRank)
    }
}