const API_URL = "https://www.fulek.com/data/api/user/";

function handleError(error) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "block";
  errorMessageElement.innerText = error;
}

function getFormDataStringify() {
  const formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  return JSON.stringify(formData);
}

function handleLoginSubmit(event) {
  event.preventDefault();
  fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: getFormDataStringify(),
  })
    .then(async (response) => {
      const { isSuccess, errorMessages } = await response.json();

      if (isSuccess) {
        // TODO
      } else {
        throw errorMessages.join(", ");
      }
    })
    .catch(handleError);
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  fetch(API_URL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: getFormDataStringify(),
  })
    .then(async (response) => {
      console.log(await response);
      const { isSuccess, errorMessages } = await response.json();
      if (isSuccess) {
        // TODO
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
  if (window.location.pathname.endsWith("login.html")) {
    addEventListenerToForm("login-form", handleLoginSubmit);
  } else if (window.location.pathname.endsWith("register.html")) {
    addEventListenerToForm("register-form", handleRegisterSubmit);
  }
});
