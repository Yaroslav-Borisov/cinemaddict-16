import { createElement } from '../utils.js'

const createFilmsListTemplate = (filmsCount) => {
    return `<section class="films">
                <section class="films-list">
                    ${filmsCount === 0 ? '<h2 class="films-list__title">There are no movies in our database</h2>' : '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'}
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export default class SiteFilmsListView {
    #element = null
    #filmsCount = null

    constructor(filmsCount) {
        this.#filmsCount = filmsCount
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createFilmsListTemplate(this.#filmsCount)
    }

    removeElement() {
        this.#element = null
    }
}
