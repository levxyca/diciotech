import fs from 'node:fs';

/**
 * Reads the content of a file.
 */
export const readFileContents = (path: string) => fs.readFileSync(path).toString();
