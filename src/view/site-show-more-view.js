import AbstractView from './abstract-view.js'

const createShowMoreTemplate = () => {
    return `<button class="films-list__show-more">Show more</button>`
}

export default class SiteShowMoreView extends AbstractView {
    _callback = {}

    get template() {
        return createShowMoreTemplate()
    }

    initClickEvent(callback) {
      this._callback.click = callback

      this.element.addEventListener('click', this.#setClickHandler)
    }

    #setClickHandler = (event) => {
      console.log('click po show more button', event)
      this._callback.click()
    }

    removeClickEvent() {
      this._callback.click = null
      this.element.removeEventListener('click', this.#setClickHandler)
    }
}
