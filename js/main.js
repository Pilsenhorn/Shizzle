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

function initConcertModal(shows){

const modal = document.getElementById("concert-modal")
const close = document.querySelector(".modal-close")
const modalShow = document.getElementById("modal-show")
const modalTickets = document.getElementById("modal-tickets")
const modalVideo = document.getElementById("modal-video")

if(!modal || !shows.length) return

const upcoming = getUpcomingShows(shows)
if(!upcoming.length) return

const nextShow = upcoming[0]

const date = new Date(nextShow.date)
const now = new Date()

const daysLeft = Math.ceil((date-now)/(1000*60*60*24))

// otevřít jen pokud koncert je do 30 dní
if(daysLeft > 30) return

const formattedDate = date.toLocaleDateString("cs-CZ",{
day:"numeric",
month:"long",
year:"numeric"
})

modalShow.innerHTML = `
<p><strong>${formattedDate}</strong></p>
<p>${nextShow.city}</p>
<p>${nextShow.venue}</p>
<p>Za ${daysLeft} dní</p>
`

modalTickets.href = nextShow.tickets

// optional video
if(nextShow.video){
modalVideo.innerHTML = `
<video controls playsinline>
<source src="${nextShow.video}" type="video/mp4">
</video>
`
}

// otevření při prvním scrollu
if(!localStorage.getItem("concertModalShown")){

window.addEventListener("scroll",()=>{

modal.classList.add("open")
document.body.style.overflow="hidden"

localStorage.setItem("concertModalShown","true")

},{once:true})

}

// zavření
close?.addEventListener("click",()=>{
modal.classList.remove("open")
document.body.style.overflow=""
})

modal.addEventListener("click",(e)=>{
if(e.target===modal){
modal.classList.remove("open")
document.body.style.overflow=""
}
})

}

initConcertModal(shows)