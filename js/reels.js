async function loadReels() {

  console.log("loading reels");

  const response = await fetch(
    "https://rsshub.app/instagram/user/shizzle.rap?format=json"
  );

  const data = await response.json();

  console.log(data);

  const grid = document.getElementById("reels-grid");

  const posts = data.items.slice(0,6);

  posts.forEach(post => {

    const tile = document.createElement("a");

    tile.href = post.link;
    tile.target = "_blank";
    tile.className = "reel-tile";

    tile.innerHTML = `
      <img src="${post.enclosure.url}" alt="Instagram post">
      <span class="reel-play">▶</span>
    `;

    grid.appendChild(tile);

  });

}

document.addEventListener("DOMContentLoaded", loadReels);