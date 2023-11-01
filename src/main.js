import { generateFilm } from './mock/film.js'
import { RenderPosition, closePopup, escClosePopup, renderTemplate } from './utils.js'
import { createFilmCardTemplate } from './view/site-film-card-view.js'
import { createFilmPopapTemplate } from './view/site-film-popup-view.js'
import { createFilmTotalCountTemplate, createFilmsListTemplate, createShowMoreTemplate } from './view/site-films-list-view.js'
import { createFiltersTemplate } from './view/site-filters-view.js'
import { createMenuTemplate } from './view/site-menu-view.js'
import { createUserRankTemplate } from './view/site-user-rank-view.js'

const bodyElement = document.querySelector('#body')
const headerElement = bodyElement.querySelector('#header')
const mainElement = bodyElement.querySelector('#main')
const footerStatisticsElement = bodyElement.querySelector('#footer-statistics')

renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND)

const FILMS_COUNT = 22
const films = Array.from({ length: FILMS_COUNT }, generateFilm)
console.log(films)

renderTemplate(mainElement, createMenuTemplate(films), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFiltersTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND)

const filmsListElement = mainElement.querySelector('.films-list')
const filmsContainerElement = filmsListElement.querySelector('.films-list__container')

renderTemplate(footerStatisticsElement, createFilmTotalCountTemplate(films), RenderPosition.BEFOREEND)

// Код ниже пока в главном файле, так как нам ещё не объясняли, куда это переносить

// Описываем рендер карточек и добавляем обработчик открытия/закрытия попапа на каждую

const initFilmCardEvents = () => {
    const filmCardElments = filmsContainerElement.querySelectorAll('.film-card__link')

    filmCardElments.forEach((filmCardElement, i) => {
        filmCardElement.addEventListener('click', () => {
            let filmPopupElement = bodyElement.querySelector('.film-details')

            if (filmPopupElement !== null) {
                closePopup(filmPopupElement)
            }

            renderTemplate(bodyElement, createFilmPopapTemplate(films[i]), RenderPosition.BEFOREEND)

            filmPopupElement = bodyElement.querySelector('.film-details')
            const filmPopupCloseButton = bodyElement.querySelector('.film-details__close-btn')

            filmPopupCloseButton.addEventListener('click', () => {
                closePopup(filmPopupElement)
            })
            escClosePopup(filmPopupElement)
        })
    })
}

// Описываем работу кнопки Show More

const initShowMoreEvents = (films) => {

    let showMoreButton = filmsListElement.querySelector('.films-list__show-more')

    if (showMoreButton !== null) {
        showMoreButton.remove()
        renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND)
    } else {

        renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND)
    }

    showMoreButton = filmsListElement.querySelector('.films-list__show-more')
    const FILMS_CARD_COUNT_PER_STEP = 5

    if (films.length > FILMS_CARD_COUNT_PER_STEP) {

        showMoreButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            FILMS_CARD_COUNT += FILMS_CARD_COUNT_PER_STEP

            if (FILMS_CARD_COUNT >= films.length) {
                renderFilmCards(films.length, films)
                showMoreButton.remove()
            } else {
                renderFilmCards(FILMS_CARD_COUNT, films)
            }
        })
    }
}

// Отрисовываем карточки

const renderFilmCards = (counts, films) => {
    filmsContainerElement.innerHTML = ''

    for (let i = 0; i < counts; i++) {
        renderTemplate(filmsContainerElement, createFilmCardTemplate(films[i]), RenderPosition.BEFOREEND)
    }

    initFilmCardEvents()
}

let FILMS_CARD_COUNT = 5
renderFilmCards(FILMS_CARD_COUNT, films)
initShowMoreEvents(films)

// Описываем работу верхних фильтров

const filters = mainElement.querySelectorAll('.main-navigation__item')


filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        FILMS_CARD_COUNT = 5
        const filterName = filter.getAttribute('data-name')

        const filterFilms = (filterName) => {
            let filteredFilms = films.filter((film) => {
                if (film[filterName]) return film
            })
            return filteredFilms
        }

        switch (filterName) {
            case 'isWatchlist':
                renderFilmCards(FILMS_CARD_COUNT, filterFilms('isWatchlist'))
                initShowMoreEvents(filterFilms('isWatchlist'))
                break
            case 'isWatched':
                renderFilmCards(FILMS_CARD_COUNT, filterFilms('isWatched'))
                initShowMoreEvents(filterFilms('isWatched'))
                break
            case 'isFavorite':
                renderFilmCards(FILMS_CARD_COUNT, filterFilms('isFavorite'))
                initShowMoreEvents(filterFilms('isFavorite'))
                break
            case 'all-films':
                renderFilmCards(FILMS_CARD_COUNT, films)
                initShowMoreEvents(films)
        }
    })
})

