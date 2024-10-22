function loadCookies() {
  const cookiesAccepted = localStorage.getItem("cookiesAccepted") === "true";
  const acceptBtn = document.querySelector(".cookies-accept-button");
  const container = document.querySelector(".cookies-container");

  if (!cookiesAccepted) {
    container.style.display = "block";

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", true);
      container.style.display = "none";
    });
  }
}

loadCookies();
