const sizeButtons = document.querySelectorAll("[data-textsize]");
const contrastToggle = document.getElementById("contrast-toggle");

const settings = {
    textSize: "medium",
    contrast: "normal"
};

function applySettings() {
    const root = document.documentElement;

    root.classList.remove("text-small", "text-medium", "text-large", "contrast-high");

    root.classList.add("text-" + settings.textSize);
    if (settings.contrast === "high") {
        root.classList.add("contrast-high");
    }

    sizeButtons.forEach(function (button) {
        const isActive = button.dataset.textsize === settings.textSize;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    contrastToggle.setAttribute("aria-pressed", settings.contrast === "high" ? "true" : "false");
}

function handleSizeClick(event) {
    settings.textSize = event.target.dataset.textsize;
    applySettings();
}

function handleContrastClick() {
    settings.contrast = settings.contrast === "high" ? "normal" : "high";
    applySettings();
}

sizeButtons.forEach(function (button) {
    button.addEventListener("click", handleSizeClick);
});

contrastToggle.addEventListener("click", handleContrastClick);

applySettings();