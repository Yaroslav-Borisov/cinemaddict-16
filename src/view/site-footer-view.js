import AbstractView from './abstract-view.js'

const createFooterTemplate = (filmsCount) => {
    return `<footer class="footer">
                <section class="footer__logo logo logo--smaller">Cinemaddict</section>
                <section class="footer__statistics" id="footer-statistics">
                    <p>${filmsCount} movies inside</p>
                </section>
            </footer>`
}

export default class SiteFooterView extends AbstractView {
    #filmsCount = null
  
    constructor(filmsCount) {
        super()
        this.#filmsCount = filmsCount
    }

    get template() {
        return createFooterTemplate(this.#filmsCount)
    }
  }
