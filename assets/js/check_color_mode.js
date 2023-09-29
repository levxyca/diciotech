const body = document.body;
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const headerSubtitle = document.querySelector(".header__subtitle");
const moonIcon = document.querySelector(".ph-moon");
const sunIcon = document.querySelector(".ph-sun");

let isDarkModeEnabled = localStorage.getItem("dark-mode-enabled");

console.log(isDarkModeEnabled);
if (isDarkModeEnabled === "true") {
	body.classList.add("body-dark-mode");
	headerSubtitle.classList.add("text-dark-mode");
	moonIcon.style.display = "none";
	sunIcon.style.display = "inline";
}

darkModeToggle.addEventListener("click", () => {
	isDarkModeEnabled = isDarkModeEnabled === "true" ? "false" : "true";

	//Atualiza o estado do modo escuro no LocalStorage
	const darkModeEnabled = body.classList.contains("body-dark-mode");
	console.log(isDarkModeEnabled);

	localStorage.setItem("dark-mode-enabled", isDarkModeEnabled);
});
