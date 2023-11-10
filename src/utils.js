import AbstractView from "./view/abstract-view"

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
    const parent = container instanceof AbstractView ? container.element : container
    const child = element instanceof AbstractView ? element.element : element

    switch (position) {
        case RenderPosition.BEFOREBEGIN:
            parent.before(child)
            break
        case RenderPosition.AFTERBEGIN:
            parent.prepend(child)
            break
        case RenderPosition.BEFOREEND:
            parent.append(child)
            break
        case RenderPosition.AFTEREND:
            parent.after(child)
            break
    }
}

export const createElement = (template) => {
    const newElement = document.createElement('div')
    newElement.innerHTML = template

    return newElement.firstChild
}

export const updateItem = (items, update) => {
    const index = items.findIndex((item) => item.id === update.id)

    if (index === -1) {
        return items
    }

    return [
        ...items.slice(0, index),
        update,
        ...items.slice(index + 1),
    ]
}

export const remove = (component) => {
    if (component === null) {
        return;
    }

    if (!(component instanceof AbstractView)) {
        throw new Error('Can remove only components');
    }

    component.element.remove();
    component.removeElement();
};

export const replace = (newElement, oldElement) => {
    if (newElement === null || oldElement === null) {
        throw new Error('Can\'t replace unexisting elements');
    }

    const newChild = newElement instanceof AbstractView ? newElement.element : newElement;
    const oldChild = oldElement instanceof AbstractView ? oldElement.element : oldElement;

    const parent = oldChild.parentElement;

    if (parent === null) {
        throw new Error('Parent element doesn\'t exist');
    }

    parent.replaceChild(newChild, oldChild);
};