import { createElement } from '../utils.js'

const createFooterTemplate = (filmsCount) => {
    return `<footer class="footer">
                <section class="footer__logo logo logo--smaller">Cinemaddict</section>
                <section class="footer__statistics" id="footer-statistics">
                    <p>${filmsCount} movies inside</p>
                </section>
            </footer>`
}

export default class SiteFooterView {
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
        return createFooterTemplate(this.#filmsCount)
    }
  
    removeElement() {
        this.#element = null
    }
  }
