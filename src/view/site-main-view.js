import AbstractView from './abstract-view.js'


const createMainTemplate = () => {
    return `<main class="main" id="main">
            </main>`
}

export default class SiteMainView extends AbstractView {
    get template() {
        return createMainTemplate()
    }
}