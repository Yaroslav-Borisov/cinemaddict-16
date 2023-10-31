export const createFilmsListTemplate = () => {
    return `<section class="films">
                <section class="films-list">
                    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                    <div class="films-list__container"></div>
                </section>
            </section>`
}

export const createShowMoreTemplate = () => {
    return `<button class="films-list__show-more">Show more</button>`
}

export const createFilmTotalCountTemplate = () => {
    return `<p>130 291 movies inside</p>`
}