export function renderList({ data, template, containerId }) {

    const container = document.getElementById(containerId)
    if (!container) return

    container.innerHTML = data.map(template).join("")
}