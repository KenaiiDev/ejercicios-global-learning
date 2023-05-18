document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const button = document.querySelector("button");

  const checkInputs = () => {
    const inputs = [...document.querySelectorAll("input[type='text']")];
    const empty = inputs.some((input) => input.value === "");

    button.disabled = empty;
  };
  checkInputs();

  const errors = {
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    repeatPassword: false,
  };

  const checkValidForm = () => {
    const valid = Object.values(errors).some((error) => error);
    button.disabled = valid;
  };

  const changeInput = ({ event, regex, errorSpan, errorMessage }) => {
    const exp = new RegExp(regex);
    if (exp.test(event.target.value)) {
      event.target.style.borderColor = "#f00";
      errorSpan.innerHTML = errorMessage;
      errors[event.target.id] = true;
    } else {
      event.target.style.borderColor = "#f0f";
      errorSpan.innerHTML = "";
      errors[event.target.id] = false;
      checkInputs();
    }
  };

  const checkValidPassword = (password) => {
    let isValid = true;
    isValid &&= password.length >= 8;
    isValid &&= /[a-z]/.test(password);
    isValid &&= /[A-Z]/.test(password);
    isValid &&= /[0-9]/.test(password);
    if (!isValid) {
      document.getElementById("errorPassword").innerHTML =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
      errors.password = true;
    } else {
      document.getElementById("errorPassword").innerHTML = "";
      errors.password = false;
    }
  };

  document.getElementById("firstName").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /\d/,
      errorSpan: document.getElementById("errorName"),
      errorMessage: "Name must contain only letters",
    });
    checkValidForm();
  });

  document.getElementById("lastName").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /\d/,
      errorSpan: document.getElementById("errorLastName"),
      errorMessage: "Last Name must contain only letters",
    });
    checkValidForm();
  });

  document.getElementById("username").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /[^a-zA-Z0-9]/,
      errorSpan: document.getElementById("errorUser"),
      errorMessage: "Username must contain only letters and numbers",
    });
    checkValidForm();
  });

  document.getElementById("password").addEventListener("input", (e) => {
    checkValidPassword(e.target.value);
    checkValidForm();
  });

  document.getElementById("repeatPassword").addEventListener("input", (e) => {
    if (e.target.value !== document.getElementById("password").value) {
      e.target.style.borderColor = "#f00";
      document.getElementById("errorMatch").innerHTML = "Passwords must match";
      errors.repeatPassword = true;
    } else {
      e.target.style.borderColor = "#f0f";
      document.getElementById("errorMatch").innerHTML = "";
      errors.repeatPassword = false;
    }
    checkValidForm();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkValidForm();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.newsletter = document.getElementById("newsletter").checked;
    localStorage.setItem("user", JSON.stringify(data));

    console.log(JSON.parse(localStorage.getItem("user")));
  });
});
