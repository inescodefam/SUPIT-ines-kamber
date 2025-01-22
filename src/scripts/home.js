const TITLE = "Budi izvrstan u onom što v";
const DELETED = "idiš.";
const TYPED = "oliš.";
const SUBTITLE = "ZAISKRI.";

const title = document.getElementById("home-title");
const subtitle = document.getElementById("home-subtitle");
var speed = Math.random() * 250;

function typeNextChar(element, text, index, callback) {
  if (index < text.length) {
    console.log(text.charAt(index));
    element.textContent += text.charAt(index);
    index++;
    setTimeout(() => typeNextChar(element, text, index, callback), speed);
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
      setTimeout(deleteNextChar, speed);
    } else if (callback) {
      callback();
    }
  }

  deleteNextChar();
}

function homeAnimation() {
  typeNextChar(title, TITLE, 0, () =>
    typeNextChar(title, DELETED, 0, () =>
      deleteChars(title, DELETED, () =>
        typeNextChar(title, TYPED, 0, () => {
          typeNextChar(subtitle, SUBTITLE, 0, () => {});
        })
      )
    )
  );
}

document.addEventListener("DOMContentLoaded", homeAnimation);
