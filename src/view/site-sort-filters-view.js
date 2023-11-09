import AbstractView from './abstract-view.js'

const createSortFiltersTemplate = () => {
    return `<ul class="sort">
                <li><a href="#" class="sort__button sort__button--active" data-name="default">Sort by default</a></li>
                <li><a href="#" class="sort__button" data-name="by-date">Sort by date</a></li>
                <li><a href="#" class="sort__button" data-name="by-rating">Sort by rating</a></li>
            </ul>`
}

export default class SiteSortFiltersView extends AbstractView {
    _callback = {}

    get template() {
        return createSortFiltersTemplate()
    }

    setEditClickHandler = (callback) => {
        this._callback.editClick = callback
        this.element.addEventListener('click', this.#editClickHandler)
    }

    #editClickHandler = (evt) => {
        evt.preventDefault()

        const sortFilters = this.element.querySelectorAll('.sort__button')
        sortFilters.forEach((filter) => {
            filter.classList.remove('sort__button--active')
        })

        evt.target.classList.add('sort__button--active')

        const activeSortFilter = evt.target.getAttribute('data-name')
        if (activeSortFilter) {
            this._callback.editClick?.(activeSortFilter)
        }
    }

    resetSortButtons = () => {
        const sortFilters = this.element.querySelectorAll('.sort__button')
        sortFilters.forEach((filter) => {
            filter.classList.remove('sort__button--active')
        })
        
        this.element.querySelector('[data-name = default]').classList.add('sort__button--active')
    }
}