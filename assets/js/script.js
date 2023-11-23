import "./dark_mode.js";
import { getCards, getTags } from "./translate.js";

const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");
const filterSelect = document.querySelector("#tags-filter");
const languageSelect = document.querySelector("#language-select");

let listOfCardsFiltered = [];
let favoriteCards = [];
const starIcon = "https://img.icons8.com/ios/50/star--v1.png";
const starIconFilled =
    "https://img.icons8.com/ios-glyphs/30/ffe100/star--v1.png";

function insertTagsIntoSelect(tags) {
    while (filterSelect.firstChild) {
        filterSelect.removeChild(filterSelect.firstChild);
    }

    tags.sort(tag => tag.text);
    for (const tag of tags) {
        const newOption = document.createElement("option");
        newOption.value = tag.value;
        newOption.text = tag.text;
        filterSelect.appendChild(newOption);
    }
}

function filterCards() {
    listOfCardsFiltered = [];
    const listOfCards = document.querySelectorAll(".card");
    listOfCards.forEach((element) => {
        if (
            element.getAttribute("tags").includes(filterSelect.value) ||
            filterSelect.value == "All"
        ) {
            element.style.display = "";
            listOfCardsFiltered.push(element);
        } else {
            element.style.display = "none";
        }
    });
    searchCards();
}

function searchCards() {
    const inputValue = searchInput.value.toLowerCase();
    let cardsFiltered = [];

    for (const card of listOfCardsFiltered) {
        const cardContent = card.textContent.toLowerCase();

        if  (cardContent.includes(inputValue)){
            card.style.display = "";
            cardsFiltered.push(card);
        } else {
            card.style.display = "none";
        }
    }

    const msgNotFound = document.querySelector("div.msg");
    msgNotFound.style.display = cardsFiltered.length==0 ? "" : "none";
   
}

function formatCardTitle(title) {
    let formatedWord = title.replace(/\s+/g, "-").toLowerCase();
    formatedWord = formatedWord
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    formatedWord = formatedWord.replace(/[^\w\-]+/g, "");
    return formatedWord;
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
        const formatedTitle = formatCardTitle(card.title);
        cards += `
        <section class="card" tags="${
            card.tags ? card.tags : "All"
        }" id="${formatedTitle}">
            <div class="card__header">
                <h3 class="card__title">${card.title}</h3>
                <img
                    alt="star"
                    unique-title="${formatedTitle}"
                    id="fav_${formatedTitle}"
                    src="${
                        card.tags.includes("Favorites")
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
    const card = document.querySelector(`#${cardId}`);
    const tags = card.getAttribute("tags").split(",");

    if (tags.includes("Favorites")) {
        tags.splice(tags.indexOf("Favorites"), 1);
    } else {
        tags.push("Favorites");
    }

    card.setAttribute("tags", tags);
}

function setCardAsFavorite(cardId, favId) {
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
        const formatedTitle = formatCardTitle(card.title);
        if (favoriteCards.includes(formatedTitle)) {
            if (!card.tags) {
                card.tags = [];
            }
            card.tags.push("Favorites");
        }
    });
    return cards;
}

async function sortCardsByTitle(data) {
    return data.cards.sort((a, b) => a.title.localeCompare(b.title));
}

async function getCardsFromJson() {
    try {
        const language = languageSelect.value || "pt-BR";
        const data = await getCards(language);
        const sortedCards = await sortCardsByTitle(data);
        const tags = await getTags(language);
        await loadFavoriteCardsId();
        await addFavoriteTag(sortedCards);
        insertTagsIntoSelect(tags);
        insertCardsIntoHtml(sortedCards);
    } catch (error) {
        console.error("An error occurred while fetching card data.", error);
    }
}

searchInput.addEventListener("input", searchCards);
filterSelect.addEventListener("change", filterCards);
languageSelect.addEventListener("change", getCardsFromJson);
getCardsFromJson();
