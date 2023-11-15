import AbstractView from './abstract-view.js'

const createEmptyFavoriteTemplate = () => {
    return `<section class="films">
                <section class="films-list">
                    <h2 class="films-list__title">There are no favorite movies now</h2>
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export default class EmptyFavoriteView extends AbstractView {
    constructor() {
        super()
    }

    get template() {
        return createEmptyFavoriteTemplate()
    }
}