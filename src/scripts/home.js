const TITLE = "Budi izvrstan u onom što v";
const DELETED = "idiš.";
const TYPED = "oliš.";
const SUBTITLE = "ZAISKRI.";

const title = document.getElementById("home-title").querySelector(".text");
const subtitle = document
  .getElementById("home-subtitle")
  .querySelector(".text");
const cursor1 = document.getElementById("home-title").querySelector(".cursor");
const cursor2 = document
  .getElementById("home-subtitle")
  .querySelector(".cursor");

var speed = Math.random() * 250;

function typeNextChar(element, text, index, callback) {
  if (index < text.length) {
    element.textContent += text.charAt(index);
    index++;
    setTimeout(() => typeNextChar(element, text, index, callback), 250);
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
      setTimeout(deleteNextChar, 250);
    } else if (callback) {
      callback();
    }
  }

  deleteNextChar();
}

function homeAnimation() {
  cursor2.classList.add("hidden");
  typeNextChar(title, TITLE, 0, () =>
    typeNextChar(title, DELETED, 0, () =>
      deleteChars(title, DELETED, () =>
        typeNextChar(title, TYPED, 0, () => {
          cursor1.classList.add("hidden");
          cursor2.classList.remove("hidden");
          typeNextChar(subtitle, SUBTITLE, 0, () => {});
        })
      )
    )
  );
}

document.addEventListener("DOMContentLoaded", homeAnimation);
