import { IFileSystem } from "../types";

/**
 * Reads the content of a file.
 *
 * @param {string} path - The path of the file to be read.
 * @returns {string} The content of the read file.
 */
export const readFileContents = (path: string, fs: IFileSystem) => fs.readFromFile(path);
