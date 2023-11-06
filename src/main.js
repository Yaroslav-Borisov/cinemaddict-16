import { generateFilm } from './mock/film.js'
import { RenderPosition, render } from './utils.js'
import SiteFilmCardView from './view/site-film-card-view.js'
import SiteFilmPopupView from './view/site-film-popup-view.js'
import SiteFilmsListView from './view/site-films-list-view.js'
import SiteFiltersView from './view/site-filters-view.js'
import SiteFooterView from './view/site-footer-view.js'
import SiteHeaderView from './view/site-header-view.js'
import SiteMainView from './view/site-main-view.js'
import SiteMenuView from './view/site-menu-view.js'
import SiteShowMoreView from './view/site-show-more-view.js'
import SiteUserRankView from './view/site-user-rank-view.js'

const bodyElement = document.body
const headerElement = new SiteHeaderView()
const mainElement = new SiteMainView()

render(bodyElement, headerElement, RenderPosition.BEFOREEND)
render(bodyElement, mainElement, RenderPosition.BEFOREEND)

render(headerElement, new SiteUserRankView(), RenderPosition.BEFOREEND)

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)
let startFilmsCardCount = 5

render(mainElement, new SiteMenuView(films), RenderPosition.BEFOREEND)
render(mainElement, new SiteFiltersView(), RenderPosition.BEFOREEND)
render(mainElement, new SiteFilmsListView(films.length), RenderPosition.BEFOREEND)

const filmsListElement = document.querySelector('.films-list')
const filmsContainerElement = filmsListElement.querySelector('.films-list__container')

render(bodyElement, new SiteFooterView(films.length), RenderPosition.BEFOREEND)

// Код ниже пока в главном файле, так как нам ещё не объясняли, куда это переносить
// Описываем рендер карточек и добавляем обработчик открытия/закрытия попапа на каждую

const initFilmCardEvents = () => {
    const filmCardElments = filmsContainerElement.querySelectorAll('.film-card__link')

    filmCardElments.forEach((filmCardElement, i) => {
        filmCardElement.setEditClickHandler(() => {

            const closePopup = (popup) => {
                popup.removeElement
                bodyElement.classList.remove('hide-overflow')
            }

            let filmPopup = new SiteFilmPopupView(films[i])

            if (filmPopup !== null && bodyElement.lastChild.classList.contains('film-details')) {
                bodyElement.querySelector('.film-details').remove()
            }

            render(bodyElement, filmPopup, RenderPosition.BEFOREEND)
            bodyElement.classList.add('hide-overflow')

            const filmPopupCloseButton = filmPopup.element.querySelector('.film-details__close-btn')

            filmPopupCloseButton.addEventListener('click', () => {
                closePopup(filmPopup)
            })

            document.addEventListener('keydown', (evt) => {
                if (evt.key === 'Esc' || evt.key === 'Escape') {
                    closePopup(filmPopup)
                }
            })
        })
    })
}

// Описываем работу кнопки Show More

const initShowMoreEvents = (films) => {

    let showMoreButton = filmsListElement.querySelector('.films-list__show-more')

    if (showMoreButton !== null) {
        showMoreButton.remove()
    }

    render(filmsListElement, new SiteShowMoreView(), RenderPosition.BEFOREEND)

    showMoreButton = filmsListElement.querySelector('.films-list__show-more')
    const FILMS_CARD_COUNT_PER_STEP = 5

    if (films.length > FILMS_CARD_COUNT_PER_STEP) {

        showMoreButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            startFilmsCardCount = Math.min(startFilmsCardCount + FILMS_CARD_COUNT_PER_STEP, ALL_FILMS_COUNT)

            if (startFilmsCardCount >= films.length) {
                showMoreButton.remove()
            }

            renderFilmCards(startFilmsCardCount, films)

        })
    }
}

// Отрисовываем карточки

const renderFilmCards = (counts, films) => {
    filmsContainerElement.innerHTML = ''

    for (let i = 0; i < counts; i++) {
        render(filmsContainerElement, new SiteFilmCardView(films[i]).element, RenderPosition.BEFOREEND)
    }

    initFilmCardEvents()
}

if (ALL_FILMS_COUNT !== 0) {
    renderFilmCards(startFilmsCardCount, films)
    initShowMoreEvents(films)
}



// Описываем работу верхних фильтров

const filters = document.querySelectorAll('.main-navigation__item')


filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        startFilmsCardCount = 5
        const filterName = filter.getAttribute('data-name')

        const filterFilms = (filterName) => {
            let filteredFilms = films.filter((film) => {
                if (film[filterName]) return film
            })
            return filteredFilms
        }

        if (filterName === 'all-films') {
            startFilmsCardCount = 5
            renderFilmCards(startFilmsCardCount, films)
            initShowMoreEvents(films)
        } else {
            renderFilmCards(startFilmsCardCount, filterFilms(filterName))
            initShowMoreEvents(filterFilms(filterName))
        }
    })
})

