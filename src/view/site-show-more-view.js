import AbstractView from './abstract-view.js'

const createShowMoreTemplate = () => {
    return `<button class="films-list__show-more">Show more</button>`
}

export default class SiteShowMoreView extends AbstractView {
    get template() {
        return createShowMoreTemplate()
    }
}