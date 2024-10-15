const LETTER_APPEARANCE_DELAY = 100;
const homeSubtitleText = "Zaiskri.";
const homeTitleText = "Budi izvrstan u onom što voliš.";

function createCursor() {
  const cursorElement = document.createElement("span");
  cursorElement.classList.add("text-cursor");

  return cursorElement;
}

function animateTitle() {
  const homeTitleElement = document.getElementById("home-title");
  const cursorElement = createCursor();
  homeTitleElement.appendChild(cursorElement);

  homeTitleText.split("").forEach((letter, index) => {
    setTimeout(() => {
      const span = document.createElement("span");
      span.innerText = letter;
      homeTitleElement.insertBefore(span, cursorElement);
    }, index * LETTER_APPEARANCE_DELAY);
  });
}

function animateSubtitle() {
  const animationDelay = LETTER_APPEARANCE_DELAY * homeTitleText.length;
  const homeSubtitleElement = document.getElementById("home-subtitle");
  const cursorElement = createCursor();

  setTimeout(() => {
    homeSubtitleElement.appendChild(cursorElement);
    homeSubtitleText.split("").forEach((letter, index) => {
      setTimeout(() => {
        const span = document.createElement("span");
        span.innerText = letter;
        homeSubtitleElement.insertBefore(span, cursorElement);
      }, index * LETTER_APPEARANCE_DELAY);
    });
  }, animationDelay);
}
document.addEventListener("DOMContentLoaded", () => {
  animateTitle();
  animateSubtitle();
});
