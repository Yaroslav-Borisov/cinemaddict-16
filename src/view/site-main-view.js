import { createElement } from '../utils.js'

const createMainTemplate = () => {
    return `<main class="main" id="main">
            </main>`
}

export default class SiteMainView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createMainTemplate()
    }

    removeElement() {
        this.#element = null
    }
}