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

const siteMenu = new SiteMenuView(films)

render(mainElement, siteMenu, RenderPosition.BEFOREEND)
render(mainElement, new SiteSortFiltersView(), RenderPosition.BEFOREEND)

const filmsElement = new SiteFilmsListView(films.length)
render(mainElement, filmsElement, RenderPosition.BEFOREEND)

const filmsListElement = filmsElement.element.querySelector('.films-list')
const filmsContainerElement = filmsElement.element.querySelector('.films-list__container')

render(bodyElement, new SiteFooterView(films.length), RenderPosition.BEFOREEND)

// Описываем работу кнопки Show More
let showMoreButton = new SiteShowMoreView()

const initShowMoreEvents = (films) => {

    if (showMoreButton.element === true) {
        showMoreButton.removeElement()
        showMoreButton = new SiteShowMoreView()
    }

    render(filmsListElement, showMoreButton, RenderPosition.BEFOREEND)

    const FILMS_CARD_COUNT_PER_STEP = 5

    if (films.length > FILMS_CARD_COUNT_PER_STEP) {
        showMoreButton.setClickHandler(() => {
            startFilmsCardCount = Math.min(startFilmsCardCount + FILMS_CARD_COUNT_PER_STEP, films.length)

            if (startFilmsCardCount >= films.length) {
                showMoreButton.removeElement()
            }

            renderFilmCards(startFilmsCardCount, films)

        })
    }
}

// Отрисовываем карточки

const renderFilmCards = (counts, films) => {
    filmsContainerElement.innerHTML = ''

    for (let i = 0; i < counts; i++) {
        const filmCard = new SiteFilmCardView(films[i])
        filmCard.setEditClickHandler(() => {

          const closePopup = (popup) => {
              popup.removeElement()
              bodyElement.classList.remove('hide-overflow')
          }

          let filmPopup = new SiteFilmPopupView(films[i])

          if (filmPopup !== null && bodyElement.lastChild.classList.contains('film-details')) {
              bodyElement.querySelector('.film-details').remove()
          }

          render(bodyElement, filmPopup, RenderPosition.BEFOREEND)
          bodyElement.classList.add('hide-overflow')

          filmPopup.setCloseClickHandler(() => {
            closePopup(filmPopup)
          })

          document.addEventListener('keydown', (evt) => {
              if (evt.key === 'Esc' || evt.key === 'Escape') {
                  closePopup(filmPopup)
              }
          })
      })

        render(filmsContainerElement, filmCard, RenderPosition.BEFOREEND)
    }
}

if (ALL_FILMS_COUNT !== 0) {
    renderFilmCards(startFilmsCardCount, films)
    initShowMoreEvents(films)
}


// Описываем работу верхних фильтров

siteMenu.setEditClickHandler((activeFilter) => {
    const filterFilms = (activeFilter) => {
        let filteredFilms = films.filter((film) => {
            if (film[activeFilter]) return film
        })
        return filteredFilms
    }

    startFilmsCardCount = 5

    if (activeFilter === 'all-films') {
        renderFilmCards(startFilmsCardCount, films)
        initShowMoreEvents(films)
    } else {
        renderFilmCards(startFilmsCardCount, filterFilms(activeFilter))
        initShowMoreEvents(filterFilms(activeFilter))
    }
})
