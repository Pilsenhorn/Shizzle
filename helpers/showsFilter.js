export function getUpcomingShows(shows) {
    const today = new Date()
    return shows.filter(show => new Date(show.date) >= today)
}