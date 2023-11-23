
const CARD_PATHS = {
    "pt-BR": "./assets/data/cards_pt-br.json",
    "en": "./assets/data/cards_en.json",
}

const TAG_PATH = "./assets/data/tags.json";

export const getCards = async(language) => {
    const res = await fetch(CARD_PATHS[language] || CARD_PATHS["pt-BR"]);
    return await res.json();
};

export const getTags = async (language) => {
    const res = await fetch(TAG_PATH);
    const data = await res.json();
    const languageSelect = language || "pt-BR";
    const tags = Object.keys(data.tags).map((tag) => (
        {
            text: data.tags[tag][languageSelect],
            value: tag,
        }
    ))
    return [...tags]
}