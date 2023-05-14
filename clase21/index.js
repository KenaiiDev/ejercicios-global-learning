const section = document.querySelector("section");
console.log(section);

//h2
const heading2 = document.createElement("h2");
heading2.textContent = "Gatitos";

//span
const span = document.createElement("span");
span.textContent = "es pan";

//img
const image = document.createElement("img");
image.setAttribute("src", "https://http.cat/102");

section.appendChild(heading2);
section.appendChild(span);
section.appendChild(image);
