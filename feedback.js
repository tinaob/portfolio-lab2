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

function validateTopic() {
    if (topicSelect.value === "") {
        showFieldError(topicSelect, "Please choose a topic.");
        return false;
    }

    clearFieldError(topicSelect);
    topicSelect.classList.add("input-valid");
    return true;
}

topicSelect.addEventListener("change", validateTopic);

const minCommentLength = 15;

function updateCommentsCounter() {
    const length = commentsInput.value.length;

    if (length >= minCommentLength) {
        commentsCounter.textContent = length + " characters (minimum reached)";
        commentsCounter.classList.remove("counter-bad");
        commentsCounter.classList.add("counter-good");
    } else {
        commentsCounter.textContent = length + " / " + minCommentLength + " characters minimum";
        commentsCounter.classList.remove("counter-good");
        commentsCounter.classList.add("counter-bad");
    }
}

commentsInput.addEventListener("input", updateCommentsCounter);
updateCommentsCounter();

function validateComments() {
    const value = commentsInput.value.trim();

    if (value === "") {
        showFieldError(commentsInput, "Please write a comment.");
        return false;
    }
    if (value.length < minCommentLength) {
        showFieldError(commentsInput, "Comments must be at least " + minCommentLength + " characters.");
        return false;
    }

    clearFieldError(commentsInput);
    commentsInput.classList.add("input-valid");
    return true;
}

commentsInput.addEventListener("blur", validateComments);

function validateWebsite() {
    const value = websiteInput.value.trim();

    if (value === "") {
        clearFieldError(websiteInput);
        websiteInput.classList.remove("input-valid");
        return true;
    }

    let address = value;
    if (!/^https?:\/\//i.test(address)) {
        address = "https://" + address;
    }

    try {
        const url = new URL(address);
        if (!url.hostname.includes(".")) {
            throw new Error("No dot in the host name");
        }
    } catch (error) {
        showFieldError(websiteInput, "Please enter a valid website, like example.com.");
        return false;
    }

    websiteInput.value = address;
    clearFieldError(websiteInput);
    websiteInput.classList.add("input-valid");
    return true;
}

websiteInput.addEventListener("blur", validateWebsite);
