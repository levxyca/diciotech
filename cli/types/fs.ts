export interface IFileSystem {
  writeToFile(path: string, data: string): void;
  readFromFile(path: string): string;
}
