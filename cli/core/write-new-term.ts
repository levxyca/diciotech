import { Term, IFileSystem } from "../types";

/**
 * Writes updated terms to a file.
 *
 * @param {string} path - The path of the file to be written.
 * @param {Array} terms - An array of terms to be written to the file.
 */
export const writeUpdatedTermsToFile = (
  path: string,
  terms: Term[],
  fs: IFileSystem
): void => {
  fs.writeToFile(path, JSON.stringify({ cards: terms }, null, 2));
  return;
};
