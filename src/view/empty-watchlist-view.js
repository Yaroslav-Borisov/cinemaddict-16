import AbstractView from './abstract-view.js'

const createEmptyWatchlistTemplate = () => {
    return `<section class="films">
                <section class="films-list">
                    <h2 class="films-list__title">There are no movies to watch now</h2>
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export default class EmptyWatchlistView extends AbstractView {
    constructor() {
        super()
    }

    get template() {
        return createEmptyWatchlistTemplate()
    }
}