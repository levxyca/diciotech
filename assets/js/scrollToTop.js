const button = document.querySelector(".button-up");

const showButtonIfScroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

button.addEventListener("click", scrollToTop);
window.onscroll = () => showButtonIfScroll();
