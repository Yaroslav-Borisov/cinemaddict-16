import { formatCommentDate } from '../utils.js'
import AbstractView from './abstract-view.js'

const createFilmPopupTemplate = (filmCard) => {
  const { title, rating, ageRating, originalTitle, director, screenwriters, cast, releaseYear, duration, country, genres, image, description, commentsNumber, isWatchlist, isWatched, isFavorite, comments } = filmCard

  const renderFilmGenres = (genres) => {
    const genresHtml = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`)
    return genresHtml.join('\n')
  }

  const renderFilmPopupComments = (comments = []) => comments
    .slice()
    .map((commentItem) => {
      const { emotion, comment, author, date } = commentItem;
      const humanizedCommentDate = formatCommentDate(date);

      return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizedCommentDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    }).join('\n');

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${image}" alt="${title}">


            <p class="film-details__age">${ageRating}</p>
          </div>


          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${originalTitle}</p>
              </div>


              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>


            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${cast}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseYear}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${renderFilmGenres(genres)}
                </td>
              </tr>
            </table>


            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>


        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${isWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${isWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>


      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>


          <ul class="film-details__comments-list">
            ${renderFilmPopupComments(comments)}
          </ul>


          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
            </div>


            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
            </label>


            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>


              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>


              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>


              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
}

export default class SiteFilmPopupView extends AbstractView {
  #film = null
  _callback = {}

  constructor(film) {
    super()
    this.#film = film
  }

  get template() {
    return createFilmPopupTemplate(this.#film)
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler)
  }

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler)
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler)
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler)
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault()
    this._callback.closeClick()
  }

  #watchListClickHandler = (evt) => {
    evt.preventDefault()
    this._callback.watchListClick()
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault()
    this._callback.watchedClick()
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault()
    this._callback.favoriteClick()
  }
}
