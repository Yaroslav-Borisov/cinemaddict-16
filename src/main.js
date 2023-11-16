import { generateFilm } from './mock/film.js'
import SiteFooterView from './view/site-footer-view.js'
import SiteHeaderView from './view/site-header-view.js'
import SiteMainView from './view/site-main-view.js'
import FilmsListPresenter from './presenter/films-list-presenter.js'
import { render } from './utils/utils.js'
import { RenderPosition } from './utils/consts.js'
import FilmsModel from './model/films-model.js'
import SiteStatsView from './view/site-stats-view.js'

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)

const filmsModel = new FilmsModel()
filmsModel.films = films

// РЕНДЕР ГЛАВНЫХ ВНЕШНИХ КОМПОНЕНТОВ

const headerComponent = new SiteHeaderView(films)
const mainComponent = new SiteMainView()
const footerComponent = new SiteFooterView(films.length)

render(document.body, headerComponent, RenderPosition.BEFOREEND)
render(document.body, mainComponent, RenderPosition.BEFOREEND)
render(document.body, footerComponent, RenderPosition.BEFOREEND)

// ИНИЦИАЛИЗИРУЕМ ПРЕЗЕРТЕР

const filmsListPresenter = new FilmsListPresenter(mainComponent.element, filmsModel)
filmsListPresenter.init()

// export const statsComponent = new SiteStatsView()

// const stats = document.querySelector('.main-navigation__additional')
// stats.addEventListener('click', () => {
//     render(mainComponent, statsComponent, RenderPosition.BEFOREEND)
// })



