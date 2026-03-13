export function showTemplate(show) {

const date = new Date(show.date)

const formattedDate =
date.toLocaleDateString("cs-CZ", {
day: "numeric",
month: "numeric",
year: "numeric"
})

return `
<div class="show">
<div class="show-date">${formattedDate}</div>
<div class="show-city">${show.city}</div>
<div class="show-venue">${show.venue}</div>
<a href="${show.tickets}" class="show-tickets">Kup si lístky</a>
</div>
`
}