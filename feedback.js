console.log("feedback.js is connected");

const form = document.getElementById("feedback-form");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");
const commentsCounter = document.getElementById("comments-counter");
const clearButton = document.getElementById("clear-button");
const formStatus = document.getElementById("form-status");

function showFieldError(input, message) {
    const errorSpan = document.getElementById(input.id + "-error");
    errorSpan.textContent = message;
    input.classList.remove("input-valid");
    input.classList.add("input-error");
}

function clearFieldError(input) {
    const errorSpan = document.getElementById(input.id + "-error");
    errorSpan.textContent = "";
    input.classList.remove("input-error");
}

function validateFullName() {
    const value = fullNameInput.value.trim();
    const namePattern = /^[\p{L}\s'\u2019-]+$/u;

    if (value === "") {
        showFieldError(fullNameInput, "Please enter your full name.");
        return false;
    }
    if (value.length < 2) {
        showFieldError(fullNameInput, "Name must be at least 2 characters.");
        return false;
    }
    if (!namePattern.test(value)) {
        showFieldError(fullNameInput, "Use only letters, spaces, apostrophes and hyphens.");
        return false;
    }

    clearFieldError(fullNameInput);
    fullNameInput.classList.add("input-valid");
    return true;
}

fullNameInput.addEventListener("blur", validateFullName);

function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showFieldError(emailInput, "Please enter your email address.");
        return false;
    }
    if (!emailPattern.test(value)) {
        showFieldError(emailInput, "Please enter a valid email address, like name@example.com.");
        return false;
    }

    clearFieldError(emailInput);
    emailInput.classList.add("input-valid");
    return true;
}

emailInput.addEventListener("blur", validateEmail);
