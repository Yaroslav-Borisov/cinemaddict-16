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

export const renderTemplate = (root, template, position) => {
    root.insertAdjacentHTML(position, template)
}