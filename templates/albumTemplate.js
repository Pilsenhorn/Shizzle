export function albumTemplate(album) {
    return `
    <div class="album">
        <img src="${album.cover}" alt="${album.title} cover" loading="lazy" class="album-cover">
        <h3 class="album-title">${album.title}</h3>
        <p class="album-year">${album.year}</p>
        ${
        album.youtube
        ? `<a href="${album.youtube}" target="_blank" rel="noopener" class="album-link">YouTube</a>`
        : ""
        }
    </div>
    `   
}