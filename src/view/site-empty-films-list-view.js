import { createElement } from '../utils.js'

const createEmptyFilmsListTemplate = () => {
    return `<section class="films">
                <section class="films-list">
                    <h2 class="films-list__title">There are no movies in our database</h2>
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export default class SiteEmptyFilmsListView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createEmptyFilmsListTemplate()
    }

    removeElement() {
        this.#element = null
    }
}