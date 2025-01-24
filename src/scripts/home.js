const MAIN_TITLE = "Budi izvrstan u onom što v";
const MAIN_TITLE_SUFFIX = "idiš.";
const MAIN_TITLE_ALTERNATE_SUFFIX = "oliš.";
const SUBTITLE_TEXT = "ZAISKRI.";

const mainTitleElement = document.querySelector("#home-title .text");
const subtitleElement = document.querySelector("#home-subtitle .text");
const mainTitleCursor = document.querySelector("#home-title .cursor");
const subtitleCursor = document.querySelector("#home-subtitle .cursor");
const STARTING_INDEX = 0;
const SPEED = 250;

function typeNextChar(element, text, index, callback) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(() => typeNextChar(element, text, index, callback), SPEED);
  } else if (callback) {
    callback();
  }
}

function deleteChars(element, content, callback) {
  let index = content.length;

  function deleteNextChar() {
    if (index > 0) {
      element.textContent = element.textContent.slice(0, -1);
      index--;
      setTimeout(deleteNextChar, SPEED);
    } else if (callback) {
      callback();
    }
  }

  deleteNextChar();
}

function homeAnimation() {
  subtitleCursor.classList.add("hidden");
  typeNextChar(mainTitleElement, MAIN_TITLE, STARTING_INDEX, () =>
    typeNextChar(mainTitleElement, MAIN_TITLE_SUFFIX, STARTING_INDEX, () =>
      deleteChars(mainTitleElement, MAIN_TITLE_SUFFIX, () =>
        typeNextChar(
          mainTitleElement,
          MAIN_TITLE_ALTERNATE_SUFFIX,
          STARTING_INDEX,
          () => {
            mainTitleCursor.classList.add("hidden");
            subtitleCursor.classList.remove("hidden");
            typeNextChar(
              subtitleElement,
              SUBTITLE_TEXT,
              STARTING_INDEX,
              () => {}
            );
          }
        )
      )
    )
  );
}

document.addEventListener("DOMContentLoaded", homeAnimation);
