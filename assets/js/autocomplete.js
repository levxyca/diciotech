import { levenshtein } from "/assets/js/levenshtein.js";

let allTerms = [];
let currentFocus = -1;

function init(input, container, callback) {
  input.addEventListener("input", () => showSuggestions(input, container, callback));

  input.addEventListener("keydown", (e) => {
    const items = container.querySelectorAll(".autocomplete-item");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      currentFocus = currentFocus < items.length - 1 ? currentFocus + 1 : 0;
      setActive(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      currentFocus = currentFocus > 0 ? currentFocus - 1 : items.length - 1;
      setActive(items);
    } else if (e.key === "Enter" && items.length > 0) {
      e.preventDefault();
      // Select current focused item, or first item if none focused
      const itemToSelect = currentFocus > -1 ? items[currentFocus] : items[0];
      itemToSelect.click();
    } else if (e.key === "Escape") {
      close(container);
    }
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !container.contains(e.target)) close(container);
  });
}

function loadTerms(cardsData) {
  allTerms = cardsData.map((card) => ({ title: card.title, id: card.id }));
}

function showSuggestions(input, container, callback) {
  const search = input.value.toLowerCase().trim();
  currentFocus = -1;

  if (!search) return close(container);

  const suggestions = allTerms
    .map((term) => {
      const title = term.title.toLowerCase();
      const words = title.split(/\s+/);
      let score = 0;

      if (title.startsWith(search)) {
        score = 1000;
      } else if (title.includes(search)) {
        score = 500;
      } else if (words.some((w) => w.startsWith(search))) {
        score = 250;
      }
      // Levenshtein distance for typo tolerance
      else if (search.length > 3) {
        words.forEach((word) => {
          if (word.length > 3) {
            const distance = levenshtein(search, word);
            if (distance <= 3) {
              score = Math.max(score, 150 - distance * 10); // 150, 140, 130, 120
            }
          }
        });
      }

      // Boost shorter terms
      if (score > 0) {
        score += 100 - title.length;
      }

      return score ? { term, score } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (!suggestions.length) return close(container);

  // Render suggestions
  container.innerHTML = suggestions
    .map(({ term }) => {
      const idx = term.title.toLowerCase().indexOf(search);
      const highlighted =
        idx !== -1
          ? term.title.slice(0, idx) + "<strong>" + term.title.slice(idx, idx + search.length) + "</strong>" + term.title.slice(idx + search.length)
          : term.title;
      return `<div class="autocomplete-item" data-id="${term.id}">${highlighted}</div>`;
    })
    .join("");

  // Add click handlers
  container.querySelectorAll(".autocomplete-item").forEach((el) => {
    el.addEventListener("click", () => {
      input.value = allTerms.find((t) => t.id === el.dataset.id).title;
      close(container);
      if (callback) callback();
      const card = document.getElementById(el.dataset.id);
      if (card && card.style.display !== "none") {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  container.style.display = "block";
}

function setActive(items) {
  items.forEach((el, i) => el.classList.toggle("autocomplete-active", i === currentFocus));
  if (items[currentFocus]) items[currentFocus].scrollIntoView({ block: "nearest" });
}

function close(container) {
  container.innerHTML = "";
  container.style.display = "none";
  currentFocus = -1;
}

export { init, loadTerms };
