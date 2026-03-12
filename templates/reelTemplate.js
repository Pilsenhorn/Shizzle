export function reelTemplate(reel) {
    return `
    <div class="reel">
        <a href="${reel.link}" target="_blank">
            <video
                preload="none"
                poster="${reel.poster}"
                controls
            >
                <source src="${reel.video}" type="video/mp4">
            </video>
        </a>
    </div>
    `   
}