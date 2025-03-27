import { levenshtein } from "/assets/js/levenshtein.js";

const exactWordScore = 12;
const partialWordScore = 10;
const levenshteinScore = 10;
const levenshteinThreshold = 3;

const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");
const filterSelect = document.querySelector("#tags-filter");
let listOfCardsFiltered = [];
let favoriteCards = [];

function insertTagsIntoSelect(tags) {
  tags.sort();
  for (const tag of tags) {
    const newOption = document.createElement("option");
    newOption.value = tag;
    newOption.text = tag;
    filterSelect.appendChild(newOption);
  }
}

function getTagsFromCards(data, favoriteTag) {
  const tags = [favoriteTag];
  data.map((objeto) => {
    if (objeto.tags) {
      objeto.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    } else {
      objeto.tags = [];
    }
  });
  insertTagsIntoSelect(tags);
}

function filterCards() {
  listOfCardsFiltered = [];
  const listOfCards = document.querySelectorAll(".card");
  listOfCards.forEach((element) => {
    if (element.getAttribute("tags").includes(filterSelect.value) || filterSelect.selectedIndex == 0) {
      element.style.display = "";
      listOfCardsFiltered.push(element);
    } else {
      element.style.display = "none";
    }
  });
  searchCards();
}

function sortCards(sortingArray) {
  if (listOfCardsFiltered.length > 0) {
    if (!Array.isArray(sortingArray) || !sortingArray.length) {
      const cards = document.querySelector("#cards");
      // selects all cards that are not hidden and sorts them by title
      // every child is re-appended to cards in the order of the now sorted array. When an element is re-appended it is actually moved from its previous location
      [...cards.querySelectorAll(".card:not([style*='display: none;'])")]
        .sort((a, b) =>
          a.querySelector(".card__title").textContent.toLowerCase().localeCompare(b.querySelector(".card__title").textContent.toLowerCase())
        )
        .forEach((node) => cards.appendChild(node));
    } else {
      const cards = document.querySelector("#cards");
      // selects all cards that are not hidden and sorts them by the order of the sortingArray
      // every child is re-appended to cards in the order of the now sorted array. When an element is re-appended it is actually moved from its previous location
      [...cards.querySelectorAll(".card:not([style*='display: none;'])")]
        .sort((a, b) => sortingArray.indexOf(a) - sortingArray.indexOf(b))
        .forEach((node) => cards.appendChild(node));
    }
  }
}

function searchCards() {
  const inputValue = searchInput.value.toLowerCase().trim();
  let cardsScores = [];

  if (inputValue.length > 0) {
    const searchWords = inputValue.split(/\s+/);

    for (const card of listOfCardsFiltered) {
      let cardScore = 0;

      // search for words inside the title that either contains the search words or have a low levenshtein distance
      // only consider the best case for each search word
      const cardTitle = card.querySelector(".card__title").textContent.toLowerCase();
      const titleWords = cardTitle.split(/\s+/);
      let titleScore = 0;

      searchWords.forEach((searchWord) => {
        let wordScore = 0;

        titleWords.some((word) => {
          if (word == searchWord) {
            // breaks the loop if the word is an exact match, since no other word can have a higher score
            wordScore = exactWordScore;
            return true;
          } else if (wordScore < partialWordScore) {
            if (word.includes(searchWord)) {
              wordScore = partialWordScore;
            } else if (word.length > 3) {
              const levenshteinDistance = levenshtein(searchWord, word);

              // only the word with the lowest levenshtein distance will be considered
              if (levenshteinDistance <= levenshteinThreshold && levenshteinScore - levenshteinDistance > wordScore) {
                wordScore = levenshteinScore - levenshteinDistance;
              }
            }
          }
        });

        titleScore += wordScore;
      });

      // give extra points for words in title
      cardScore += titleScore * 10;

      // search for words inside the description that either contains the search words or have a low levenshtein distance
      // only consider the best case for each search word
      const cardDescription = card.querySelector(".card__description").textContent.toLowerCase();
      const descriptionWords = cardDescription.split(/\s+/);
      let descriptionScore = 0;

      searchWords.forEach((searchWord) => {
        let wordScore = 0;

        descriptionWords.some((word) => {
          if (word == searchWord) {
            // breaks the loop if the word is an exact match, since no other word can have a higher score
            wordScore = exactWordScore;
            return true;
          } else if (wordScore < partialWordScore) {
            if (word.includes(searchWord)) {
              wordScore = partialWordScore;
            } else if (word.length > 3) {
              const levenshteinDistance = levenshtein(searchWord, word);

              // only the word with the lowest levenshtein distance will be considered
              if (levenshteinDistance <= levenshteinThreshold && levenshteinScore - levenshteinDistance > wordScore) {
                wordScore = levenshteinScore - levenshteinDistance;
              }
            }
          }
        });

        descriptionScore += wordScore;
      });

      cardScore += descriptionScore;

      if (cardScore > 0) {
        card.style.display = "";
        cardsScores.push([card, cardScore]);
      } else {
        card.style.display = "none";
      }
    }

    const msgNotFound = document.querySelector("div.msg");

    if (cardsScores.length > 0) {
      msgNotFound.style.display = "none";
      // sort the array of cards by score
      cardsScores.sort((a, b) => b[1] - a[1]);
      // remove the scores from the array
      cardsScores = cardsScores.map((card) => card[0]);
      sortCards(cardsScores);
    } else {
      msgNotFound.style.display = "";
    }
  } else {
    // display all cards if search input is empty
    for (const card of listOfCardsFiltered) {
      card.style.display = "";
      cardsScores.push(card);
    }

    const msgNotFound = document.querySelector("div.msg");
    if (msgNotFound) {
      msgNotFound.style.display = "none";
    }

    sortCards();
  }
}

