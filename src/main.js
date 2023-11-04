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

render(bodyElement, headerElement.element, RenderPosition.BEFOREEND)
render(bodyElement, mainElement.element, RenderPosition.BEFOREEND)

render(headerElement.element, new SiteUserRankView().element, RenderPosition.BEFOREEND)

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)

render(mainElement.element, new SiteMenuView(films).element, RenderPosition.BEFOREEND)
render(mainElement.element, new SiteFiltersView().element, RenderPosition.BEFOREEND)
render(mainElement.element, new SiteFilmsListView().element, RenderPosition.BEFOREEND)

const filmsListElement = document.querySelector('.films-list')
const filmsContainerElement = filmsListElement.querySelector('.films-list__container')

render(bodyElement, new SiteFooterView(films.length).element, RenderPosition.BEFOREEND)


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

            render(bodyElement, new SiteFilmPopupView(films[i]).element, RenderPosition.BEFOREEND)

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

    render(filmsListElement, new SiteShowMoreView().element, RenderPosition.BEFOREEND)

    showMoreButton = filmsListElement.querySelector('.films-list__show-more')
    const FILMS_CARD_COUNT_PER_STEP = 5

    if (films.length > FILMS_CARD_COUNT_PER_STEP) {

        showMoreButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            startFilmsCardCount += FILMS_CARD_COUNT_PER_STEP

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

let startFilmsCardCount = 5
renderFilmCards(startFilmsCardCount, films)
initShowMoreEvents(films)

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

