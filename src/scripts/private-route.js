function updateLoginLink() {
  const loginLink = document.getElementById("login-text");
  const loginIcon = document.getElementById("login-icon");

  if (loginLink && loginIcon && getUserFromLocalStorage()) {
    loginLink.innerText = "Odjavi se";
    loginIcon.src = "./public/assets/logout.svg";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateLoginLink();
});
