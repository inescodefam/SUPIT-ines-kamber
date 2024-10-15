const LETTER_APPEARANCE_DELAY = 100;

function animateTitle() {
  const homeTitleElement = document.getElementById("home-title");
  const homeTitleText = "Budi izvrstan u onom što voliš.";

  homeTitleText.split("").forEach((letter, index) => {
    setTimeout(() => {
      const span = document.createElement("span");
      span.innerText = letter;
      homeTitleElement.appendChild(span);
    }, index * LETTER_APPEARANCE_DELAY);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateTitle();
});
