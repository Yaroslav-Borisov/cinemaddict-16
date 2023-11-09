import { generateFilm } from './mock/film.js'
import { RenderPosition, render } from './utils.js'
import SiteFilmCardView from './view/site-film-card-view.js'
import SiteFilmPopupView from './view/site-film-popup-view.js'
import SiteFilmsListView from './view/site-films-list-view.js'
import SiteSortFiltersView from './view/site-sort-filters-view.js'
import SiteFooterView from './view/site-footer-view.js'
import SiteHeaderView from './view/site-header-view.js'
import SiteMainView from './view/site-main-view.js'
import SiteMenuView from './view/site-menu-view.js'

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)
const FILMS_CARD_COUNT_PER_STEP = 5
let startFilmCardsCount = 5

// РЕНДЕР ГЛАВНЫХ ВНЕШНИХ КОМПОНЕНТОВ

const headerComponent = new SiteHeaderView()
const mainComponent = new SiteMainView()
const footerComponent = new SiteFooterView(films.length)

render(document.body, headerComponent, RenderPosition.BEFOREEND)
render(document.body, mainComponent, RenderPosition.BEFOREEND)
render(document.body, footerComponent, RenderPosition.BEFOREEND)

// РЕНДЕР ВНУТРЕННИХ КОМПОНЕНТОВ

const menuComponent = new SiteMenuView(films)
const sortComponent = new SiteSortFiltersView()
render(mainComponent, menuComponent, RenderPosition.BEFOREEND)
render(mainComponent, sortComponent, RenderPosition.BEFOREEND)

const filmsWrapperComponent = new SiteFilmsListView(films.length)
render(mainComponent, filmsWrapperComponent, RenderPosition.BEFOREEND)

const filmsListContainerElement = filmsWrapperComponent.element.querySelector('.films-list__container')

// РЕНДЕР ОДНОЙ КАРТОЧКИ

const renderFilmCard = (filmCard) => {
    const filmCardComponent = new SiteFilmCardView(filmCard)
    render(filmsListContainerElement, filmCardComponent, RenderPosition.BEFOREEND)

    filmCardComponent.setEditClickHandler(() => {

        let filmPopupComponent = new SiteFilmPopupView(filmCard)

        if (filmPopupComponent !== null && document.body.lastChild.classList.contains('film-details')) {
            document.body.querySelector('.film-details').remove()
        }

        render(document.body, filmPopupComponent, RenderPosition.BEFOREEND)
        document.body.classList.add('hide-overflow')

        filmPopupComponent.setCloseClickHandler(() => {
            filmPopupComponent.removeElement()
            document.body.classList.remove('hide-overflow')
        })

        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Esc' || evt.key === 'Escape') {
                filmPopupComponent.removeElement()
                document.body.classList.remove('hide-overflow')
            }
        })
    })
}

//  РЕНДЕР НЕСКОЛЬКИХ КАРТОЧЕК

const renderFilmCards = (counts, films) => {
    filmsListContainerElement.innerHTML = ''
    for (let i = 0; i < counts; i++) {
        renderFilmCard(films[i])
    }
}

// ОПИСЫВАЕМ РАБОТУ КНОПКИ ПОКАЗАТЬ БОЛЬШЕ

const initShowMoreEvents = (films) => {

    if (filmsWrapperComponent.element.querySelector('.films-list__show-more') === null) {
        filmsWrapperComponent.renderShowMoreElement()
    }

    filmsWrapperComponent.setShowMoreClickHandler(() => {
        if (films.length > FILMS_CARD_COUNT_PER_STEP) {
            startFilmCardsCount = Math.min(startFilmCardsCount + FILMS_CARD_COUNT_PER_STEP, films.length)
    
            if (startFilmCardsCount === films.length) {
                filmsWrapperComponent.removeShowMoreElement()
            }
    
            renderFilmCards(startFilmCardsCount, films)
        }
    })
}

// УСЛОВИЕ НА НАЛИЧИЕ КАРТОЧЕК

if (ALL_FILMS_COUNT !== 0) {
    renderFilmCards(startFilmCardsCount, films)
    initShowMoreEvents(films)
}

//  ОПИСЫВАЕМ РАБОТУ ФИЛЬТРОВ В МЕНЮ

menuComponent.setEditClickHandler((activeFilter) => {
    const filterFilms = (activeFilter) => {
        let filteredFilms = films.filter((film) => {
            if (film[activeFilter]) return film
        })
        return filteredFilms
    }

    startFilmCardsCount = 5

    if (activeFilter === 'all-films') {
        renderFilmCards(startFilmCardsCount, films)
        initShowMoreEvents(films)
    } else {
        renderFilmCards(startFilmCardsCount, filterFilms(activeFilter))
        initShowMoreEvents(filterFilms(activeFilter))
    }
})
