import AbstractView from './abstract-view.js'

const createFilmsListTemplate = (filmsCount) => {
    return `<section class="films">
                <section class="films-list">
                    ${filmsCount === 0 ? '<h2 class="films-list__title">There are no movies in our database</h2>' : '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'}
                    <div class="films-list__container"></div>
                    <button class="films-list__show-more">Show more</button>
                </section>
            </section>`
}

export default class SiteFilmsListView extends AbstractView {
    #filmsCount = null
    _callback = {}

    constructor(filmsCount) {
        super()
        this.#filmsCount = filmsCount
    }

    get template() {
        return createFilmsListTemplate(this.#filmsCount)
    }

    get showMoreButtonElement() {
        return this.element.querySelector('.films-list__show-more')
    }

    setShowMoreClickHandler = (callback) => {
        this._callback.showMoreClick = callback
        this.showMoreButtonElement.addEventListener('click', this.#showMoreClickHandler)
    }

    #showMoreClickHandler = (evt) => {
        evt.preventDefault()
        this._callback.showMoreClick()
    }

    removeShowMoreElement = () => {
        this.showMoreButtonElement.remove()
    }

    renderShowMoreElement = () => {
        const filmsList = this.element.querySelector('.films-list')
        filmsList.insertAdjacentHTML('beforeend', `<button class="films-list__show-more">Show more</button>`)
    }

    getfilmsListContainerElement = () => {
        return this.element.querySelector('.films-list__container')
    }
}
