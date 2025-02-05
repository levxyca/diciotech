// has to be in the head tag, otherwise a flicker effect will occur
let toggleThemeSetting = () => {
  let themeSetting = getThemeSetting();
  if (themeSetting == "system") {
    setThemeSetting("light");
  } else if (themeSetting == "light") {
    setThemeSetting("dark");
  } else {
    setThemeSetting("system");
  }
};

let getThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  if (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") {
    themeSetting = "system";
  }
  return themeSetting;
};

let setThemeSetting = (themeSetting) => {
  localStorage.setItem("theme", themeSetting);
  document.documentElement.setAttribute("data-theme-setting", themeSetting);
  applyTheme();
};

let applyTheme = () => {
  let theme = getTheme();
  document.documentElement.setAttribute("data-theme", theme);
};

let getTheme = () => {
  let themeSetting = getThemeSetting();
  if (themeSetting == "system") {
    const userPref = window.matchMedia;
    if (userPref && userPref("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  } else {
    return themeSetting;
  }
};

let initTheme = () => {
  let themeSetting = getThemeSetting();
  setThemeSetting(themeSetting);

  // add event listener to the theme toggle button
  document.addEventListener("DOMContentLoaded", function () {
    const theme_toggle = document.getElementById("change-theme-button");
    theme_toggle.addEventListener("click", function () {
      toggleThemeSetting();
    });
  });

  // add event listener to the system theme preference change
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
    applyTheme();
  });
};

initTheme();