function insertCardsIntoHtml(data, favoriteTag, allTag, noResultsAlt, noResultsText) {
  let cards = `<div class="msg">
                    <div class=collumn-1>
                        <img src="/assets/img/no-results-found.png" alt="${noResultsAlt}" />
                        <a href="https://storyset.com/data">Data illustrations by Storyset</a>
                    </div>
                    <div class=collumn-2>
                        ${noResultsText}
                    </div>
                </div>`;
  data.forEach((card) => {
    const cardId = card.id;
    cards += `
        <section class="card" tags="${card.tags ? card.tags : allTag}" id="${cardId}">
            <div class="card__header">
                <h3 class="card__title">${card.title}</h3>
                <i
                    alt="star"
                    unique-title="${cardId}"
                    id="fav_${cardId}"
                    class="${card.tags.includes(favoriteTag) ? "ph-fill ph-star" : "ph ph-star"} fav__button">
                </i>
            </div>
            <p class="card__description">${card.description}</p>
        `;
    if (card.content && card.content.code) {
      cards += `
            <div class="card__content">
                <code class="card__code">${card.content.code}</code>
            </div>
            `;
    }
    cards += "</section>";
  });
  cardsSection.innerHTML = cards;

  const favButtons = document.querySelectorAll(".fav__button");
  favButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCardAsFavorite(button.getAttribute("unique-title"), favoriteTag);
    });
  });

  filterCards();
}

function addFavoriteTagToCard(cardId, favoriteTag) {
  const card = document.getElementById(cardId);
  const tags = card.getAttribute("tags").split(",");

  if (tags.includes(favoriteTag)) {
    tags.splice(tags.indexOf(favoriteTag), 1);
  } else {
    tags.push(favoriteTag);
  }

  card.setAttribute("tags", tags);
}

function setCardAsFavorite(cardId, favoriteTag) {
  const favIcon = document.querySelector(`#fav_${cardId}`);

  if (favoriteCards.includes(cardId)) {
    favIcon.className = "ph ph-star fav__button";
    favoriteCards.splice(favoriteCards.indexOf(cardId), 1);
  } else {
    favIcon.className = "ph-fill ph-star fav__button";
    favoriteCards.push(cardId);
  }

  addFavoriteTagToCard(cardId, favoriteTag);

  localStorage.setItem("favoriteCards", favoriteCards);
}

async function loadFavoriteCardsId() {
  const cardsId = localStorage.getItem("favoriteCards");
  if (cardsId) {
    favoriteCards = cardsId.split(",");
  }
}

async function addFavoriteTag(cards, favoriteTag) {
  cards.map((card) => {
    if (favoriteCards.includes(card.id)) {
      if (!card.tags) {
        card.tags = [];
      }
      card.tags.push(favoriteTag);
    }
  });
  return cards;
}

async function sortCardsByTitle(data) {
  return data.cards.sort((a, b) => a.title.localeCompare(b.title));
}

async function getCardsFromJson(jsonPath, favoriteTag, allTag, noResultsAlt, noResultsText) {
  try {
    const res = await fetch(jsonPath);
    const data = await res.json();
    const sortedCards = await sortCardsByTitle(data);
    document.getElementById("total-terms").textContent = sortedCards.length;
    await loadFavoriteCardsId();
    await addFavoriteTag(sortedCards, favoriteTag);
    getTagsFromCards(sortedCards, favoriteTag);
    insertCardsIntoHtml(sortedCards, favoriteTag, allTag, noResultsAlt, noResultsText);
  } catch (error) {
    console.error("An error occurred while fetching card data.", error);
  }
}

export { addFavoriteTag, filterCards, getCardsFromJson, getTagsFromCards, insertCardsIntoHtml, loadFavoriteCardsId, searchCards, sortCardsByTitle };
