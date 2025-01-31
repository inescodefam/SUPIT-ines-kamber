const API_BASE = "https://www.fulek.com/data/api";
const USER_API = API_BASE + "/user";
const USER_LOCAL_STORAGE_KEY = "user";

const redirectToHomePage = () => (window.location.pathname = "/index.html");

function saveUserToLocalStorage(token, username) {
  localStorage.setItem(
    USER_LOCAL_STORAGE_KEY,
    JSON.stringify({ token, username })
  );
}

function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
}

function removeUserFromLocalStorage() {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}

function logout() {
  removeUserFromLocalStorage();
  redirectToHomePage();
}

function handleError(error) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "block";
  errorMessageElement.innerText = error;
}

function displayRedirectMessage() {
  const redirectMessageElement = document.getElementById("redirect-message");
  redirectMessageElement.style.display = "block";
  redirectMessageElement.innerText =
    "Uspječna prijava! Na početnoj stranici ste za 3,2,1,...";
}

function getFormDataStringify() {
  const formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  return JSON.stringify(formData);
}

function resetErrorMessage() {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "none";
}

function handleLoginSubmit(event) {
  resetErrorMessage();
  event.preventDefault();
  fetch(USER_API + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: getFormDataStringify(),
  })
    .then(async (response) => {
      const { isSuccess, errorMessages, data } = await response.json();

      if (isSuccess && data?.token && data?.username) {
        const { token, username } = data;
        saveUserToLocalStorage(token, username);
        displayRedirectMessage();
        setTimeout(redirectToHomePage, 3000);
      } else {
        throw errorMessages.join(", ");
      }
    })
    .catch(handleError);
}

function handleRegisterSubmit(event) {
  resetErrorMessage();

  event.preventDefault();
  fetch(USER_API + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: getFormDataStringify(),
  })
    .then(async (response) => {
      const { isSuccess, errorMessages } = await response.json();
      if (isSuccess) {
        window.location.pathname = "/src/sites/login.html";
      } else {
        throw errorMessages.join(", ");
      }
    })
    .catch(handleError);
}

function addEventListenerToForm(elementId, submitHandler) {
  document.getElementById(elementId).addEventListener("submit", submitHandler);
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoginPage = window.location.pathname.endsWith("login.html");
  const isRegisterPage = window.location.pathname.endsWith("register.html");
  const isCurriculumPage = window.location.pathname.endsWith("curriculum.html");

  if ((isLoginPage || isRegisterPage) && getUserFromLocalStorage()) {
    redirectToHomePage();
    return;
  }
  if (isCurriculumPage && getUserFromLocalStorage() === null) {
    redirectToHomePage();
    return;
  }
  if (isLoginPage) {
    addEventListenerToForm("login-form", handleLoginSubmit);
    return;
  }
  if (isRegisterPage) {
    addEventListenerToForm("register-form", handleRegisterSubmit);
    return;
  }
});
