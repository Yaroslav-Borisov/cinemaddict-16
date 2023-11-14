import dayjs from 'dayjs'
import { getRandomBoolean, getRandomElementArr, getRandomInt, getRandomPastDate } from '../utils.js'
import { nanoid } from 'nanoid'

const FILM_POSTERS = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg'
]

const FILM_TITLES = [
    ['Интерстеллар', 'Interstellar'],
    ['Грань будущего', 'Edge of Tomorrow'],
    ['Великий Гетсби', 'The Great Gatsby'],
    ['Иллюзия обмана', 'Now You See Me'],
    ['Основной инстинкт', 'Basic Instinct'],
    ['Назад в будущее', 'Back to the Future'],
    ['Москва слезам не верит', 'Москва слезам не верит']
]

const FILM_DURATIONS = [
    '1h 36m',
    '1h 59m',
    '2h 30m',
    '1h 25m',
    '1h 05m',
    '2h 17m',
    '1h 30m'
]

const FILM_GENRES = [
    'Фантастика',
    'Комедия',
    'Драма',
    'Детектив',
    'Мелодрама',
    'Документальное',
    'Ужасы',
]

const FILM_CAST_NAMES = [
    'Анжела Медведева',
    'Сергей Петров',
    'Александра Фролова',
    'Ярослав Борисов',
    'Максим Александров',
    'Анна Пожидаева',
    'Киану Ривз',
]

const FILM_COUNTRIES = [
    'Россия',
    'США',
    'Великобритания',
    'Индия',
    'Китай',
]

const EMOTIONS = [
    'smile',
    'sleeping',
    'puke',
    'angry'
]

const COMMENT_TEXTS = [
    'Интересный фильм и актёры',
    'Скучнооооо',
    'Фильм очень старый',
    'Почти 2 часа... это того не стоит',
    'Фильм крутой, рекомендую!'
]

const generateNamesList = (names) => {
    return names.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, getRandomInt(1, getRandomInt(1, names.length))).join(', ')
}

const generateCountriesList = (countries) => {
    return countries.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, getRandomInt(1, getRandomInt(1, countries.length))).join(', ')
}

const generateGenreList = (genres) => {
    return genres.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, getRandomInt(1, getRandomInt(1, genres.length)))
}

const generateDescription = () => {
    const FILM_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'

    return FILM_DESCRIPTION.split('.').sort(() => (Math.random() > .5) ? 1 : -1).slice(0, getRandomInt(1, 4)).join('. ')
}

const generateDate = () => {
    const maxYearGap = getRandomInt(-100, 1)
    return dayjs().add(maxYearGap, 'year').toDate().getFullYear()
}

const generateComment = () => {
    const emotion = getRandomElementArr(EMOTIONS)
    const comment = getRandomElementArr(COMMENT_TEXTS)
    const author = getRandomElementArr(FILM_CAST_NAMES)
    const date = getRandomPastDate(0, 10)

    return {
        id: nanoid(),
        emotion,
        comment,
        author,
        date
    }
}

export const generateFilm = () => {

    const filmTitleElement = getRandomElementArr(FILM_TITLES)
    const [filmTitle, filmOriginalTitle] = filmTitleElement
    const commentsNumber = getRandomInt(0, 5)
    const comments = Array.from({ length: commentsNumber }, generateComment)

    return {
        id: nanoid(),
        isWatchlist: getRandomBoolean(),
        isWatched: getRandomBoolean(),
        isFavorite: getRandomBoolean(),
        image: getRandomElementArr(FILM_POSTERS),
        title: filmTitle,
        originalTitle: filmOriginalTitle,
        rating: `${getRandomInt(0, 9)}.${getRandomInt(0, 9)}`,
        director: getRandomElementArr(FILM_CAST_NAMES),
        screenwriters: generateNamesList(FILM_CAST_NAMES),
        cast: generateNamesList(FILM_CAST_NAMES),
        releaseYear: generateDate(),
        duration: getRandomElementArr(FILM_DURATIONS),
        genres: generateGenreList(FILM_GENRES),
        description: generateDescription(),
        country: generateCountriesList(FILM_COUNTRIES),
        ageRating: `${getRandomInt(6, 21)}+`,
        commentsNumber: commentsNumber,
        comments: comments,
    }
}
