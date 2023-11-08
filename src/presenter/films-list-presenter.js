import { RenderPosition, render } from "../utils.js";
import SiteFilmCardView from "../view/site-film-card-view";
import SiteFilmPopupView from "../view/site-film-popup-view.js";
import SiteFilmsListView from "../view/site-films-list-view.js";
import SiteMainView from "../view/site-main-view.js";
import SiteShowMoreView from "../view/site-show-more-view.js";

const bodyElement = document.body
let startFilmsCardCount = 5

export default class FilmsListPresenter {
    #filmsListContainer = null

    #showMoreComponent = new SiteShowMoreView()

    #films = []

    bodyElement = document.body
    
    
    constructor(filmsListContainer) {
        this.#filmsListContainer = filmsListContainer
    }
    
    init = (films) => {
        // const filmsElement = new SiteFilmsListView(this.#films.length)

        this.#films = [...films]
        const filmsElement = this.#renderFilmListContainer()
        const filmsContainerElement = filmsElement.element.querySelector('.films-list__container')
        const filmsListElement = filmsElement.element.querySelector('.films-list')
        this.#renderFilmCards(filmsContainerElement, startFilmsCardCount, this.#films)
        this.#renderShowMoreButton(filmsContainerElement, filmsListElement)
    }

    #renderFilteredFilms = () => {
        // рендеринг отфильтрованных фильмов
    }

    #renderFilmListContainer = () => {
        // рендеринг контейнера для фильмов
        const filmsElement = new SiteFilmsListView(this.#films.length)
        render(this.#filmsListContainer, filmsElement, RenderPosition.BEFOREEND)

        return filmsElement
    }

    #renderFilmCard = (filmsContainerElement, film) => {
        // рендеринг одной карточки
        const filmCard = new SiteFilmCardView(film)
        filmCard.setEditClickHandler(() => {

            const closePopup = (popup) => {
                popup.removeElement()
                bodyElement.classList.remove('hide-overflow')
            }

            let filmPopup = new SiteFilmPopupView(film)

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

    #renderFilmCards = (filmsContainerElement, counts, films) => {
        // рендеринг нескольких карточек
        // filmsContainerElement.innerHTML = ''
        // console.log(filmsContainerElement)
        // console.log(filmsContainerElement.innerHTML)

        for (let i = 0; i < counts; i++) {
            this.#renderFilmCard(filmsContainerElement, films[i])
        }
    }

    #renderShowMoreButton = (filmsContainerElement, filmsListElement) => {
        // отрисовка кнопки Показать Больше
        let showMoreButton = this.#showMoreComponent
        render(filmsListElement, showMoreButton, RenderPosition.BEFOREEND)
        this.#initShowMoreEvents(filmsContainerElement, filmsListElement, showMoreButton)
    }

    #initShowMoreEvents = (filmsContainerElement, filmsListElement, showMoreButton) => {
        if (showMoreButton.element === true) {
            showMoreButton.removeElement()
            showMoreButton = new SiteShowMoreView()
        }


        // this.#renderShowMoreButton(filmsListElement)

        const FILMS_CARD_COUNT_PER_STEP = 5

        if (this.#films.length > FILMS_CARD_COUNT_PER_STEP) {
            showMoreButton.setClickHandler(() => {
                // this.filmsListElement.innerHTML = ''
                startFilmsCardCount = Math.min(startFilmsCardCount + FILMS_CARD_COUNT_PER_STEP, this.#films.length)
                
                if (startFilmsCardCount >= this.#films.length) {
                    showMoreButton.removeElement()
                }

                this.#renderFilmCards(filmsContainerElement, startFilmsCardCount, this.#films)
            })
        }
    }

    #renderFilmList = () => {
        // рендеринг списка, начало работы
    }
}