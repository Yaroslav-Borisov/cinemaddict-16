import { createElement } from '../utils.js'

const createFiltersTemplate = () => {
    return `<ul class="sort">
                <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
                <li><a href="#" class="sort__button">Sort by date</a></li>
                <li><a href="#" class="sort__button">Sort by rating</a></li>
            </ul>`
}

export default class SiteFiltersView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createFiltersTemplate()
    }

    removeElement() {
        this.#element = null
    }
}