import { Keys, Mode, RenderPosition } from '../consts.js'
import { render, replace } from '../utils.js'
import SiteFilmCardView from '../view/site-film-card-view.js'
import SiteFilmPopupView from '../view/site-film-popup-view.js'
export default class FilmPresenter {
    #filmsWrapperComponent = null
    #filmCardComponent = null
    #filmPopupComponent = null
    #film = {}

    #mode = Mode.DEFAULT

    #changeData = null
    #changeMode = null

    constructor (filmsWrapperComponent, changeData, changeMode) {
        this.#filmsWrapperComponent = filmsWrapperComponent
        this.#changeData = changeData
        this.#changeMode = changeMode
    }

    init = (film) => {
        this.#film = film
        this.#renderFilm()
        this.#setEventHandlers()
    }

    destroy = () => {
        this.#filmCardComponent.removeElement()
        this.#filmPopupComponent.removeElement()
    }

    resetView = () => {
        if (this.#mode !== Mode.DEFAULT) {
            this.#closePopup()
        }
    }

    #renderFilm = () => {
        const filmsListContainerElement = this.#filmsWrapperComponent.getfilmsListContainerElement()

        const prevFilmCardComponent = this.#filmCardComponent
        const prevFilmPopupComponent = this.#filmPopupComponent

        this.#filmCardComponent = new SiteFilmCardView(this.#film)
        this.#filmPopupComponent = new SiteFilmPopupView(this.#film)

        if (prevFilmCardComponent === null && prevFilmPopupComponent === null) {
            render(filmsListContainerElement, this.#filmCardComponent, RenderPosition.BEFOREEND)
            return
        }

        if (this.#mode === Mode.DEFAULT) {
            replace(this.#filmCardComponent, prevFilmCardComponent)
        }

        if (this.#mode === Mode.POPUP) {
            replace(this.#filmCardComponent, prevFilmCardComponent)
            replace(this.#filmPopupComponent, prevFilmPopupComponent)
        }
    }

    #setEventHandlers = () => {
        this.#filmCardComponent.setLinkClickHandler(this.#handleLinkClick)
        this.#filmCardComponent.setWatchListClickHandler(this.#handleWatchListClick)
        this.#filmCardComponent.setWatchedClickHandler(this.#handleWatchedClick)
        this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick)

        this.#filmPopupComponent.setWatchListClickHandler(this.#handleWatchListClick)
        this.#filmPopupComponent.setWatchedClickHandler(this.#handleWatchedClick)
        this.#filmPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick)
        this.#filmPopupComponent.setCloseClickHandler(this.#handleCloseClick)
    }

    #showPopup = () => {
        this.#changeMode()
        document.body.classList.add('hide-overflow')
        render(document.body, this.#filmPopupComponent, RenderPosition.BEFOREEND)
        this.#mode = Mode.POPUP
    }

    #closePopup = () => {
        document.body.classList.remove('hide-overflow')
        this.#filmPopupComponent.element.remove()
        this.#mode = Mode.DEFAULT
    }

    #onEscKeyDown = (evt) => {
        if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
            evt.preventDefault()
            this.#closePopup()
        }
    }

    #handleLinkClick = () => {
        this.#showPopup()
        document.addEventListener('keydown', this.#onEscKeyDown, { once: true })
    }

    #handleCloseClick = () => {
        this.#closePopup()
        document.removeEventListener('keydown', this.#onEscKeyDown)
    }

    #handleWatchListClick = () => {
        this.#changeData({ ...this.#film, isWatchlist: !this.#film.isWatchlist })
    }

    #handleWatchedClick = () => {
        this.#changeData({ ...this.#film, isWatched: !this.#film.isWatched })
    }

    #handleFavoriteClick = () => {
        this.#changeData({ ...this.#film, isFavorite: !this.#film.isFavorite })
    }
}