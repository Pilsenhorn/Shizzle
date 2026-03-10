async function loadReels() {

  console.log("loading reels");

  const url =
  "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent("https://rsshub.app/instagram/user/shizzle.rap");

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  const grid = document.getElementById("reels-grid");

  if (!data.items) return;

  data.items.slice(0,6).forEach(post => {

    const tile = document.createElement("a");

    tile.href = post.link;
    tile.target = "_blank";
    tile.className = "reel-tile";

    tile.innerHTML = `
      <img src="${post.thumbnail}">
      <span class="reel-play">▶</span>
    `;

    grid.appendChild(tile);

  });

}

document.addEventListener("DOMContentLoaded", loadReels);