export function reelTemplate(reel) {
    return `
    <div class="reel">
        
            <video
                class="lazy-video"
                preload="none"
                poster="${reel.poster}"
                controls
                playsinline
            >
                <a href="${reel.link}" target="_blank">
                    <source data-src="${reel.video}" type="video/mp4">
                </a>
            </video>
        </a>
    </div>
    `   
}