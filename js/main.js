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



function initConcertModal(){

const modal = document.getElementById("concert-modal")
const close = document.querySelector(".modal-close")
const modalShow = document.getElementById("modal-show")
const modalTickets = document.getElementById("modal-tickets")   

if(!modal) return

// naplnit modal daty z prvního koncertu
const firstShow = getUpcomingShows(shows)[0]
const date = new Date(firstShow.date)
const formattedDate = date.toLocaleDateString("cs-CZ",{
    day: "numeric",
    month: "long",
    year: "numeric"
})

const dayLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24))
// naplnit modal daty
if(modalShow) {
    modalShow.innerHTML =
    `
    <p>${formattedDate}</p>
    <p>${firstShow.venue}</p>
    <p>${dayLeft} dní do koncertu</p>
    `
}
if(modalTickets){
    modalTickets.href = firstShow.tickets
}


// otevřít modal po 1s
setTimeout(()=>{
    modal.classList.add("open")
},1000)

// zavření tlačítkem
close?.addEventListener("click",()=>{
    modal.classList.remove("open")
})

// zavření kliknutím mimo modal
modal.addEventListener("click",(e)=>{
    if(e.target === modal){
        modal.classList.remove("open")
    }
})

}

initConcertModal()