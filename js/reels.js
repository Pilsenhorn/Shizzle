async function loadReels() {

  const MAX_REELS = 6;

  try {

    const response = await fetch("./data/reels.json");
    const reels = await response.json();
    console.log(reels);

    const grid = document.getElementById("reels-grid");

    const latestReels = reels.slice(-MAX_REELS).reverse();

    latestReels.forEach(item => {

      const article = document.createElement("article");
      article.className = "reel";

      article.innerHTML = `
        <div class="reel-wrapper">
          <blockquote
            class="instagram-media"
            data-instgrm-permalink="${item.url}"
            data-instgrm-version="14">
          </blockquote>
        </div>
      `;

      grid.appendChild(article);

    });

    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

  } catch (error) {
    console.error("Failed to load reels:", error);
  }

}

document.addEventListener("DOMContentLoaded", loadReels);