import "./dark_mode.js";
import { levenshtein } from "./levenshtein.js";

const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");
const filterSelect = document.querySelector("#tags-filter");
let listOfCardsFiltered = [];
let favoriteCards = [];
const starIcon = "https://img.icons8.com/ios/50/star--v1.png";
const starIconFilled =
    "https://img.icons8.com/ios-glyphs/30/ffe100/star--v1.png";

function insertTagsIntoSelect(tags) {
    tags.sort();
    for (const tag of tags) {
        const newOption = document.createElement("option");
        newOption.value = tag;
        newOption.text = tag;
        filterSelect.appendChild(newOption);
    }
}

function getTagsFromCards(data) {
    const tags = ["Favoritos"];
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
        if (
            element.getAttribute("tags").includes(filterSelect.value) ||
            filterSelect.value == "Todos"
        ) {
            element.style.display = "";
            listOfCardsFiltered.push(element);
        } else {
            element.style.display = "none";
        }
    });
    searchCards();
}

function sortCards(sortingArray) {
    const list = document.querySelector("#cards");

    if (listOfCardsFiltered.length > 0) {
        if (!Array.isArray(sortingArray) || !sortingArray.length) {
            [...list.querySelectorAll(".card")]
            // itemsArray.sort((a, b) => sortingArr.indexOf(a) - sortingArr.indexOf(b));
            .sort((a, b) => a.querySelector(".card__title").textContent.toLowerCase().localeCompare(b.querySelector(".card__title").textContent.toLowerCase()))
            .forEach(node => list.appendChild(node));
        } else {
            [...list.querySelectorAll(".card")]
            // itemsArray.sort((a, b) => sortingArr.indexOf(a) - sortingArr.indexOf(b));
            .sort((a, b) => a.querySelector(".card__title").textContent.toLowerCase().localeCompare(b.querySelector(".card__title").textContent.toLowerCase()))
            .forEach(node => list.appendChild(node));
        }
    }
}

function searchCards() {
    const inputValue = searchInput.value.toLowerCase().trim();
    let cardsScores = [];

    if (inputValue.length > 0) {
        for (const [i, card] of listOfCardsFiltered.entries()) {
            // search for words inside the title that have a levenshtein distance lower or equal to 5
            let cardScore = 0;
            const cardTitle = card.querySelector(".card__title").textContent.toLowerCase();
            let titleWords = cardTitle.split(/(\s+)/);
            let titleScore = 0;

            titleWords.forEach((word) => {
                if (word.includes(inputValue)) {
                    cardScore += 10;
                }
                const levenshteinDistance = levenshtein(word, inputValue);
                if ((levenshteinDistance <= 2) && (10 - levenshteinDistance > titleScore)) {
                    // only the word with the lowest levenshtein distance will be considered
                    titleScore = 10 - levenshteinDistance;
                }
            });

            // give extra points for words in title
            cardScore += titleScore * 10;

            // search for words inside the description that have a levenshtein distance lower or equal to 5
            const cardDescription = card.querySelector(".card__description").textContent.toLowerCase();
            let descriptionWords = cardDescription.split(/(\s+)/);
            let descriptionScore = 0;

            descriptionWords.forEach((word) => {
                const levenshteinDistance = levenshtein(word, inputValue);
                if ((levenshteinDistance <= 2) && (10 - levenshteinDistance > descriptionScore)) {
                    // only the word with the lowest levenshtein distance will be considered
                    descriptionScore = 10 - levenshteinDistance;
                }
            });

            cardScore += descriptionScore;

            if (cardScore > 0) {
                card.style.display = "";
                cardsScores.push([card, cardScore]);
                // cardsFiltered.push(card);
            } else {
                card.style.display = "none";
            }

            // const cardContent = card.textContent.toLowerCase();

            // if  (cardContent.includes(inputValue)){
            //     card.style.display = "";
            //     cardsFiltered.push(card);
            // } else {
            //     card.style.display = "none";
            // }
        }

        const msgNotFound = document.querySelector("div.msg");

        if (cardsScores.length > 0) {
            msgNotFound.style.display = "none";
            cardsScores.sort((a, b) => b[1] - a[1]);
            // sortCards(cardsScores);
        } else {
            msgNotFound.style.display = "";
        }

    } else {
        for (const card of listOfCardsFiltered) {
            card.style.display = "";
            cardsScores.push(card);
        }

        const msgNotFound = document.querySelector("div.msg");
        msgNotFound.style.display = "none";

        // sortCards();
    }


    // const arr1 = ['d','a','b','c'] ;
    // const arr2 = [{a:1},{c:3},{d:4},{b:2}];
    // const sortArray = (arr1, arr2) => {
    // arr2.sort((a, b) => {
    //     const aKey = Object.keys(a)[0];
    //     const bKey = Object.keys(b)[0];
    //     return arr1.indexOf(aKey) - arr1.indexOf(bKey);
    // });
    // };
    // sortArray(arr1, arr2);
    // console.log(arr2);


    // console.log(listOfCardsFiltered[0].querySelector(".card__title").textContent);
    // console.log(listOfCardsFiltered[0].querySelector(".card__description").textContent);
    // console.log(levenshtein("abstracao", "Abstração"));
    // console.log(levenshtein("cabeça", "Abstração"));
    // console.log(levenshtein("Abstração", "Abstração"));
    // console.log(levenshtein("chuazenger", "Schwarzenegger"));



    // let search_results = listOfCardsFiltered
    //     .filter(prof => {
    //         // Filter results by doing case insensitive match on name here
    //         return prof.name.toLowerCase().includes(keyword.toLowerCase());
    //     })
    //     .sort((a, b) => {
    //         // Sort results by matching name with keyword position in name
    //         if(a.name.toLowerCase().indexOf(keyword.toLowerCase()) > b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
    //             return 1;
    //         } else if (a.name.toLowerCase().indexOf(keyword.toLowerCase()) < b.name.toLowerCase().indexOf(keyword.toLowerCase())) {
    //             return -1;
    //         } else {
    //             if(a.name > b.name)
    //                 return 1;
    //             else
    //                 return -1;
    //         }
    //     });

    // console.log(search_results);
}

