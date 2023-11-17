import SiteFooterView from './view/site-footer-view.js'
import SiteHeaderView from './view/site-header-view.js'
import SiteMainView from './view/site-main-view.js'
import FilmsListPresenter from './presenter/films-list-presenter.js'
import { render } from './utils/utils.js'
import { RenderPosition } from './utils/consts.js'
import FilmsModel from './model/films-model.js'
import ApiService from './api-service.js'

const bootstrap = async () => {

    const AUTHORIZATION = 'Basic hdwpqmhpasjcgcfvdla'
    const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict'
    
    const filmsModel = new FilmsModel(new ApiService(END_POINT, AUTHORIZATION))
    await filmsModel.init()
    
    // РЕНДЕР ГЛАВНЫХ ВНЕШНИХ КОМПОНЕНТОВ
    
    const headerComponent = new SiteHeaderView(filmsModel.films)
    const mainComponent = new SiteMainView()
    const footerComponent = new SiteFooterView(filmsModel.films.length)
    
    render(document.body, headerComponent, RenderPosition.BEFOREEND)
    render(document.body, mainComponent, RenderPosition.BEFOREEND)
    render(document.body, footerComponent, RenderPosition.BEFOREEND)
    
    // ИНИЦИАЛИЗИРУЕМ ПРЕЗЕРТЕР
    
    const filmsListPresenter = new FilmsListPresenter(mainComponent.element, filmsModel)
    filmsListPresenter.init()
}    

bootstrap()