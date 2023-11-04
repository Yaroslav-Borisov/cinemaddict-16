import { generateFilm } from './mock/film.js'
import { RenderPosition, closePopup, escClosePopup, renderTemplate } from './utils.js'
import { createFilmCardTemplate } from './view/site-film-card-view.js'
import { createFilmPopupTemplate } from './view/site-film-popup-view.js'
import { createFilmsListTemplate } from './view/site-films-list-view.js'
import { createFiltersTemplate } from './view/site-filters-view.js'
import { createFooterTemplate } from './view/site-footer-view.js'
import { createHeaderTemplate } from './view/site-header-view.js'
import { createMainTemplate } from './view/site-main-view.js'
import { createMenuTemplate } from './view/site-menu-view.js'
import { createShowMoreTemplate } from './view/site-show-more-view.js'
import { createUserRankTemplate } from './view/site-user-rank-view.js'

const bodyElement = document.body
renderTemplate(bodyElement, createHeaderTemplate(), RenderPosition.BEFOREEND)
renderTemplate(bodyElement, createMainTemplate(), RenderPosition.BEFOREEND)

const headerElement = bodyElement.querySelector('#header')
renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND)

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)

const mainElement = bodyElement.querySelector('#main')
renderTemplate(mainElement, createMenuTemplate(films), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFiltersTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND)

const filmsListElement = mainElement.querySelector('.films-list')
const filmsContainerElement = filmsListElement.querySelector('.films-list__container')

renderTemplate(bodyElement, createFooterTemplate(films.length), RenderPosition.BEFOREEND)


// Код ниже пока в главном файле, так как нам ещё не объясняли, куда это переносить
// Описываем рендер карточек и добавляем обработчик открытия/закрытия попапа на каждую

const initFilmCardEvents = () => {
    const filmCardElments = filmsContainerElement.querySelectorAll('.film-card__link')

    filmCardElments.forEach((filmCardElement, i) => {
        filmCardElement.addEventListener('click', () => {
            const closePopup = (Popup) => {
                Popup.remove()
            }

            const escClosePopup = (Popup) => {
                document.addEventListener('keydown', (evt) => {
                    if (evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
                        closePopup(Popup)
                    }
                })
            }

            let filmPopupElement = bodyElement.querySelector('.film-details')

            if (filmPopupElement !== null) {
                closePopup(filmPopupElement)
            }

            renderTemplate(bodyElement, createFilmPopupTemplate(films[i]), RenderPosition.BEFOREEND)

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
    }

    renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND)

    showMoreButton = filmsListElement.querySelector('.films-list__show-more')
    const FILMS_CARD_COUNT_PER_STEP = 5

    if (films.length > FILMS_CARD_COUNT_PER_STEP) {

        showMoreButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            START_FILMS_CARD_COUNT += FILMS_CARD_COUNT_PER_STEP

            if (START_FILMS_CARD_COUNT >= films.length) {
                showMoreButton.remove()
            }

            renderFilmCards(START_FILMS_CARD_COUNT, films)

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

let START_FILMS_CARD_COUNT = 5
renderFilmCards(START_FILMS_CARD_COUNT, films)
initShowMoreEvents(films)

// Описываем работу верхних фильтров

const filters = mainElement.querySelectorAll('.main-navigation__item')


filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        START_FILMS_CARD_COUNT = 5
        const filterName = filter.getAttribute('data-name')

        const filterFilms = (filterName) => {
            let filteredFilms = films.filter((film) => {
                if (film[filterName]) return film
            })
            return filteredFilms
        }

        if (filterName === 'all-films') {
            START_FILMS_CARD_COUNT = 5
            renderFilmCards(START_FILMS_CARD_COUNT, films)
            initShowMoreEvents(films)
        } else {
            renderFilmCards(START_FILMS_CARD_COUNT, filterFilms(filterName))
            initShowMoreEvents(filterFilms(filterName))
        }
    })
})

