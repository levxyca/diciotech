const body = document.body;
const toggleDarkModeButton = document.querySelector("#dark-mode-toggle");
const moonIcon = document.querySelector(".ph-moon");
const sunIcon = document.querySelector(".ph-sun");

function displayMoonIcon(display) {
    if (display) {
        moonIcon.style.display = "inline";
        sunIcon.style.display = "none";
    } else {
        moonIcon.style.display = "none";
        sunIcon.style.display = "inline";
    }
}

function toggleDarkModeWithLocalStorage() {
    const darkModeTheme = localStorage.getItem("darkMode") === "true";
    if (darkModeTheme) {
        displayMoonIcon(false);
        body.classList.toggle("body-dark-mode");
    }
}

function toggleDarkModeAndSaveState() {
    body.classList.toggle("body-dark-mode");
    const isDarkMode = body.classList.contains("body-dark-mode");
    if (isDarkMode) {
        displayMoonIcon(false);
        localStorage.setItem("darkMode", true);
    } else {
        displayMoonIcon(true);
        localStorage.setItem("darkMode", false);
    }
}

toggleDarkModeWithLocalStorage();
toggleDarkModeButton.addEventListener("click", toggleDarkModeAndSaveState);
