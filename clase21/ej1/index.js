document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => (data[key] = value));

    data.newsletter = form.newsletter.checked;

    //get all errorSpans and store it in an object with his id's as keys
    const errorSpans = {};
    document.querySelectorAll(".errormsg").forEach((span) => {
      errorSpans[span.id] = span;
    });

    let isValid = true;

    //check if name has no numbers
    let regex = /\d/;
    if (regex.test(data.firstName)) {
      isValid = false;
      errorSpans.errorName.innerHTML = "Name must contain only letters";
    } else {
      errorSpans.errorName.innerHTML = "";
    }

    //check if lastName has only letters
    regex = /^[a-zA-Z]+$/;
    if (!regex.test(data.lastName)) {
      isValid = false;
      errorSpans.errorLastName.innerHTML =
        "Last Name must contain only letters";
    } else {
      errorSpans.errorLastName.innerHTML = "";
    }

    //check if username has only letters and numbers}
    regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(data.username)) {
      isValid = false;
      errorSpans.errorUser.innerHTML =
        "Username must contain only letters and numbers";
    } else {
      errorSpans.errorUser.innerHTML = "";
    }

    //check if password has at least 8 characters, one uppercase letter, one lowercase letter and one number
    regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(data.password)) {
      isValid = false;
      errorSpans.errorPassword.innerHTML =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
    } else {
      errorSpans.errorPassword.innerHTML = "";
    }

    //check if password and repeatPassword are the same
    if (data.password !== data.repeatPassword) {
      isValid = false;
      errorSpans.errorMatch.innerHTML = "Passwords must match";
    } else {
      errorSpans.errorMatch.innerHTML = "";
    }

    if (isValid) {
      alert("Form submitted");
      console.log(data);
    } else {
      alert("Form not submitted");
    }
  });
});
