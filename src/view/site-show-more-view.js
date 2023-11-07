import AbstractView from './abstract-view.js'

const createShowMoreTemplate = () => {
    return `<button class="films-list__show-more">Show more</button>`
}

export default class SiteShowMoreView extends AbstractView {
    _callback = {}

    get template() {
        return createShowMoreTemplate()
    }

    isRendered = false

    setClickHandler = (callback) => {
      this._callback.click = callback
      this.element.addEventListener('click', this.#clickHandler)
    }

    #clickHandler = (evt) => {
        evt.preventDefault()
        this._callback.click()
    }
}
