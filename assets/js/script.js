const searchInput = document.getElementById("search-input");

function searchContent() {
  const searchValue = searchInput.value.toLowerCase();
  let listOfCards = document.getElementsByClassName("card");

  Array.from(listOfCards).forEach(card => {
    const cardContent = card.innerHTML.toLowerCase();
    if (cardContent.includes(searchValue)) {
      card.style.display = "list-item";
    } else {
      card.style.display = "none";
    }
  });
}

function addBasicEvents() {
  searchInput.addEventListener("keyup", searchContent);
}

addBasicEvents();