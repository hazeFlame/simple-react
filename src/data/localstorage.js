export const setlocalstorage = (name, value) => {
    return localStorage.setItem(name, value)
}

export const getlocalstorage = (name) => {
    return localStorage.getItem(name)
}

export const dellocalstorage = (name) => {
    return localStorage.removeItem(name)
}

export const clearlocalstorage = () => {
    return localStorage.clear()
}

