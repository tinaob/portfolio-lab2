const sizeButtons = document.querySelectorAll("[data-textsize]");
const contrastToggle = document.getElementById("contrast-toggle");

const settings = {
    textSize: "medium",
    contrast: "normal"
};

function saveSettings() {
    try {
        localStorage.setItem("textSize", settings.textSize);
        localStorage.setItem("contrast", settings.contrast);
    } catch (error) {
        // Storage can be blocked, so the settings are just not remembered
    }
}

function loadSettings() {
    try {
        const savedSize = localStorage.getItem("textSize");
        const savedContrast = localStorage.getItem("contrast");

        if (savedSize === "small" || savedSize === "medium" || savedSize === "large") {
            settings.textSize = savedSize;
        }

        if (savedContrast === "normal" || savedContrast === "high") {
            settings.contrast = savedContrast;
        }
    } catch (error) {
        // Storage can be blocked, so the defaults are used
    }
}

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

    if (contrastToggle) {
        contrastToggle.setAttribute("aria-pressed", settings.contrast === "high" ? "true" : "false");
    }
    saveSettings();
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

if (contrastToggle) {
    contrastToggle.addEventListener("click", handleContrastClick);
}

loadSettings();
applySettings();