import { RenderPosition, renderTemplate } from "./render.js"
import { createFilmCardTemplate } from "./view/site-film-card.js"
import { createFilmPopapTemplate } from "./view/site-film-popap.js"
import { createFilmsListTemplate } from "./view/site-films-list-view.js"
import { createFiltersTemplate } from "./view/site-filters-view.js"
import { createMenuTemplate } from "./view/site-menu-view.js"
import { createUserStatisticTemplate } from "./view/site-stats.js"
import { createUserRankTemplate } from "./view/site-user-rank-view.js"

const bodyElement = document.querySelector('#body')
const headerElement = bodyElement.querySelector('#header')
const mainElement = bodyElement.querySelector('#main')

renderTemplate(headerElement, createUserRankTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createMenuTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFiltersTemplate(), RenderPosition.BEFOREEND)
renderTemplate(mainElement, createFilmsListTemplate(), RenderPosition.BEFOREEND)

const filmsListElement = mainElement.querySelector('.films-list__container')

const renderFilmCards = (counts) => {
    for (let i = 1; i <= counts; i ++) {
        renderTemplate(filmsListElement, createFilmCardTemplate(), RenderPosition.BEFOREEND)
    }
}

renderFilmCards(5)

renderTemplate(mainElement, createUserStatisticTemplate(), RenderPosition.BEFOREEND)

// Попап пока не нужен
// renderTemplate(bodyElement, createFilmPopapTemplate(), RenderPosition.BEFOREEND)
