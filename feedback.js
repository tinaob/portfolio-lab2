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
