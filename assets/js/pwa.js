function getPWADisplayMode() {
  if (document.referrer.startsWith("android-app://")) return "twa";
  if (window.matchMedia("(display-mode: browser)").matches) return "browser";
  if (window.matchMedia("(display-mode: standalone)").matches) return "standalone";
  if (window.matchMedia("(display-mode: minimal-ui)").matches) return "minimal-ui";
  if (window.matchMedia("(display-mode: fullscreen)").matches) return "fullscreen";
  if (window.matchMedia("(display-mode: window-controls-overlay)").matches) return "window-controls-overlay";
  return "unknown";
}

window.addEventListener("DOMContentLoaded", () => {
  const displayMode = getPWADisplayMode();

  // hide github-corner and change theme button if not in browser mode
  if (displayMode !== "browser") {
    const githubCorner = document.querySelector(".github-corner");
    githubCorner.style.display = "none";

    const themeButton = document.querySelector("#change-theme-button");
    themeButton.style.display = "none";
  }
});
