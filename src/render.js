export const RenderPosition = {
    AFTEREND: 'afterend',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    BEFOREBEGIN: 'beforebegin'
}

export const renderTemplate = (root, template, position) => {
    root.insertAdjacentHTML(position, template)
}

