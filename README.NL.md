# Frontend Mentor – Signup Form (Validation)

> 🇳🇱 Dutch version: [README.nl.md](./README.nl.md)

I wanted realistic, practice-oriented projects to improve my JavaScript. That led me to **Frontend Mentor**. With small challenges I push myself: not just “make it work”, but improve my code approach—analyse problems, refactor, and apply the **DRY** principle.

## Challenge

A **registration component** with client-side validation and clear error messages, fully responsive for mobile, tablet, and desktop.

## Demo & Code

- 🔗 Demo: https://junior-project-sign-up-form-git-main-newwiens-projects.vercel.app/
- 🗂️ Repo: https://github.com/Newwiens/junior-project-signUpForm.git

## Features

- Modular vanilla JS validation (higher-order validators + rule config per field)
- Per-field “first error” feedback
- Granular email checks (+ regex fallback)
- Password rule: ≥8 chars, ≥1 number & ≥1 symbol
- Responsive layout & hover states
- **A11y**: `aria-invalid`, `aria-describedby` (optionally `aria-live="polite"`)

## What I learned

- Structuring a component **modularly** in vanilla JS
- Working with **arrays** and **objects**; when to use **for** vs **forEach**
- Building validation from **small, reusable pieces** (helpers + mini “validator factories”)
- Defining rules **per field** and showing the **first error immediately**
- Applying basic **WCAG/A11y** patterns for accessible forms

## Stack

- HTML, CSS, JavaScript (vanilla)

## Run locally

```bash
# clone
git clone https://github.com/Newwiens/junior-project-signUpForm.git
cd junior-project-signUpForm

# open index.html with a live server (VS Code: "Open with Live Server")
```
