// fied iscroll laggy on mobile devices
function isPassive() {
    let supportsPassiveOption = false
    try {
        addEventListener('test', null, Object.defineProperty({}, 'passive', {
            get() {
                supportsPassiveOption = true
            },
        }))
    } catch (e) { }
    return supportsPassiveOption
}

document.addEventListener('touchmove', (e) => { e.preventDefault() }, isPassive() ? {
    capture: false,
    passive: false,
} : false)
