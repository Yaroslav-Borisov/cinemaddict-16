import AbstractView from './abstract-view.js'

const createHeaderTemplate = () => {
    return `<header class="header" id="header">
                <h1 class="header__logo logo">Cinemaddict</h1>
                <section class="header__profile profile">
                    <p class="profile__rating">Movie buff</p>
                    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
                </section>
            </header>`
}

export default class SiteHeaderView extends AbstractView {
    get template() {
        return createHeaderTemplate()
    }
}