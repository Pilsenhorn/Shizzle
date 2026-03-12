export function showTemplate(show) {
    return `<div class="show">
    <div class="show-date">${show.date}</div>
    <div class="show-city">${show.city}</div>
    <div class="show-venue">${show.venue}</div>
    <a href="${show.tickets}" class="show-tickets">Kup si lístky</a>
</div>
    `;
}

