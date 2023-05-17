document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const button = document.querySelector("button");

  const checkInputs = () => {
    const inputs = [...document.querySelectorAll("input[type='text']")];
    const empty = inputs.some((input) => input.value === "");

    button.disabled = empty;
  };

  checkInputs();

  const changeInput = ({ event, regex, errorSpan, errorMessage }) => {
    const exp = new RegExp(regex);
    if (exp.test(event.target.value)) {
      event.target.style.borderColor = "#f00";
      errorSpan.innerHTML = errorMessage;
      button.disabled = true;
    } else {
      event.target.style.borderColor = "#f0f";
      errorSpan.innerHTML = "";
      checkInputs();
    }
  };

  document.getElementById("firstName").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /\d/,
      errorSpan: document.getElementById("errorName"),
      errorMessage: "Name must contain only letters",
    });
  });

  document.getElementById("lastName").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /\d/,
      errorSpan: document.getElementById("errorLastName"),
      errorMessage: "Last Name must contain only letters",
    });
  });

  document.getElementById("username").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /[^a-zA-Z0-9]/,
      errorSpan: document.getElementById("errorUser"),
      errorMessage: "Username must contain only letters and numbers",
    });
  });

  document.getElementById("password").addEventListener("input", (e) => {
    changeInput({
      event: e,
      regex: /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/,
      errorSpan: document.getElementById("errorPassword"),
      errorMessage:
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number",
    });
  });

  document.getElementById("repeatPassword").addEventListener("input", (e) => {
    if (e.target.value !== document.getElementById("password").value) {
      e.target.style.borderColor = "#f00";
      document.getElementById("errorMatch").innerHTML = "Passwords must match";
      button.disabled = true;
    } else {
      e.target.style.borderColor = "#f0f";
      document.getElementById("errorMatch").innerHTML = "";
      button.disabled = false;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.newsletter = document.getElementById("newsletter").checked;
    localStorage.setItem("user", JSON.stringify(data));

    console.log(JSON.parse(localStorage.getItem("user")));
  });
});
