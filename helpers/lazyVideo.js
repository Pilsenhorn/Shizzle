export function initLazyVideos() {

  const videos = document.querySelectorAll(".lazy-video")

  const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return

      const video = entry.target
      const source = video.querySelector("source")

      if (source.dataset.src) {
        source.src = source.dataset.src
        video.load()
      }

      observer.unobserve(video)

    })

  }, {
    rootMargin: "200px"
  })

  videos.forEach(video => observer.observe(video))
}