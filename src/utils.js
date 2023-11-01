const Keys = {
    ESC: 'Esc',
    ESCAPE: 'Escape',
}

export const getRandomInt = (start, end) => {
    if (start > end) {
        [start, end] = [end, start]
    }

    return ((Math.random() * (end - start)) + start).toFixed(0)
}

export const getRandomBoolean = () => {
    return Math.random() < 0.5
}

export const getRandomElementArr = (arr) => {
    return arr[getRandomInt(0, arr.length - 1)]
}

export const RenderPosition = {
    AFTEREND: 'afterend',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    BEFOREBEGIN: 'beforebegin'
}

export const closePopup = (Popup) => {
    Popup.remove()
}

export const escClosePopup = (Popup) => {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === Keys.ESC || evt.key === Keys.ESCAPE) {
            closePopup(Popup)
        }
    })
}

export const renderTemplate = (root, template, position) => {
    root.insertAdjacentHTML(position, template)
}