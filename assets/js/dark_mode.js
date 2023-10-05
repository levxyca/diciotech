const body = document.body;
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const headerSubtitle = document.querySelector(".header__subtitle");
const moonIcon = document.querySelector(".ph-moon");
const sunIcon = document.querySelector(".ph-sun");

let themeMode = localStorage.getItem("mode");
if (themeMode && themeMode === "dark") {
  moonIcon.style.display = "none";
  sunIcon.style.display = "inline";
  body.classList.toggle("body-dark-mode");
  headerSubtitle.classList.toggle("text-dark-mode");
}
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("body-dark-mode");
  headerSubtitle.classList.toggle("text-dark-mode");
  const isDarkMode = body.classList.contains("body-dark-mode");
  if (isDarkMode) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline";
    return localStorage.setItem("mode", "dark");
  } else {
    moonIcon.style.display = "inline";
    sunIcon.style.display = "none";
    return localStorage.setItem("mode", "light");
  }
});
