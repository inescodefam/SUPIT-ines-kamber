function homeAnimation() {
  new TypeIt("#home-title", {
    speed: 75,
    startDelay: 900,
    lifeLike: true,
  })
    .type("Budi izvrstan u onom što vidiš.", {
      delay: 200,
    })
    .delete(5)
    .type("oliš.", { delay: 100 })
    .break({ delay: 600 })
    .type(
      "<span style='text-transform:uppercase' class='red-text'>Zaiskri. </span>",
      {
        delay: 100,
      }
    )
    .go();
}

document.addEventListener("DOMContentLoaded", () => {
  homeAnimation();
});
