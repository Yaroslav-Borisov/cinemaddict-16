export const createMenuTemplate = (films) => {

    const getNavFilmsCount = (navProperty) => {
        let navFilmsCount = 0

        films.forEach((film) => {
            if (film[navProperty]) {
                navFilmsCount++
            }
        })

        return navFilmsCount
    } 

    return `<nav class="main-navigation">
                <div class="main-navigation__items">
                <a href="#all" class="main-navigation__item main-navigation__item--active" data-name="all-films">All movies</a>
                <a href="#watchlist" class="main-navigation__item" data-name="isWatchlist">Watchlist <span class="main-navigation__item-count">${getNavFilmsCount('isWatchlist')}</span></a>
                <a href="#history" class="main-navigation__item" data-name="isWatched">History <span class="main-navigation__item-count">${getNavFilmsCount('isWatched')}</span></a>
                <a href="#favorites" class="main-navigation__item" data-name="isFavorite">Favorites <span class="main-navigation__item-count">${getNavFilmsCount('isFavorite')}</span></a>
                </div>
                <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`
}