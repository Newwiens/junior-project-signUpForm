// --- Global variable ---
const form = document.querySelector(".signup-form");

// name@domein.anyTld
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
// Minstens 8 tekens, 1 cijfer, 1 speciaal teken
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[^A-Za-z0-9\s]).+$/;

// --- Elements & their error targets ---
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

// Helper functions for clearing / showing errors
const clearError = (inputE1, errorE1) => {
  inputE1.removeAttribute("aria-invalid");
  errorE1.textContent = "";
};

const showError = (inputE1, errorE1, msg) => {
  inputE1.setAttribute("aria-invalid", "true");
  errorE1.textContent = msg;
};

// List of required fields (element + its error element)
const fields = [
  { el: firstname, err: firstnameError },
  { el: lastname, err: lastnameError },
  { el: email, err: emailError },
  { el: password, err: passwordError },
  { el: passConfirm, err: passConfirmError },
];

/* -------- Validators for inputs -------- */

// General normalizer: if null/undefined → '', then trim edges
const norm = (value) => (value ?? "").trim(); // if null or undefined, use empty string, then trim edges

// Basic validators
const required = (label) => (value) =>
  norm(value) ? "" : `${label} cannot be empty`; // checks if the input field is empty

const minLength = (minChars, label) => (value) =>
  norm(value).length >= minChars
    ? ""
    : `${label} must be at least ${minChars} characters`; // true = passes length check; false = show message about minimum characters

const pattern = (regex, msg) => (value) => regex.test(norm(value)) ? "" : msg; // matches value against a regex; if it fails, return the provided message

const equalsValue = (getOther, msg) => (value) =>
  norm(value) === norm(getOther()) ? "" : msg; // compares this value to another field's value

//extra check voor email:

const noSpaces = (msg) => (value) => norm(value).includes(" ") ? msg : ""; // No spaces allowed in the email (often happens due to copy-paste)

const exactlyOneAt = (msg) => (value) =>
  norm(value).split("@").length === 2 ? "" : msg; // Exactly one '@': splitting on '@' should yield 2 parts; e.g. "a@b" → ["a","b"]

const notEndsWith = (suffix, msg) => (value) =>
  norm(value).endsWith(suffix) ? msg : ""; // Must not end with the given suffix (e.g. '@')

const notDoubleDots = (msg) => (value) => norm(value).includes("..") ? msg : ""; // No consecutive dots allowed

const domainHasDot = (msg) => (value) => {
  const at = norm(value).indexOf("@");
  if (at < 0) return ""; // Let other rules handle the missing '@'
  const domain = norm(value)
    .slice(at + 1)
    .trim();
  return domain.includes(".") ? "" : msg; // Domain part must contain at least one dot
};

/*------ Rules per field -----*/
// Note: object keys must match input ids (firstname, lastname, email, password, passConfirm)
// Order matters if your runner stops at the first error

// Object with Arrays → can be looked up per object,
// and when iterating that object of arrays, their order is preserved!

const rules = {
  firstname: [required("First Name"), minLength(2, "First Name")],
  lastname: [required("Last Name"), minLength(2, "Last Name")],
  email: [
    required("Email Adress"),
    noSpaces("Email address must not contain spaces"),
    exactlyOneAt("Email address must contain exactly one '@'"),
    notEndsWith("@", "Email address must contain a domain name"),
    domainHasDot("Email domain must contain dot"),
    notDoubleDots("Email address must not contain consecutive dots"),
    pattern(EMAIL_REGEX, "Please enter a valid email address"),
  ],
  password: [
    required("Password"),
    minLength(8, "Password"),
    pattern(
      PASSWORD_REGEX,
      "Use 8 or more characters with\n" + "a mix of letters, numbers & symbols."
    ),
  ],
  passConfirm: [
    required("Please confirm your password"),
    equalsValue(() => password.value, "Passwords do not match"),
  ],
};

// Validate a single input against its validators
function validate(el, err, validators) {
  // Always reset current error state first
  clearError(el, err);

  // Run validators in order; stop at the first failure
  for (let i = 0; i < validators.length; i++) {
    const rule = validators[i];
    const message = rule(el.value);
    if (message) {
      showError(el, err, message);
      return false; // signal invalid
    }
  }
  return true; // signal valid
}

/*----------- “Live” behavior per your current preference: ---------*/
// - Validate on blur (leaving the field)
// - While typing, just hide an existing error (no validation yet)
fields.forEach(({ el, err }) => {
  if (!el || !err) return;
  const run = () => validate(el, err, rules[el.id] || []); // <-- callBfn wordt opgeroepem validate

  el.addEventListener("blur", run); // Live update tijdens invoeren vd veld
  el.addEventListener("input", () => {
    // 🙈 optioneel: fout verbergen tijdens typen
    if (el.hasAttribute("aria-invalid")) {
      clearError(el, err);
    }
  });
});

/*--------------- Submit: validate all fields; if all OK, clear and reset -----------*/

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the native form submit (we handle validation ourselves)

  let allValid = true;
  fields.forEach(({ el, err }) => {
    if (!el || !err) return; /// <-- skip if something is missing (defensive)

    const validators = rules[el.id] || []; // --> fetch validators from rules; [el.id] matches the DOM input's id (#...)
    const ok = validate(el, err, validators); // --> call the validate function for this field
    if (!ok) allValid = false; // if any field fails, mark overall state as invalid
  });

  if (allValid) {
    alert("Success! You are registered.");
    form.reset(); // clear all inputs
    fields.forEach(({ el, err }) => clearError(el, err)); // clear any leftover error UI
  }
});