function insertCardsIntoHtml(data) {
    let cards = `<div class="msg">
                    <div class=collumn-1>
                        <img src="assets/img/no-results-found.png" alt="Mulher olhando para site sem dados" />
                        <a href="https://storyset.com/data">Data illustrations by Storyset</a>
                    </div>
                    <div class=collumn-2>
                        <p> O termo pesquisado não foi encontrado! Verifique se foi digitado corretamente.</p>
                        <p>Caso esteja correto, por favor crie uma issue no <a href="https://github.com/levxyca/diciotech/issues">repositório</a> para que esse termo possa ser adicionado ao Diciotech.</p>
                        <p>Agradecemos sua colaboração! 😄</p>
                    </div>
                </div>`
    data.forEach((card) => {
        const cardId = generateCardId(card.id, card.title, card.description)
        cards += `
        <section class="card" tags="${
            card.tags ? card.tags : "Todos"
        }" id="${cardId}">
            <div class="card__header">
                <h3 class="card__title">${card.title}</h3>
                <img
                    alt="star"
                    unique-title="${cardId}"
                    id="fav_${cardId}"
                    src="${
                        card.tags.includes("Favoritos")
                            ? starIconFilled
                            : starIcon
                    }"
                    class="fav__button"
                />
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
            setCardAsFavorite(button.getAttribute("unique-title"));
        });
    });

    filterCards();
}

function addFavoriteTagToCard(cardId) {
    const card = document.getElementById(cardId);
    const tags = card.getAttribute("tags").split(",");

    if (tags.includes("Favoritos")) {
        tags.splice(tags.indexOf("Favoritos"), 1);
    } else {
        tags.push("Favoritos");
    }

    card.setAttribute("tags", tags);
}

function setCardAsFavorite(cardId) {
    const favIcon = document.querySelector(`#fav_${cardId}`);

    if (favoriteCards.includes(cardId)) {
        favIcon.src = starIcon;
        favoriteCards.splice(favoriteCards.indexOf(cardId), 1);
    } else {
        favIcon.src = starIconFilled;
        favoriteCards.push(cardId);
    }

    addFavoriteTagToCard(cardId);

    localStorage.setItem("favoriteCards", favoriteCards);
}

async function loadFavoriteCardsId() {
    const cardsId = localStorage.getItem("favoriteCards");
    if (cardsId) {
        favoriteCards = cardsId.split(",");
    }
}

async function addFavoriteTag(cards) {
    cards.map((card) => {
        const cardId = generateCardId(card.id, card.title, card.description)
        if (favoriteCards.includes(cardId)) {
            if (!card.tags) {
                card.tags = [];
            }
            card.tags.push("Favoritos");
        }
    });
    return cards;
}

async function sortCardsByTitle(data) {
    return data.cards.sort((a, b) => a.title.localeCompare(b.title));
}

async function getCardsFromJson() {
    try {
        const res = await fetch("./assets/data/cards_pt-br.json");
        const data = await res.json();
        const sortedCards = await sortCardsByTitle(data);
        await loadFavoriteCardsId();
        await addFavoriteTag(sortedCards);
        getTagsFromCards(sortedCards);
        insertCardsIntoHtml(sortedCards);
    } catch (error) {
        console.error("An error occurred while fetching card data.", error);
    }
}

searchInput.addEventListener("input", searchCards);
filterSelect.addEventListener("change", filterCards);
getCardsFromJson();

/**
 * Generates a card ID using a default UUID or a hash of the card description.
 *
 * @param {string} defaultCardId - A default UUID generated by the CLI.
 * @param {string} title - The title of the card.
 * @param {string} description - The description of the card.
 * @returns {string} - A generated ID
 */
function generateCardId(defaultCardId, title, description) {
    if (defaultCardId) return defaultCardId;
    return generateContentId(title, description);
}

/**
 * Calculates a simple hash of the given content.
 *
 * @param {string} content - The content to be hashed.
 * @param {string} title - An additional title to be added to the content.
 * @param {number} hash - The initial hash value.
 * @returns {string} The hashed representation of the content.
 */
function generateContentId(title = '', description = '', hash = 5381) {
  const data = (title + description).slice(0, 32).split(' ').join('')

  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) + hash) + data.charCodeAt(i);
  }

  const hashString = Math.abs(hash).toString(36); // Convert to base-36 string
  return hashString;
}
