export function range(number) {
    return Array.from({ length: number }, (v, i) => (i + 1))
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
}
