const searchInput = document.querySelector("#search-input");
const cardsSection = document.querySelector("#cards");

function searchCards() {
    const inputValue = searchInput.value.toLowerCase();
    const listOfCards = document.querySelectorAll(".card");

    for (const card of listOfCards) {
        const cardContent = card.textContent.toLowerCase();
        card.style.display = cardContent.includes(inputValue) ? "" : "none";
    }
}

function insertCardsIntoHtml(data) {
    let cards = "";
    data.forEach((card) => {
        cards += `
        <section class="card">
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
    } catch (error) {
        console.error("An error occurred while fetching card data.", error);
    }
}

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const moonIcon = document.querySelector('.ph-moon');
const sunIcon = document.querySelector('.ph-sun');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
});

searchInput.addEventListener("input", searchCards);
getCardsFromJson();
