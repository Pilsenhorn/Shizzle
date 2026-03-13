import { reels } from "../data/reels.js"
import { shows } from "../data/shows.js"
import { albums } from "../data/albums.js"

import { reelTemplate } from "../templates/reelTemplate.js"
import { showTemplate } from "../templates/showTemplate.js"
import { albumTemplate } from "../templates/albumTemplate.js"

import { renderList } from "../render/renderList.js"

import { initLazyVideos } from "../helpers/lazyVideo.js"
import { getUpcomingShows } from "../helpers/showsFilter.js"

console.log("main loaded")
renderList({
    data: reels,
    template: reelTemplate,
    containerId: "reels-grid"
})
initLazyVideos()

renderList({
    data: getUpcomingShows(shows),
    template: showTemplate,
    containerId: "shows-grid"
})

renderList({
    data: albums,
    template: albumTemplate,
    containerId: "albums-grid"
})