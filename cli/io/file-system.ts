import fs from "node:fs";

import { IFileSystem } from "../types";

export class FileSystem implements IFileSystem {
  writeToFile(path: string, data: string): void {
    fs.writeFileSync(path, data);
  }
  readFromFile(path: string): string {
    return fs.readFileSync(path, "utf8");
  }
}
