function handleError(error) {
  const errorMessageElement = document.getElementById("error-message");
  errorMessageElement.style.display = "block";
  errorMessageElement.innerText = error;
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  fetch("https://www.fulek.com/data/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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

function addEventListenerToLoginForm() {
  document
    .getElementById("login-form")
    .addEventListener("submit", handleSubmit);
}

function addEventListenerToRegisterForm() {
  document
    .getElementById("register-form")
    .addEventListener("submit", handleSubmit);
}

document.addEventListener("DOMContentLoaded", () => {
  addEventListenerToLoginForm();
  addEventListenerToRegisterForm();
});
