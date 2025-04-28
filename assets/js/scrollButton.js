const SCROLL_THRESHOLD = 50;

const scrollButton = document.getElementById("scrollButton");

let debounceTimer = null;

function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  updateButtonVisibility(scrollTop);

  debounceTimer = null;
}

function updateButtonVisibility(scrollTop) {
  if (scrollTop > SCROLL_THRESHOLD) {
    showScrollButton();
  } else {
    hideScrollButton();
  }
}

function showScrollButton() {
  scrollButton.classList.add("scroll-button--visible");
  scrollButton.classList.remove("scroll-button--hidden");
}

function hideScrollButton() {
  scrollButton.classList.add("scroll-button--hidden");
  scrollButton.classList.remove("scroll-button--visible");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function debounceScroll() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(handleScroll, 100);
}

function initScrollButton() {
  window.addEventListener("scroll", debounceScroll);
  scrollButton.addEventListener("click", scrollToTop);
}

initScrollButton();
