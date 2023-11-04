import { createElement } from '../utils.js'

const createShowMoreTemplate = () => {
    return `<button class="films-list__show-more">Show more</button>`
}

export default class SiteShowMoreView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createShowMoreTemplate()
    }

    removeElement() {
        this.#element = null
    }
}