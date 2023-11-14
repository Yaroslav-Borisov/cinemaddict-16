import { MenuFilterName, RenderPosition, SortFilterName } from '../consts.js'
import { remove, render, updateItem } from '../utils.js'
import EmptyFavoriteView from '../view/empty-favorite-view.js'
import EmptyWatchedView from '../view/empty-watched-view.js'
import EmptyWatchlistView from '../view/empty-watchlist-view.js'
import SiteFilmsListView from '../view/site-films-list-view.js'
import SiteMenuView from '../view/site-menu-view.js'
import SiteSortFiltersView from '../view/site-sort-filters-view.js'
import FilmPresenter from './film-presenter.js'

export default class FilmsListPresenter {
    #filmsListContainer = null
    #menuComponent = null
    #sortComponent = new SiteSortFiltersView()

    #emptyWatchlistComponent = new EmptyWatchlistView()
    #emptyWatchedComponent = new EmptyWatchedView()
    #emptyFavoriteComponent = new EmptyFavoriteView()

    #filmsWrapperComponent = null
    #startFilmCardsCount = null
    #FILMS_CARD_COUNT_PER_STEP = 5

    #films = []
    #filmPresenter = new Map()

    #activeMenuFilter = MenuFilterName.DEFAULT
    #activeSortFilter = SortFilterName.DEFAULT

    constructor(filmsListContainer) {
        this.#filmsListContainer = filmsListContainer
    }

    get filteredFilms() {
        let filteredFilms = []

        if (this.#activeMenuFilter === MenuFilterName.DEFAULT) {
            filteredFilms = this.#films
        } else {
            filteredFilms = this.#films.filter((film) => {
                if (film[this.#activeMenuFilter]) return film
            })
        }

        switch (this.#activeSortFilter) {
            case SortFilterName.DATE:
                filteredFilms = filteredFilms.slice().sort((a, b) => b.releaseYear - a.releaseYear)
                break
            case SortFilterName.RATING:
                filteredFilms = filteredFilms.slice().sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                break
            case SortFilterName.DEFAULT:
                filteredFilms = filteredFilms
        }
        return filteredFilms
    }

    init = (films) => {
        this.#films = [...films]
        this.#startFilmCardsCount = 5
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
            remove(this.#menuComponent)
        }

        this.#menuComponent = new SiteMenuView(this.#films, this.#activeMenuFilter)
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
        this.#renderMenuFilters()
        this.#initMenuFiltersEvents()
        this.#renderFilmList()
    }

    #handleModeChange = () => {
        this.#filmPresenter.forEach((presenter) => presenter.resetView())
    }

    #clearFilmList = () => {
        this.#filmPresenter.forEach((presenter) => presenter.destroy())
    }

    #renderFilmCards = (counts, films) => {
        const filmsListContainerElement = this.#filmsWrapperComponent.getfilmsListContainerElement()
        filmsListContainerElement.innerHTML = ''
        for (let i = 0; i < counts; i++) {
            this.#renderFilmCard(films[i])
        }
    }

    #renderFilmList = () => {
        if (this.filteredFilms.length !== 0) {
            if (this.filteredFilms.length < 5) {
                this.#startFilmCardsCount = this.filteredFilms.length
                this.#renderFilmCards(this.#startFilmCardsCount, this.filteredFilms)
            } else {
                this.#startFilmCardsCount = 5
                this.#renderFilmCards(this.#startFilmCardsCount, this.filteredFilms)
                this.#initShowMoreEvents()
            }
        } else if (this.filteredFilms.length === 0) {
            this.#clearFilmList()

            switch (this.#activeMenuFilter) {
                case MenuFilterName.WATCHLIST:
                    this.#renderEmptyWatchlist()
                    break
                case MenuFilterName.WATCHED:
                    this.#renderEmptyWatched()
                    break
                case MenuFilterName.FAVORITE:
                    this.#renderEmptyFavorite()
                    break
            }
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
            this.#clearFilmList()
            this.#resetSortFilters()
            this.#activeMenuFilter = activeMenuFilter
            this.#renderFilmList()
        })
    }

    #renderSortFilters = () => {
        render(this.#filmsListContainer, this.#sortComponent, RenderPosition.BEFOREEND)
    }

    #renderEmptyWatchlist = () => {
        if (this.#filmsWrapperComponent.element.querySelector('.films-list__show-more') !== null) {
            this.#filmsWrapperComponent.removeShowMoreElement()
        }

        const filmsListContainerElement = this.#filmsWrapperComponent.getfilmsListContainerElement()
        filmsListContainerElement.innerHTML = ''
        render(filmsListContainerElement, this.#emptyWatchlistComponent, RenderPosition.BEFOREEND)
    }

    #renderEmptyWatched = () => {
        if (this.#filmsWrapperComponent.element.querySelector('.films-list__show-more') !== null) {
            this.#filmsWrapperComponent.removeShowMoreElement()
        }

        const filmsListContainerElement = this.#filmsWrapperComponent.getfilmsListContainerElement()
        filmsListContainerElement.innerHTML = ''
        render(filmsListContainerElement, this.#emptyWatchedComponent, RenderPosition.BEFOREEND)
    }

    #renderEmptyFavorite = () => {
        if (this.#filmsWrapperComponent.element.querySelector('.films-list__show-more') !== null) {
            this.#filmsWrapperComponent.removeShowMoreElement()
        }

        const filmsListContainerElement = this.#filmsWrapperComponent.getfilmsListContainerElement()
        filmsListContainerElement.innerHTML = ''
        render(filmsListContainerElement, this.#emptyFavoriteComponent, RenderPosition.BEFOREEND)
    }

    #initSortFiltersEvents = () => {
        this.#sortComponent.setEditClickHandler((activeSortFilter) => {
            this.#activeSortFilter = activeSortFilter
            this.#renderFilmList()
        })
    }

    #resetSortFilters = () => {
        this.#activeSortFilter = SortFilterName.DEFAULT
        this.#sortComponent.resetSortButtons()
    }
}