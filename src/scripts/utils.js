export function range(number) {
    return Array.from({ length: number }, (v, i) => (i + 1))
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export const generatorUid = () => `${new Date()}${Math.floor(Math.random())}`

// export const uploadObject = (old, new) => ({ ...old, new })

export const contains = (child, parent) => {
    while (child = child.parentNode) {
        if (child === parent) {
            return true
        }
    }
    return false
}
