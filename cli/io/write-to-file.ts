import fs from 'node:fs';

/**
 * Writes updated terms to a file.
 */
export const writeToFile = (path: string, content: string): void => {
  fs.writeFileSync(path, content);
  return;
};
