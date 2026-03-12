export function renderList({
    data,
    template,
    containerId
}) {
    const container = document.getElementById(containerId)
    if (!container) return 
    data.forEach(item => {
        const html = template(item)
        container.insertAdjacentHTML('beforeend', html)
    })
}