import { generateFilm } from './mock/film.js'
import { render } from './utils.js'
import SiteFooterView from './view/site-footer-view.js'
import SiteHeaderView from './view/site-header-view.js'
import SiteMainView from './view/site-main-view.js'
import FilmsListPresenter from './presenter/films-list-presenter.js'
import { RenderPosition } from './consts.js'

const ALL_FILMS_COUNT = 22
const films = Array.from({ length: ALL_FILMS_COUNT }, generateFilm)

// РЕНДЕР ГЛАВНЫХ ВНЕШНИХ КОМПОНЕНТОВ

const headerComponent = new SiteHeaderView()
const mainComponent = new SiteMainView()
const footerComponent = new SiteFooterView(films.length)

render(document.body, headerComponent, RenderPosition.BEFOREEND)
render(document.body, mainComponent, RenderPosition.BEFOREEND)
render(document.body, footerComponent, RenderPosition.BEFOREEND)

// ИНИЦИАЛИЗИРУЕМ ПРЕЗЕРТЕР

const filmsListPresenter = new FilmsListPresenter(mainComponent.element)
filmsListPresenter.init(films)



