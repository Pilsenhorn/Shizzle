export function albumTemplate(album) {
    return `
    <div class="album">
        <img src="${album.cover}" alt="${album.title} cover" class="album-cover">
        <h3 class="album-title">${album.title}</h3>
        <p class="album-year">${album.year}</p>
        <a href="${album.spotify}" class="album-link" target="_blank">Poslechni si ho Spotify</a>
    </div>
    `   
}