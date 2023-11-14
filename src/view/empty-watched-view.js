import AbstractView from './abstract-view.js'

const createEmptyWatchedTemplate = () => {
    return `<section class="films">
                <section class="films-list">
                    <h2 class="films-list__title">There are no watched movies now</h2>
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export default class EmptyWatchedView extends AbstractView {
    constructor() {
        super()
    }

    get template() {
        return createEmptyWatchedTemplate()
    }
}