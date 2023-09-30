import "./dark_mode.js";

const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");
const filterSelect = document.querySelector("#filter_select");
let listOfCardsFiltered = [];

function insertTagsInSelect(tags) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Todos";
    filterSelect.appendChild(defaultOption);
    for (const tag of tags) {
        const newOption = document.createElement("option");
        newOption.value = tag;
        newOption.text = tag;
        filterSelect.appendChild(newOption);
    }
}


function getTagsFromCards(data) {
    const tags = [];
    data.forEach((card) => {
        if (card.tags) {
            card.tags.forEach((tag) => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        }
    });
    insertTagsInSelect(tags);
}

function filterCards() {
    listOfCardsFiltered = [];
    const listOfCards = document.querySelectorAll(".card");
    const listOfTags = document.querySelectorAll(".card_tags");
    for (let i = 0; i < listOfCards.length; i++) {
        if (listOfTags[i].textContent.includes(filterSelect.value) || filterSelect.value == "") {
            listOfCards[i].style.display = "";
            listOfCardsFiltered.push(listOfCards[i]);
        }
        else {
            listOfCards[i].style.display = "none";
        }
    }
    searchCards()
}

function searchCards() {
    const inputValue = searchInput.value.toLowerCase();
    for (const card of listOfCardsFiltered) {
        const cardContent = card.textContent.toLowerCase();
        card.style.display = cardContent.includes(inputValue) ? "" : "none";
    }
}

function insertCardsIntoHtml(data) {
    let cards = "";
    data.forEach((card) => {
        if (!card.tags) {
            card.tags = "";
        }
        cards += `
        <section class="card">
            <h3 class="card__title">${card.title}</h3>
            <p class="card__description">${card.description}</p>
            <p class="card_tags" style = "display: none;">${card.tags}</p>
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
    filterCards();
}

async function sortCardsByTitle(data) {
    return data.cards.sort((a, b) => a.title.localeCompare(b.title));
}

async function getCardsFromJson() {
    try {
        const res = await fetch("./assets/data/cards_pt-br.json");
        const data = await res.json();
        const sortedCards = await sortCardsByTitle(data);
        insertCardsIntoHtml(sortedCards);
        getTagsFromCards(sortedCards);
    } catch (error) {
        console.error("An error occurred while fetching card data.", error);
    }
}

searchInput.addEventListener("input", searchCards);
filterSelect.addEventListener("change", filterCards)
getCardsFromJson();
