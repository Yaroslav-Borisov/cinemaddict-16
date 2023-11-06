import AbstractView from './abstract-view.js'

const createHeaderTemplate = () => {
    return `<header class="header" id="header">
                <h1 class="header__logo logo">Cinemaddict</h1>
            </header>`
}

export default class SiteHeaderView extends AbstractView {
    get template() {
        return createHeaderTemplate()
    }
}