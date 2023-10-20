import * as enquirer from "enquirer";
import path from "path";
const { MultiSelect } = require("enquirer");
import fs from "node:fs";
import crypto from "node:crypto";

import { Questions, Term } from "./types";

const cardsPath = path.join(
  __dirname,
  "..",
  "..",
  "assets",
  "data",
  "cards_pt-br.json"
);

const basePrompt = {
  type: "input",
  required: true,
};

const validations = {
  title: (input: string) => {
    const raw = input.trim();

    if (raw.trim().length < 2) {
      return "O título precisa ter pelo menos 3 caracteres.";
    }
    return true;
  },
  description: (input: string) => {
    const raw = input.trim();

    if (raw.length < 10) {
      return "A descrição precisa ter pelo menos 10 caracteres.";
    }

    return true;
  },
  tags: (input: string[]) => {
    if (input.length < 1) {
        return "Você precisa selecionar pelo menos uma tag.";
      }
      return true;
  },
};

/**
 * Prompts the user for the term's information.
 * @returns {Object} The term's information.
 * @throws {Error} If the user doesn't provide the required information.
 */
const prompts = async () => {
  const questions: Questions = await enquirer.prompt([
    {
      ...basePrompt,
      name: "title",
      message: "Qual título o seu conceito tem ?",
      validate: validations.title,
    },
    {
      ...basePrompt,
      name: "description",
      message: "Qual descrição o seu conceito tem ?",
      validate: validations.description,
    },
    {
      type: "input",
      name: "code",
      message: "Seu conceito tem algum código ? (opcional)",
    },
  ]);

  const availableTags = [
    "Back-end",
    "Biblioteca",
    "Conceito",
    "Design",
    "Ferramenta",
    "Framework",
    "Front-end",
    "Mobile",
    "Paradigma",
    "Versionamento",
  ];

  const tags = new MultiSelect({
    name: "tags",
    message: "Selecione as tags relacionadas ao seu conceito",
    choices: availableTags,
    validate: validations.tags,
  });

  const tagsPrompt: string[] = await tags.run();

  const card = {
    id: crypto.randomBytes(16).toString("hex"),
    title: questions.title,
    description: questions.description,
    tags: tagsPrompt,
    content: {
      code: questions.code,
    },
  };

  return card;
};

/**
 * Reads the content of a file.
 *
 * @param {string} path - The path of the file to be read.
 * @returns {string} The content of the read file.
 */
const readFileContents = (path: string) => fs.readFileSync(path, "utf8");

/**
 * Parses terms from a JSON.
 *
 * @param {string} json - JSON containing the terms.
 * @returns {Array} An array of terms.
 */
const parseJSONTerms = (json: string): Term[] => (Object.values(JSON.parse(json)) as Term[]).flat();

/**
 * Adds a new term to an array of existing terms.
 *
 * @param {Array} terms - An array of existing terms.
 * @param {Object} newTerm - The new term to be added.
 * @returns {Array} The updated array of terms.
 */
const addNewTermToArray = (terms: Term[], newTerm: Term) => [...terms, newTerm];

/**
 * Writes updated terms to a file.
 *
 * @param {string} path - The path of the file to be written.
 * @param {Array} terms - An array of terms to be written to the file.
 */
const writeUpdatedTermsToFile = (path: string, terms: Term[]) => fs.writeFileSync(path, JSON.stringify({ cards: terms }, null, 2));

/**
 * Compounds all the steps to write a new term to a file.
 *
 * @param {Object} newTerm - The term to be written to the file.
 */
const writeTermToFile = (newTerm: Term, filepath: string) =>
  writeUpdatedTermsToFile(
    filepath,
    addNewTermToArray(parseJSONTerms(readFileContents(filepath)), newTerm)
  );

/**
 * Repeats a character a given amount of times.
 * @param {string} c - The character to be repeated.
 * @param {number} qt - The amount of times the character should be repeated.
 * @returns {string} The repeated character.
 */
const dash = (c: string) => (qt: number) => c.repeat(qt);

const dasher = dash("—")(50)

const main = async () => {
  try {
    writeTermToFile(await prompts(), cardsPath);
    console.log(`\n${dasher}`);
    console.log(`✔️ Novo termo adicionado com sucesso!`);
    console.log(dasher);
  } catch (error: unknown) {
    console.log(`\n${dasher}`);
    console.error("❌ Ocorreu um erro ao adicionar o novo termo.");
    console.error("❌ Tente novamente seguindo as instruções.");
    console.error(
      "❌ Caso o erro persista, abra uma issue em https://github.com/levxyca/diciotech/issues."
    );
    console.log(dasher);

    if (error instanceof Error) {
      console.error(`❌ ${error.message}\n`);
    }
  }
};

main();
