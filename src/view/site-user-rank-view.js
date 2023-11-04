import { createElement } from '../utils.js'

const createUserRankTemplate = () => (
    `<section class="header__profile profile">
        <p class="profile__rating">Movie buff</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
)

export default class SiteUserRankView {
    #element = null

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template)
        }

        return this.#element
    }

    get template() {
        return createUserRankTemplate()
    }

    removeElement() {
        this.#element = null
    }
}