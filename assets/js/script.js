const searchInput = document.querySelector("#search-input")

searchInput.addEventListener("input", search)

function search() {
  const inputValue = searchInput.value.toLowerCase()
  const listOfCards = document.querySelectorAll(".card")

  for (let card of listOfCards) {
    const cardContent = card.textContent.toLowerCase()
    card.style.display = cardContent.includes(inputValue) ? "" : "none"
  }
}
