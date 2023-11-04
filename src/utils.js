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

export const render = (container, element, position) => {
    switch (position) {
        case RenderPosition.BEFOREBEGIN:
            container.before(element)
            break
        case RenderPosition.AFTERBEGIN:
            container.prepend(element)
            break
        case RenderPosition.BEFOREEND:
            container.append(element)
            break
        case RenderPosition.AFTEREND:
            container.after(element)
            break
    }
}

export const createElement = (template) => {
    const newElement = document.createElement('div')
    newElement.innerHTML = template

    return newElement.firstChild
}