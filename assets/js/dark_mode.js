const body = document.body;
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const headerSubtitle = document.querySelector(".header__subtitle");
const moonIcon = document.querySelector(".ph-moon");
const sunIcon = document.querySelector(".ph-sun");

darkModeToggle.addEventListener("click", () => {
	body.classList.toggle("body-dark-mode");
	headerSubtitle.classList.toggle("text-dark-mode");

	if (body.classList.contains("body-dark-mode")) {
		moonIcon.style.display = "none";
		sunIcon.style.display = "inline";
	} else {
		sunIcon.style.display = "none";
		moonIcon.style.display = "inline";
	}
});
