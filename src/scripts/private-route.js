function updateLoginLink() {
  const loginText = document.getElementById("login-text");
  const loginIcon = document.getElementById("login-icon");
  const loginLink = document.getElementById("login-link");
  const username = document.getElementById("username");

  if (loginText && loginIcon && getUserFromLocalStorage()) {
    loginText.innerText = "Odjavi se";
    username.innerText = getUsernameFromLocalStorage();
    loginIcon.src =
      window.location.href === "/index.html"
        ? "./public/assets/logout.svg"
        : "../../public/assets/logout.svg";
  }

  loginLink?.addEventListener("click", logout);
}

function getUsernameFromLocalStorage() {
  username = JSON.parse(localStorage.getItem("user")).username;
  return username;
}

function toggleCurriculumLink() {
  const curriculumLink = document.getElementById("curriculum-link");

  if (curriculumLink)
    curriculumLink.style.display = getUserFromLocalStorage() ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
  updateLoginLink();
  toggleCurriculumLink();
});
