const sizeButtons = document.querySelectorAll("[data-textsize]");
const contrastToggle = document.getElementById("contrast-toggle");

// Keeps the visitor's choices in one place, starting with Medium text and Normal contrast.
const settings = {
    textSize: "medium",
    contrast: "normal"
};

// Saving can fail if browser storage is blocked or unavailable, so try prevents it from breaking the page.
function saveSettings() {
    try {
        localStorage.setItem("textSize", settings.textSize);
        localStorage.setItem("contrast", settings.contrast);
    } catch (error) {
        // Storage can be blocked, so the settings are just not remembered
    }
}

// This checks the saved values are valid before using them so invalid or outdated storage cannot set unsupported options.
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

    // This clears previous setting classes first so that the old choices cannot conflict with the visitor's current choices.
    root.classList.remove("text-small", "text-medium", "text-large", "contrast-high");

    root.classList.add("text-" + settings.textSize);
    if (settings.contrast === "high") {
        root.classList.add("contrast-high");
    }

    sizeButtons.forEach(function (button) {
        const isActive = button.dataset.textsize === settings.textSize;
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    // Some pages may not contain this control, so check that it exists before adding an event listener or changing it.
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

// This restores saved choices before applying them so that the page uses the visitor's preferences instead of the defaults. 
// If the order were reversed, the page would apply the defaults and save them over the visitor’s stored choices, so their settings would be lost.
loadSettings();
applySettings();