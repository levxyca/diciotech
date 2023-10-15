import "./dark_mode.js";

const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");
const filterSelect = document.querySelector("#tags-filter");
let listOfCardsFiltered = [];

function insertTagsIntoSelect(tags) {
    tags.sort()
    for (const tag of tags) {
        const newOption = document.createElement("option");
        newOption.value = tag;
        newOption.text = tag;
        filterSelect.appendChild(newOption);
    }
}

function getTagsFromCards(data) {
    const tags = [];
    data.map(objeto => {
        if (objeto.tags) {
            objeto.tags.map(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });
        }
    });
    insertTagsIntoSelect(tags);
}

function filterCards() {
    listOfCardsFiltered = [];
    const listOfCards = document.querySelectorAll(".card");
    listOfCards.forEach((element) => {
        if (element.getAttribute("tags").includes(filterSelect.value) || filterSelect.value == "Todos") {
            element.style.display = "";
            listOfCardsFiltered.push(element);
        }
        else {
            element.style.display = "none";
        }
    });
    searchCards()
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

function insertCardsIntoHtml(data) {
    let cards = `<div class="msg">
                    <div class=collumn-1>
                        <img src="assets/img/No data-rafiki.png" alt="Mulher olhando para site sem dados" /> 
                        <a href="https://storyset.com/data">Data illustrations by Storyset</a>
                    </div>
                    <div class=collumn-2>
                        <p> O termo pesquisado não foi encontrado! Verifique se foi digitado corretamente.</p>
                        <p>Caso esteja correto, por favor crie uma issue no <a href="https://github.com/levxyca/diciotech/issues">repositório</a> para que esse termo possa ser adicionado ao dicionário</p>
                        <p>Agradecemos sua colaboração! 😄</p>
                    </div>
                </div>`
    data.forEach((card) => {
        cards += `
        <section class="card" tags="${card.tags ? card.tags : "Todos"}">
            <h3 class="card__title">${card.title}</h3>
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