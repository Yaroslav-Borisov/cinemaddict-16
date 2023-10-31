import { RenderPosition, renderTemplate } from './render.js'
import { createFilmCardTemplate } from './view/site-film-card-view.js'
import { createFilmTotalCountTemplate, createFilmsListTemplate, createShowMoreTemplate } from './view/site-films-list-view.js'
import { createFiltersTemplate } from './view/site-filters-view.js'
import { createMenuTemplate } from './view/site-menu-view.js'
import { createUserRankTemplate } from './view/site-user-rank-view.js'

const bodyElement = document.querySelector('#body')
const headerElement = bodyElement.querySelector('#header')
const mainElement = bodyElement.querySelector('#main')
const footerStatisticsElement = bodyElement.querySelector('#footer-statistics')

renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createMenuTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFiltersTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND)

const filmsListElement = mainElement.querySelector('.films-list')
const filmsContainerElement = filmsListElement.querySelector('.films-list__container')

const renderFilmCards = (counts) => {
    for (let i = 1; i <= counts; i ++) {
        renderTemplate(filmsContainerElement, createFilmCardTemplate(), RenderPosition.BEFOREEND)
    }
}

const FILMS_CARD_COUNT = 5
renderFilmCards(FILMS_CARD_COUNT)

renderTemplate(filmsListElement, createShowMoreTemplate(), RenderPosition.BEFOREEND)
renderTemplate(footerStatisticsElement, createFilmTotalCountTemplate(), RenderPosition.BEFOREEND)


