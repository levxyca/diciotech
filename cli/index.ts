import { readFileContents } from "./core/read-file-terms";
import { writeUpdatedTermsToFile } from "./core/write-new-term";

import { cardsPath } from "./config/cards_pt-br-path";
import { createNewTerm } from "./commands/new-term";

import { FileSystem } from "./io/file-system";

import { dash } from "./utils/dash";

import { IFileSystem, Term } from "./types";

/**
 * Parses terms from a JSON.
 *
 * @param {string} json - JSON containing the terms.
 * @returns {Array} An array of terms.
 */
const parseJSONTerms = (json: string): Term[] =>
  (Object.values(JSON.parse(json)) as Term[]).flat();

/**
 * Adds a new term to an array of existing terms.
 *
 * @param {Array} terms - An array of existing terms.
 * @param {Object} newTerm - The new term to be added.
 * @returns {Array} The updated array of terms.
 */
const addNewTermToArray = (terms: Term[], newTerm: Term) => [...terms, newTerm];

/**
 * Compounds all the steps to write a new term to a file.
 *
 * @param {Object} newTerm - The term to be written to the file.
 * @param {string} filepath - The path of the file to be written.
 */
const composeWriteTermToFile = (
  newTerm: Term,
  afs: IFileSystem,
  filepath: string
) =>
  writeUpdatedTermsToFile(
    filepath,
    addNewTermToArray(parseJSONTerms(readFileContents(filepath, afs)), newTerm),
    afs
  );

const dashed = dash("—")(50);

const main = async () => {
  try {
    const afs = new FileSystem();
    composeWriteTermToFile(await createNewTerm(), afs, cardsPath);
    console.log(`\n${dashed}`);
    console.log(`✔️ Novo termo adicionado com sucesso!`);
    console.log(dashed);
  } catch (error: unknown) {
    console.log(`\n${dashed}`);
    console.error("❌ Ocorreu um erro ao adicionar o novo termo.");
    console.error("❌ Tente novamente seguindo as instruções.");
    console.error(
      "❌ Caso o erro persista, abra uma issue em https://github.com/levxyca/diciotech/issues."
    );
    console.log(dashed);

    if (error instanceof Error) {
      console.error(`❌ ${error.message}\n`);
    }
  }
};

main();
