const LETTER_APPEARANCE_DELAY = 100;

function animateTitle() {
  const homeTitleElement = document.getElementById("home-title");
  const homeTitleText = "Budi izvrstan u onom što voliš.";
  const homeSubtitleText = "\nZaiskri.";
  var animationDuration = 0;

  homeTitleText.split("").forEach((letter, index) => {
    animationDuration += LETTER_APPEARANCE_DELAY;
    setTimeout(() => {
      const span = document.createElement("span");
      span.innerText = letter;
      homeTitleElement.appendChild(span);
    }, index * LETTER_APPEARANCE_DELAY);
  });

  setTimeout(() => {
    console.log(animationDuration);
    homeSubtitleText.split("").forEach((letter, index) => {
      setTimeout(() => {
        const span = document.createElement("span");
        span.innerText = letter;
        homeTitleElement.appendChild(span);
      }, index * LETTER_APPEARANCE_DELAY);
    });
  }, animationDuration);
}

document.addEventListener("DOMContentLoaded", () => {
  animateTitle();
});
