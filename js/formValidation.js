// --- Global variable ---
const form = document.querySelector(".signup-form");

// name@domein.anyTld
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
// Minstens 8 tekens, 1 cijfer, 1 speciaal teken
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

// --- Elements & error targets ---
const firstname = document.querySelector("#firstname");
const firstnameError = document.getElementById(
  firstname.getAttribute("aria-describedby")
);

const lastname = document.querySelector("#lastname");
const lastnameError = document.getElementById(
  lastname.getAttribute("aria-describedby")
);

const email = document.querySelector("#email");
const emailError = document.getElementById(
  email.getAttribute("aria-describedby")
);

const password = document.querySelector("#password");
const passwordError = document.getElementById(
  password.getAttribute("aria-describedby")
);

const passConfirm = document.querySelector("#passConfirm");
const passConfirmError = document.getElementById(
  passConfirm.getAttribute("aria-describedby")
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  firstname.removeAttribute("aria-invalid"); // veld is weer geldig
  lastname.removeAttribute("aria-invalid");
  email.removeAttribute("aria-invalid");
  password.removeAttribute("aria-invalid");
  passConfirm.removeAttribute("aria-invalid");

  firstnameError.textContent = "";
  lastnameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  passConfirmError.textContent = "";

  //   Check First Name
  if (firstname.value.trim() === "") {
    firstname.setAttribute("aria-invalid", "true"); // rood maken in CSS
    firstnameError.textContent = "First name cannot be empty";
  } else if (firstname.value.trim().length < 2) {
    firstname.setAttribute("aria-invalid", "true");
    firstnameError.textContent = "First name must be at least 2 characters";
  }

  //Check Last Name
  if (lastname.value.trim() === "") {
    lastname.setAttribute("aria-invalid", "true");
    lastnameError.textContent = "Last name cannot be empty";
  } else if (lastname.value.trim().length < 2) {
    lastname.setAttribute("aria-invalid", "true");
    lastnameError.textContent = "Last name must be at least 2 characters";
  }

  //Check Email
  if (email.value.trim() === "") {
    email.setAttribute("aria-invalid", "true");
    emailError.textContent = "Please enter a valid email address";
  } else if (!email.value.includes("@")) {
    email.setAttribute("aria-invalid", "true");
    emailError.textContent = "Email address must contain '@' and a domain";
  } else if (email.value.trim().endsWith("@")) {
    email.setAttribute("aria-invalid", "true");
    emailError.textContent = "Email address must contain a domain name";
  } else if (!EMAIL_REGEX.test(email.value.trim())) {
    email.setAttribute("aria-invalid", "true");
    emailError.textContent = "Please enter a valid email address";
  }

  if (password.value.trim() === "") {
    password.setAttribute("aria-invalid", "true");
    passwordError.textContent = "Password cannot be empty";
  } else if (password.value.trim().length < 8) {
    password.setAttribute("aria-invalid", true);
    passwordError.textContent = "Password must be at least 8 characters";
  } else if (!PASSWORD_REGEX.test(password.value.trim())) {
    password.setAttribute("aria-invalid", "true");
    passwordError.textContent =
      "Use 8 or more characters with\n" +
      "a mix of letters, numbers & symbols.";
  }

  if (passConfirm.value.trim() === "") {
    passConfirm.setAttribute("aria-invalid", "true");
    passConfirmError.textContent = "Please confirm your password";
  } else if (password.value.trim() !== passConfirm.value.trim()) {
    passConfirm.setAttribute("aria-invalid", "true");
    passConfirmError.textContent = "Passwords do not match";
  }

  // Check again if all fields meet the conditions
  const errorCheck = [
    firstnameError.textContent,
    lastnameError.textContent,
    emailError.textContent,
    passwordError.textContent,
    passConfirmError.textContent,
  ].every((msg) => msg === "");

  if (errorCheck) {
    // ✅ All fields are valid
    alert("Success! You are registered.");
    form.reset();
  }
});

const inputs = [
  {
    inputId: firstname,
    error: firstnameError,
  },
  { inputId: lastname, error: lastnameError },
  { inputId: email, error: emailError },
  { inputId: password, error: passwordError },
  { inputId: passConfirm, error: passConfirmError },
];

inputs.forEach(({ inputId, error }) => {
  inputId.addEventListener("input", () => {
    if (inputId.value.trim() !== "") {
      inputId.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  });
});
