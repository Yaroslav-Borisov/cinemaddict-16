import { createElement } from '../utils.js'

const createHeaderTemplate = () => {
    return `<header class="header" id="header">
                <h1 class="header__logo logo">Cinemaddict</h1>
            </header>`
}

export default class SiteHeaderView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createHeaderTemplate()
    }

    removeElement() {
        this.#element = null
    }
}