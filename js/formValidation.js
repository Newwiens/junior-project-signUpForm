// submit
const form = document.querySelector(".signup-form");

// variable aanmaken
const firstname = document.querySelector("#firstname");
const firstnameError = document.getElementById(
  firstname.getAttribute("aria-describedby")
);

const lastname = document.querySelector("#lastname");
const lastnameError = document.getElementById(
  lastname.getAttribute("aria-describedby")
);

const email = document.querySelector("#email")
const emailError = document.getElementById(email.getAttribute("aria-describedby"));

//let valid = true;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  firstname.removeAttribute("aria-invalid"); // veld is weer geldig
  lastname.removeAttribute("aria-invalid");
  email.removeAttribute("aria-invalid");

  firstnameError.textContent = "";
  lastnameError.textContent = "";
  emailError.textContent = "";

  //   if check empty strin
  if (firstname.value.trim() === "") {
    firstname.setAttribute("aria-invalid", "true"); // rood maken in CSS
    firstnameError.textContent = "First name cannot be empty";
  }

  if (lastname.value.trim() === "") {
    lastname.setAttribute("aria-invalid", "true");
    lastnameError.textContent = "Last name cannot be empty";
  }

  if (email.value.trim() === "") {
    email.setAttribute("aria-invalid", "true");
    emailError.textContent = "Please enter a valid email address"
  }

  console.log("BTN is geklikt");
});

const inputs = [
  {
    inputId: firstname,
    error: firstnameError,
  },
  { inputId: lastname, error: lastnameError },
  { inputId: email, error: emailError},
];

inputs.forEach(({ inputId, error }) => {
  inputId.addEventListener("input", () => {
    if (inputId.value.trim() !== "") {
      inputId.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  });
});
