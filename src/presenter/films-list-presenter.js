import { RenderPosition, render, updateItem } from '../utils.js'
import SiteFilmsListView from '../view/site-films-list-view.js'
import SiteMenuView from '../view/site-menu-view.js'
import SiteSortFiltersView from '../view/site-sort-filters-view.js'
import FilmPresenter from './film-presenter.js'

export default class FilmsListPresenter {
    #filmsListContainer = null
    #menuComponent = null
    #sortComponent = new SiteSortFiltersView()

    #filmsWrapperComponent = null
    #startFilmCardsCount = null
    #FILMS_CARD_COUNT_PER_STEP = null

    #films = []
    #filmPresenter = new Map()

    #activeMenuFilter = 'all-films'
    #activeSortFilter = 'default'

    constructor(filmsListContainer) {
        this.#filmsListContainer = filmsListContainer
    }

    get filteredFilms() {
        let filteredFilms = []

        if (this.#activeMenuFilter === 'all-films') {
            filteredFilms = this.#films
        } else {
            filteredFilms = this.#films.filter((film) => {
                if (film[this.#activeMenuFilter]) return film
            })
        }

        if (this.#activeSortFilter === 'by-date') {
            filteredFilms = filteredFilms.sort((a, b) => b.releaseYear - a.releaseYear)
        }
        if (this.#activeSortFilter === 'by-rating') {
            filteredFilms = filteredFilms.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        }

        return filteredFilms
    }

    init = (films) => {
        this.#films = [...films]
        this.#startFilmCardsCount = 5
        this.#FILMS_CARD_COUNT_PER_STEP = 5
        this.#filmsWrapperComponent = new SiteFilmsListView(this.#films.length)

        this.#renderMenuFilters()
        this.#renderSortFilters()

        render(this.#filmsListContainer, this.#filmsWrapperComponent, RenderPosition.BEFOREEND)

        this.#renderFilmList()
        this.#initMenuFiltersEvents()
        this.#initSortFiltersEvents()
    }

    #renderMenuFilters = () => {
        if (this.#menuComponent !== null) {
            this.#menuComponent.removeElement()
        }

        this.#menuComponent = new SiteMenuView(this.#films)
        render(this.#filmsListContainer, this.#menuComponent, RenderPosition.AFTERBEGIN)
    }

    #renderFilmCard = (film) => {
        const filmPresenter = new FilmPresenter(this.#filmsWrapperComponent, this.#handleFilmChange, this.#handleModeChange)
        filmPresenter.init(film)
        this.#filmPresenter.set(film.id, filmPresenter)
    }

    #handleFilmChange = (updatedFilm) => {
        this.#films = updateItem(this.#films, updatedFilm)
        this.#filmPresenter.get(updatedFilm.id).init(updatedFilm)
    }

    #handleModeChange = () => {
        this.#filmPresenter.forEach((presenter) => presenter.resetView())
    }

    #clearFilmList = () => {
        this.#filmPresenter.forEach((presenter) => presenter.destroy())
        this.#filmPresenter.clear()
        this.#startFilmCardsCount = 5
        this.#filmsWrapperComponent.removeShowMoreElement()
    }

    #renderFilmCards = (counts, films) => {
        const filmsListContainerElement = this.#filmsWrapperComponent.element.querySelector('.films-list__container')
        filmsListContainerElement.innerHTML = ''
        for (let i = 0; i < counts; i++) {
            this.#renderFilmCard(films[i])
        }
    }


    #renderFilmList = () => {
        if (this.filteredFilms.length !== 0) {
            this.#startFilmCardsCount = 5
            this.#renderFilmCards(this.#startFilmCardsCount, this.filteredFilms)
            this.#initShowMoreEvents()
        } else {
            this.#filmsWrapperComponent.removeShowMoreElement()
        }
    }

    #initShowMoreEvents = () => {

        if (this.#filmsWrapperComponent.element.querySelector('.films-list__show-more') === null) {
            this.#filmsWrapperComponent.renderShowMoreElement()
        }

        this.#filmsWrapperComponent.setShowMoreClickHandler(() => {
            if (this.filteredFilms.length > this.#FILMS_CARD_COUNT_PER_STEP) {
                this.#startFilmCardsCount = Math.min(this.#startFilmCardsCount + this.#FILMS_CARD_COUNT_PER_STEP, this.filteredFilms.length)

                if (this.#startFilmCardsCount === this.filteredFilms.length) {
                    this.#filmsWrapperComponent.removeShowMoreElement()
                }

                this.#renderFilmCards(this.#startFilmCardsCount, this.filteredFilms)
            }
        })
    }

    #initMenuFiltersEvents = () => {
        this.#menuComponent.setEditClickHandler((activeMenuFilter) => {
            this.#resetSortFilters()
            this.#activeMenuFilter = activeMenuFilter
            this.#renderFilmList()
        })
    }

    #renderSortFilters = () => {
        render(this.#filmsListContainer, this.#sortComponent, RenderPosition.BEFOREEND)
    }

    #initSortFiltersEvents = () => {
        this.#sortComponent.setEditClickHandler((activeSortFilter) => {
            this.#activeSortFilter = activeSortFilter
            this.#clearFilmList()
            this.#renderFilmList()
        })
    }

    #resetSortFilters = () => {
        this.#activeSortFilter = 'default'
        this.#sortComponent.resetSortButtons()
    }
}